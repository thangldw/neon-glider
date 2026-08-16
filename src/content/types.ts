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

export interface SourceSnapshot {
  datasetVersion: 'hsk3-2026-08-16';
  label: 'HSK 3.0 · 2026';
  syllabusUrl: string;
  syllabusSha256: string;
  retrievedAt: '2026-08-16';
  terms: SourceTerm[];
}
