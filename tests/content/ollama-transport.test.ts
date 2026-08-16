import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { OllamaTimeoutError, postOllamaJson, postOllamaStream } from '../../scripts/ollama-transport.mts';

describe('Ollama transport', () => {
  const servers: ReturnType<typeof createServer>[] = [];

  afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) => server.close(() => resolve()))));
  });

  it('destroys a stalled response body and permits a later request', async () => {
    let requests = 0;
    const server = createServer((request, response) => {
      requests += 1;
      if (requests === 1) {
        response.writeHead(200, { 'content-type': 'application/json' });
        response.write('{"response":');
        return;
      }
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end('{"response":"ok"}');
    });
    servers.push(server);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = (server.address() as AddressInfo).port;
    const url = `http://127.0.0.1:${port}/api/generate`;
    const started = Date.now();

    await expect(postOllamaJson(url, { prompt: 'stall' }, 30)).rejects.toBeInstanceOf(OllamaTimeoutError);
    expect(Date.now() - started).toBeLessThan(500);
    await expect(postOllamaJson(url, { prompt: 'next' }, 200)).resolves.toEqual({ response: 'ok' });
    expect(requests).toBe(2);
  });

  it('accumulates fragmented NDJSON content until done', async () => {
    const server = createServer((request, response) => {
      response.writeHead(200, { 'content-type': 'application/x-ndjson' });
      response.write('{"message":{"content":"xin "},');
      setTimeout(() => response.write('"done":false}\n{"message":{"content":"chào"},"done":true}\n'), 5);
      setTimeout(() => response.end(), 10);
    });
    servers.push(server);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = (server.address() as AddressInfo).port;

    await expect(postOllamaStream(`http://127.0.0.1:${port}/api/chat`, { stream: true }, 50, 200))
      .resolves.toBe('xin chào');
  });

  it('destroys a stalled NDJSON stream after its inactivity deadline', async () => {
    const server = createServer((request, response) => {
      response.writeHead(200, { 'content-type': 'application/x-ndjson' });
      response.write('{"message":{"content":"đợi"},"done":false}\n');
    });
    servers.push(server);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const port = (server.address() as AddressInfo).port;

    await expect(postOllamaStream(`http://127.0.0.1:${port}/api/chat`, { stream: true }, 30, 200))
      .rejects.toBeInstanceOf(OllamaTimeoutError);
  });
});
