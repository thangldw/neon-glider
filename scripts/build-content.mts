import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'csv-parse/sync';
import type { HanziEntry, SourceSnapshot } from '../src/content/types';
import { validateEntries } from '../src/content/validate';

const ROOT = resolve(import.meta.dirname, '..');
const SOURCE_PATH = resolve(ROOT, 'content/source/hsk3-2026.json');
const REVIEW_PATH = resolve(ROOT, 'content/review/hsk3-2026.vi.csv');
const GENERATED_PATH = resolve(ROOT, 'src/content/generated.json');
const MANIFEST_PATH = resolve(ROOT, 'src/content/generated.manifest.json');

export const IMPORTER_VERSION = '1';
export const DRAFT_GENERATOR = 'ollama:qwen3.5:9b';
export const PINNED_SYLLABUS_SHA256 = 'ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941';

interface ReviewRow {
  id: string;
  meaningsVi: string;
  reviewedBy: string;
  reviewedAt: string;
}

export interface ContentManifest {
  datasetVersion: string;
  label: string;
  source: {
    url: string;
    sha256: string;
  };
  importerVersion: string;
  draftGenerator: string;
  reviewDateRange: { from: string; to: string } | null;
  entryCountsByLevel: Record<'1' | '2' | '3', number>;
  reviewedCount: number;
  draftCount: number;
  reviewStatus: 'draft' | 'reviewed';
  releaseReady: boolean;
}

export interface ContentBuild {
  entries: HanziEntry[];
  manifest: ContentManifest;
  generatedJson: string;
  manifestJson: string;
}

function assertReviewDate(value: string, id: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${id}: reviewedAt must be ISO YYYY-MM-DD`);
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${id}: reviewedAt must be ISO YYYY-MM-DD`);
  }
}

function parseReviewCsv(raw: string): ReviewRow[] {
  if (!raw.startsWith('id,meaningsVi,reviewedBy,reviewedAt\n')) {
    throw new Error('Review CSV header must be id,meaningsVi,reviewedBy,reviewedAt');
  }

  return parse(raw, {
    columns: true,
    bom: true,
    skip_empty_lines: true,
  }) as ReviewRow[];
}

function contentError(errors: string[]): never {
  throw new Error(`Invalid Vietnamese content: ${errors.join('; ')}`);
}

export async function rebuildContent(): Promise<ContentBuild> {
  const [sourceRaw, reviewRaw] = await Promise.all([
    readFile(SOURCE_PATH, 'utf8'),
    readFile(REVIEW_PATH, 'utf8'),
  ]);
  const source = JSON.parse(sourceRaw) as SourceSnapshot;
  const rows = parseReviewCsv(reviewRaw);
  const rowsById = new Map<string, ReviewRow>();
  const errors: string[] = [];

  for (const row of rows) {
    if (!row.id || typeof row.meaningsVi !== 'string'
      || typeof row.reviewedBy !== 'string' || typeof row.reviewedAt !== 'string') {
      errors.push('review CSV row has invalid columns');
      continue;
    }
    if (rowsById.has(row.id)) errors.push(`duplicate translation row: ${row.id}`);
    rowsById.set(row.id, row);
  }

  const sourceIds = new Set(source.terms.map((term) => term.id));
  if (sourceIds.size !== source.terms.length) errors.push('source terms contain duplicate ids');
  for (const term of source.terms) {
    if (!rowsById.has(term.id)) errors.push(`missing translation row: ${term.id}`);
  }
  for (const id of rowsById.keys()) {
    if (!sourceIds.has(id)) errors.push(`unknown translation row: ${id}`);
  }
  if (errors.length) contentError(errors);

  let reviewedCount = 0;
  const reviewDates: string[] = [];
  const entries = source.terms.map((term) => {
    const row = rowsById.get(term.id)!;
    const reviewedBy = row.reviewedBy.trim();
    const reviewedAt = row.reviewedAt.trim();
    if (Boolean(reviewedBy) !== Boolean(reviewedAt)) {
      errors.push(`${term.id}: reviewedBy and reviewedAt must both be blank or populated`);
    }
    if (reviewedAt) {
      try {
        assertReviewDate(reviewedAt, term.id);
      } catch (error) {
        errors.push((error as Error).message);
      }
    }
    if (reviewedBy && reviewedAt) {
      reviewedCount += 1;
      reviewDates.push(reviewedAt);
    }

    return {
      ...term,
      meaningsVi: row.meaningsVi.split('|').map((meaning) => meaning.trim()),
    };
  });

  errors.push(...validateEntries(entries));
  if (errors.length) contentError(errors);

  entries.sort((left, right) => left.level - right.level || left.sourceOrder - right.sourceOrder);
  const entryCountsByLevel = entries.reduce<Record<'1' | '2' | '3', number>>(
    (counts, entry) => {
      counts[String(entry.level) as '1' | '2' | '3'] += 1;
      return counts;
    },
    { 1: 0, 2: 0, 3: 0 },
  );
  const draftCount = entries.length - reviewedCount;
  const releaseReady = draftCount === 0;
  const manifest: ContentManifest = {
    datasetVersion: source.datasetVersion,
    label: source.label,
    source: { url: source.syllabusUrl, sha256: source.syllabusSha256 },
    importerVersion: IMPORTER_VERSION,
    draftGenerator: DRAFT_GENERATOR,
    reviewDateRange: reviewDates.length
      ? { from: reviewDates.toSorted()[0]!, to: reviewDates.toSorted().at(-1)! }
      : null,
    entryCountsByLevel,
    reviewedCount,
    draftCount,
    reviewStatus: releaseReady ? 'reviewed' : 'draft',
    releaseReady,
  };

  return {
    entries,
    manifest,
    generatedJson: `${JSON.stringify(entries, null, 2)}\n`,
    manifestJson: `${JSON.stringify(manifest, null, 2)}\n`,
  };
}

export async function writeContent(): Promise<ContentBuild> {
  const build = await rebuildContent();
  await Promise.all([
    writeFile(GENERATED_PATH, build.generatedJson),
    writeFile(MANIFEST_PATH, build.manifestJson),
  ]);
  return build;
}

if (import.meta.url === pathToFileURL(resolve(process.argv[1] ?? '')).href) {
  const build = await writeContent();
  console.log(`Built ${build.entries.length} HSK entries (${build.manifest.draftCount} drafts).`);
}
