export type HskLevel = 1 | 2 | 3;

export interface SourceTerm {
  id: string;
  term: string;
  pinyin: string;
  level: HskLevel;
  sourceOrder: number;
}

export interface HanziEntry extends SourceTerm {
  meaningsVi: string[];
}

export interface ContentReleaseState {
  reviewStatus: 'draft' | 'reviewed';
  releaseReady: boolean;
}

export interface SourceSnapshot {
  datasetVersion: 'hsk3-2026-08-16';
  label: 'HSK 3.0 · 2026';
  vocabularySourceUrl: 'https://admin.chinesetest.cn/standardsAction.do';
  vocabularyImportMethod: 'sessionized-paged-html-table';
  vocabularyQuery: 'means=getStandardWordsList&A=0&leves={一级|二级|三级}&words=&pinyin=&words_type=&pager.offset={0,10,...}';
  syllabusUrl: string;
  syllabusSha256: string;
  retrievedAt: '2026-08-16';
  terms: SourceTerm[];
}

export interface ContentManifest extends ContentReleaseState {
  datasetVersion: string;
  label: string;
  source: {
    vocabularySourceUrl: string;
    retrievedAt: string;
    vocabularyImportMethod: string;
    vocabularyQuery: string;
    syllabusUrl: string;
    syllabusSha256: string;
    snapshotSha256: string;
  };
  importerVersion: string;
  draftGenerator: string;
  reviewDateRange: { from: string; to: string } | null;
  entryCountsByLevel: Record<'1' | '2' | '3', number>;
  reviewedCount: number;
  draftCount: number;
}
