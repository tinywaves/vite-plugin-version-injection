import fs from 'node:fs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Plugin, ResolvedConfig } from 'vite';
import versionInjection from '../src';

vi.mock('node:fs', () => ({
  default: {
    readFileSync: vi.fn(),
  },
}));

describe('vite-plugin-version-injection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (fs.readFileSync as any).mockReturnValue(JSON.stringify({ version: '100.100.100' }));
  });

  it('use default config to inject version', () => {
    const plugin = versionInjection();
    (plugin.configResolved as any)({} as ResolvedConfig);
    const result = (plugin.transformIndexHtml! as any)('<html><head></head><body></body></html>');
    expect(result).toEqual({
      html: '<html><head></head><body></body></html>',
      tags: [
        {
          tag: 'script',
          children: 'window.__APP_VERSION__=\'100.100.100\';',
          injectTo: 'head',
        },
      ],
    });
  });

  it('use custom versionVarName to inject version', () => {
    const plugin = versionInjection({
      versionVarName: 'CUSTOM_VERSION',
    }) as Plugin;
    (plugin.configResolved as any)({} as ResolvedConfig);
    const result = (plugin.transformIndexHtml! as any)('<html><head></head><body></body></html>');
    expect(result).toEqual({
      html: '<html><head></head><body></body></html>',
      tags: [
        {
          tag: 'script',
          children: 'window.CUSTOM_VERSION=\'100.100.100\';',
          injectTo: 'head',
        },
      ],
    });
  });

  it('use custom injectTo to inject version', () => {
    const plugin = versionInjection({
      injectTo: 'body',
    }) as Plugin;
    (plugin.configResolved as any)({} as ResolvedConfig);
    const result = (plugin.transformIndexHtml! as any)('<html><head></head><body></body></html>');
    expect(result).toEqual({
      html: '<html><head></head><body></body></html>',
      tags: [
        {
          tag: 'script',
          children: 'window.__APP_VERSION__=\'100.100.100\';',
          injectTo: 'body',
        },
      ],
    });
  });

  it('use custom versionResolve to inject version', () => {
    const plugin = versionInjection({
      versionResolve: () => '200.200.200',
    }) as Plugin;
    (plugin.configResolved as any)({} as ResolvedConfig);
    const result = (plugin.transformIndexHtml! as any)('<html><head></head><body></body></html>');
    expect(result).toEqual({
      html: '<html><head></head><body></body></html>',
      tags: [
        {
          tag: 'script',
          children: 'window.__APP_VERSION__=\'200.200.200\';',
          injectTo: 'head',
        },
      ],
    });
  });
});
