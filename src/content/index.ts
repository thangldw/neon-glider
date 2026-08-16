import rawEntries from './generated.json';
import rawManifest from './generated.manifest.json';
import type { ContentReleaseState, HanziEntry } from './types';
import { validateEntries } from './validate';

export function loadContent(): HanziEntry[] {
  const entries = structuredClone(rawEntries) as HanziEntry[];
  const errors = validateEntries(entries);
  if (errors.length) throw new Error(`Invalid HSK content: ${errors.join('; ')}`);
  return entries;
}

export function loadContentReleaseState(): ContentReleaseState {
  const { reviewStatus, releaseReady } = rawManifest;
  if ((reviewStatus !== 'draft' && reviewStatus !== 'reviewed')
    || typeof releaseReady !== 'boolean'
    || releaseReady !== (reviewStatus === 'reviewed')) {
    throw new Error('Invalid generated content release metadata');
  }
  return { reviewStatus, releaseReady };
}
