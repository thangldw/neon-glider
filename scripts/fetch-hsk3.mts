import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { get } from 'node:https';
import type { IncomingHttpHeaders } from 'node:http';
import { load } from 'cheerio';
import type { HskLevel, SourceSnapshot, SourceTerm } from '../src/content/types';

const INFO_URL = 'https://admin.chinesetest.cn/standardsAction.do?means=standardInfo';
const SYLLABUS_URL = 'https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf';
const EXPECTED_HASH = 'ec74ce0439e837bbb15154be13e747ae798903b2fd3a331629df6c3b45504941';
const LEVEL_NAMES: Record<HskLevel, string> = { 1: '一级', 2: '二级', 3: '三级' };
const MAX_REQUEST_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 20_000;

export function parseTermsPage(html: string, level: HskLevel): SourceTerm[] {
  const $ = load(html);

  return $('table tr').toArray().flatMap((row) => {
    const cells = $(row).find('td').map((_, cell) => $(cell).text().trim()).get();
    const sourceOrder = Number(cells[0]);

    if (cells.length < 4 || !Number.isInteger(sourceOrder)) return [];

    return [{
      id: `hsk3-l${level}-${String(sourceOrder).padStart(4, '0')}`,
      term: cells[2],
      pinyin: cells[3],
      level,
      sourceOrder,
    }];
  });
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

      const page = parseTermsPage(response.body.toString('utf8'), level);
      if (page.length === 0) break;

      terms.push(...page);
      if (page.length < 10) break;
    }
  }

  const syllabusResponse = await getSource(SYLLABUS_URL);
  if (syllabusResponse.status < 200 || syllabusResponse.status >= 300) {
    throw new Error(`HSK syllabus download failed: ${syllabusResponse.status}`);
  }

  const hash = createHash('sha256').update(syllabusResponse.body).digest('hex');
  if (hash !== EXPECTED_HASH) throw new Error(`Syllabus hash changed: ${hash}`);

  return {
    datasetVersion: 'hsk3-2026-08-16',
    label: 'HSK 3.0 · 2026',
    syllabusUrl: SYLLABUS_URL,
    syllabusSha256: hash,
    retrievedAt: '2026-08-16',
    terms,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const snapshot = await fetchSource();
  await mkdir('content/source', { recursive: true });
  await writeFile('content/source/hsk3-2026.json', `${JSON.stringify(snapshot, null, 2)}\n`);
}
