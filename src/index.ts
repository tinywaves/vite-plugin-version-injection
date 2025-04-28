import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import type { Plugin } from 'vite';

interface VersionInjectionOptions {
  injectTo?: 'head' | 'body';
  versionVarName?: string;
  versionResolve?: () => string;
}

const defaultVersionResolve = () =>
  JSON
    .parse(
      fs.readFileSync(
        path.resolve(
          process.cwd(),
          'package.json',
        ),
        'utf8',
      ),
    )
    .version;

export default function versionInjection(options?: VersionInjectionOptions): Plugin {
  const {
    injectTo = 'head',
    versionVarName = '__APP_VERSION__',
    versionResolve = defaultVersionResolve,
  } = options ?? {};
  let version: string;

  return {
    name: 'vite-plugin-version-injection',
    configResolved() {
      version = versionResolve();
    },
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `window.${versionVarName}='${version}';`,
            injectTo,
          },
        ],
      };
    },
  };
}
