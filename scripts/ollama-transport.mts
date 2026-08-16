import { request } from 'node:http';
import type { IncomingMessage, RequestOptions } from 'node:http';

export class OllamaTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`Ollama request timed out after ${timeoutMs}ms`);
    this.name = 'OllamaTimeoutError';
  }
}

export class OllamaHttpResponseError extends Error {
  constructor(readonly status: number) {
    super(`Ollama request failed: ${status}`);
    this.name = 'OllamaHttpResponseError';
  }
}

export class OllamaResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OllamaResponseError';
  }
}

export function postOllamaJson(
  url: string,
  body: unknown,
  timeoutMs: number,
  maxResponseBytes = 1_000_000,
): Promise<unknown> {
  const target = new URL(url);
  if (target.protocol !== 'http:') throw new OllamaResponseError(`Unsupported Ollama protocol: ${target.protocol}`);
  const payload = JSON.stringify(body);
  const options: RequestOptions = {
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port,
    path: `${target.pathname}${target.search}`,
    method: 'POST',
    agent: false,
    headers: {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(payload),
    },
  };

  return new Promise<unknown>((resolve, reject) => {
    let settled = false;
    let response: IncomingMessage | undefined;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    const req = request(options, (incoming) => {
      response = incoming;
      const chunks: Buffer[] = [];
      let size = 0;
      incoming.on('data', (chunk: Buffer) => {
        size += chunk.length;
        if (size > maxResponseBytes) {
          fail(new OllamaResponseError(`Ollama response exceeds ${maxResponseBytes} bytes`));
          return;
        }
        chunks.push(chunk);
      });
      incoming.once('error', fail);
      incoming.once('end', () => {
        if (settled) return;
        if ((incoming.statusCode ?? 500) < 200 || (incoming.statusCode ?? 500) >= 300) {
          fail(new OllamaHttpResponseError(incoming.statusCode ?? 500));
          return;
        }
        try {
          succeed(JSON.parse(Buffer.concat(chunks).toString('utf8')));
        } catch {
          fail(new OllamaResponseError('Ollama response is not valid JSON'));
        }
      });
    });
    const clearDeadline = () => {
      if (deadline) clearTimeout(deadline);
    };
    const fail = (error: unknown) => {
      if (settled) return;
      settled = true;
      clearDeadline();
      response?.destroy();
      req.destroy();
      reject(error);
    };
    const succeed = (value: unknown) => {
      if (settled) return;
      settled = true;
      clearDeadline();
      resolve(value);
    };
    deadline = setTimeout(() => fail(new OllamaTimeoutError(timeoutMs)), timeoutMs);
    req.setTimeout(timeoutMs, () => fail(new OllamaTimeoutError(timeoutMs)));
    req.once('error', (error) => {
      if (!settled) fail(error);
    });
    req.write(payload);
    req.end();
  });
}

export function postOllamaStream(
  url: string,
  body: unknown,
  inactivityTimeoutMs: number,
  hardTimeoutMs: number,
  maxResponseBytes = 1_000_000,
): Promise<string> {
  const target = new URL(url);
  if (target.protocol !== 'http:') throw new OllamaResponseError(`Unsupported Ollama protocol: ${target.protocol}`);
  const payload = JSON.stringify(body);
  const options: RequestOptions = {
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port,
    path: `${target.pathname}${target.search}`,
    method: 'POST',
    agent: false,
    headers: {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(payload),
    },
  };

  return new Promise<string>((resolve, reject) => {
    let settled = false;
    let response: IncomingMessage | undefined;
    let hardDeadline: ReturnType<typeof setTimeout> | undefined;
    let inactivityDeadline: ReturnType<typeof setTimeout> | undefined;
    const clearDeadlines = () => {
      if (hardDeadline) clearTimeout(hardDeadline);
      if (inactivityDeadline) clearTimeout(inactivityDeadline);
    };
    const fail = (error: unknown) => {
      if (settled) return;
      settled = true;
      clearDeadlines();
      response?.destroy();
      req.destroy();
      reject(error);
    };
    const succeed = (content: string) => {
      if (settled) return;
      settled = true;
      clearDeadlines();
      resolve(content);
    };
    const resetInactivity = () => {
      if (inactivityDeadline) clearTimeout(inactivityDeadline);
      inactivityDeadline = setTimeout(() => fail(new OllamaTimeoutError(inactivityTimeoutMs)), inactivityTimeoutMs);
    };
    const req = request(options, (incoming) => {
      response = incoming;
      if ((incoming.statusCode ?? 500) < 200 || (incoming.statusCode ?? 500) >= 300) {
        fail(new OllamaHttpResponseError(incoming.statusCode ?? 500));
        return;
      }
      let bytes = 0;
      let buffered = '';
      let content = '';
      let completed = false;
      const consumeLine = (line: string) => {
        if (!line.trim() || settled) return;
        let event: unknown;
        try {
          event = JSON.parse(line);
        } catch {
          fail(new OllamaResponseError('Ollama stream contains invalid JSON'));
          return;
        }
        const record = event && typeof event === 'object' ? event as { done?: unknown; message?: { content?: unknown }; response?: unknown } : undefined;
        const chunk = record?.message?.content ?? record?.response;
        if (typeof chunk === 'string') content += chunk;
        if (record?.done === true) {
          completed = true;
          succeed(content);
        }
      };
      incoming.on('data', (chunk: Buffer) => {
        bytes += chunk.length;
        if (bytes > maxResponseBytes) {
          fail(new OllamaResponseError(`Ollama response exceeds ${maxResponseBytes} bytes`));
          return;
        }
        resetInactivity();
        buffered += chunk.toString('utf8');
        let newline: number;
        while ((newline = buffered.indexOf('\n')) >= 0) {
          consumeLine(buffered.slice(0, newline));
          buffered = buffered.slice(newline + 1);
        }
      });
      incoming.once('error', fail);
      incoming.once('end', () => {
        if (settled) return;
        consumeLine(buffered);
        if (!settled && !completed) fail(new OllamaResponseError('Ollama stream ended before done'));
      });
      resetInactivity();
    });
    hardDeadline = setTimeout(() => fail(new OllamaTimeoutError(hardTimeoutMs)), hardTimeoutMs);
    req.setTimeout(inactivityTimeoutMs, () => fail(new OllamaTimeoutError(inactivityTimeoutMs)));
    req.once('error', (error) => {
      if (!settled) fail(error);
    });
    req.write(payload);
    req.end();
  });
}
