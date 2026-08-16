import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { get } from 'node:https';
import type { IncomingHttpHeaders } from 'node:http';
import { load } from 'cheerio';
import type { HskLevel, SourceSnapshot, SourceTerm } from '../src/content/types';
import { SOURCE_METADATA } from './provenance.mts';

const INFO_URL = 'https://admin.chinesetest.cn/standardsAction.do?means=standardInfo';
const SYLLABUS_URL = SOURCE_METADATA.syllabusUrl;
const EXPECTED_HASH = SOURCE_METADATA.syllabusSha256;
const LEVEL_NAMES: Record<HskLevel, string> = { 1: '一级', 2: '二级', 3: '三级' };
const MAX_REQUEST_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 20_000;
const PAGE_SIZE = 10;
const EXPECTED_HEADERS = ['No.', '级别', '词语', '拼音', '词性'];

export interface ParsedTermsPage {
  terms: SourceTerm[];
  total: number;
}

export function parseSourcePage(html: string, level: HskLevel): ParsedTermsPage {
  const $ = load(html);
  const table = $('table');
  const header = table.first().find('tr').first().find('th, td')
    .map((_, cell) => $(cell).text().trim()).get();

  if (table.length !== 1 || JSON.stringify(header) !== JSON.stringify(EXPECTED_HEADERS)) {
    throw new Error('HSK source table header is invalid');
  }

  const totalMatch = $('#tongji').text().match(/共有\s*(\d+)\s*条记录/);
  const total = Number(totalMatch?.[1]);
  if (!Number.isSafeInteger(total)) throw new Error('HSK source reported total is invalid');

  const sourceOrders = new Set<number>();
  const terms = table.find('tr').slice(1).toArray().map((row) => {
    const cells = $(row).find('td').map((_, cell) => $(cell).text().trim()).get();
    if (cells.length !== EXPECTED_HEADERS.length) {
      throw new Error('HSK source row column count is invalid');
    }

    const sourceOrder = Number(cells[0]);
    if (!Number.isSafeInteger(sourceOrder) || sourceOrder < 1) {
      throw new Error('HSK source row order is invalid');
    }
    if (cells[1] !== LEVEL_NAMES[level]) throw new Error('HSK source row level is invalid');
    if (!cells[2] || !cells[3]) throw new Error('HSK source row term is invalid');
    if (sourceOrders.has(sourceOrder)) throw new Error('HSK source row order is duplicated');
    sourceOrders.add(sourceOrder);

    return {
      id: `hsk3-l${level}-${String(sourceOrder).padStart(4, '0')}`,
      term: cells[2],
      pinyin: cells[3],
      level,
      sourceOrder,
    };
  });

  return { terms, total };
}

export function parseTermsPage(html: string, level: HskLevel): SourceTerm[] {
  return parseSourcePage(html, level).terms;
}

export function appendTermsPage(
  collected: SourceTerm[],
  page: ParsedTermsPage,
  expectedTotal: number | undefined,
): { complete: boolean; terms: SourceTerm[]; total: number } {
  const total = expectedTotal ?? page.total;
  if (!Number.isSafeInteger(total) || total < 1) throw new Error('HSK source reported total is invalid');
  if (expectedTotal !== undefined && page.total !== expectedTotal) {
    throw new Error('HSK source reported total changed');
  }
  if (collected.length >= total) throw new Error('HSK source page exceeds the reported total');
  if (page.terms.length === 0) {
    throw new Error('HSK source page is empty before the reported total');
  }

  const remaining = total - collected.length;
  if (page.terms.length !== Math.min(PAGE_SIZE, remaining)) {
    throw new Error('HSK source page is truncated');
  }

  const termIds = new Set(collected.map((term) => term.id));
  for (const term of page.terms) {
    if (termIds.has(term.id)) throw new Error('HSK source page contains a duplicate term id');
    termIds.add(term.id);
  }

  const terms = [...collected, ...page.terms];
  return { complete: terms.length === total, terms, total };
}

interface HttpResult {
  body: Buffer;
  headers: IncomingHttpHeaders;
  status: number;
}

function getSource(url: string | URL, headers: Record<string, string> = {}): Promise<HttpResult> {
  return requestSource(url, headers, 1);
}

async function requestSource(
  url: string | URL,
  headers: Record<string, string>,
  attempt: number,
): Promise<HttpResult> {
  try {
    return await new Promise((resolve, reject) => {
      const request = get(url, { headers }, (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk: Buffer) => chunks.push(chunk));
        response.on('error', fail);
        response.on('end', () => {
          clearTimeout(timeout);
          resolve({
            body: Buffer.concat(chunks),
            headers: response.headers,
            status: response.statusCode ?? 0,
          });
        });
      });
      const timeout = setTimeout(
        () => request.destroy(new Error(`HSK source request timed out after ${REQUEST_TIMEOUT_MS}ms`)),
        REQUEST_TIMEOUT_MS,
      );
      const fail = (error: Error) => {
        clearTimeout(timeout);
        reject(error);
      };

      request.on('error', fail);
    });
  } catch (error) {
    if (attempt === MAX_REQUEST_ATTEMPTS) throw error;
    await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    return requestSource(url, headers, attempt + 1);
  }
}

function sessionCookie(headers: IncomingHttpHeaders, html: string): string {
  const setCookies = headers['set-cookie'];
  const setCookie = Array.isArray(setCookies) ? setCookies.join('; ') : setCookies;
  const sessionId = html.match(/;jsessionid=([^?"'\s]+)/i)?.[1]
    ?? setCookie?.match(/JSESSIONID=([^;]+)/i)?.[1];

  if (!sessionId) throw new Error('HSK source session id not found');

  return `JSESSIONID=${sessionId}`;
}

async function fetchSource(): Promise<SourceSnapshot> {
  const landing = await getSource(INFO_URL);
  if (landing.status < 200 || landing.status >= 300) {
    throw new Error(`HSK source landing failed: ${landing.status}`);
  }

  const landingHtml = landing.body.toString('utf8');
  const cookie = sessionCookie(landing.headers, landingHtml);
  const sessionId = cookie.slice('JSESSIONID='.length);
  const terms: SourceTerm[] = [];

  for (const level of [1, 2, 3] as const) {
    let levelTerms: SourceTerm[] = [];
    let expectedTotal: number | undefined;

    for (let offset = 0; ; offset += 10) {
      const url = new URL(`https://admin.chinesetest.cn/standardsAction.do;jsessionid=${sessionId}`);
      url.search = new URLSearchParams({
        means: 'getStandardWordsList',
        A: '0',
        leves: LEVEL_NAMES[level],
        words: '',
        pinyin: '',
        words_type: '',
        'pager.offset': String(offset),
      }).toString();

      const response = await getSource(url, { cookie });
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HSK level ${level} offset ${offset}: ${response.status}`);
      }

      const page = parseSourcePage(response.body.toString('utf8'), level);
      const result = appendTermsPage(levelTerms, page, expectedTotal);
      levelTerms = result.terms;
      expectedTotal = result.total;

      if (result.complete) break;
    }

    terms.push(...levelTerms);
  }

  const syllabusResponse = await getSource(SYLLABUS_URL);
  if (syllabusResponse.status < 200 || syllabusResponse.status >= 300) {
    throw new Error(`HSK syllabus download failed: ${syllabusResponse.status}`);
  }

  const hash = createHash('sha256').update(syllabusResponse.body).digest('hex');
  if (hash !== EXPECTED_HASH) throw new Error(`Syllabus hash changed: ${hash}`);

  return {
    datasetVersion: SOURCE_METADATA.datasetVersion,
    label: SOURCE_METADATA.label,
    vocabularySourceUrl: SOURCE_METADATA.vocabularySourceUrl,
    vocabularyImportMethod: SOURCE_METADATA.vocabularyImportMethod,
    vocabularyQuery: SOURCE_METADATA.vocabularyQuery,
    syllabusUrl: SYLLABUS_URL,
    syllabusSha256: hash,
    retrievedAt: SOURCE_METADATA.retrievedAt,
    terms,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const snapshot = await fetchSource();
  await mkdir('content/source', { recursive: true });
  await writeFile('content/source/hsk3-2026.json', `${JSON.stringify(snapshot, null, 2)}\n`);
}
