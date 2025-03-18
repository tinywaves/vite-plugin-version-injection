# vite-plugin-version-injection

A Vite plugin that injects version information into your application. This plugin automatically injects your app version into HTML, making it available at runtime.

[中文简体](./README.zh-CN.md)

## Features

- Automatically reads version from `package.json`
- Supports custom version resolution
- Configurable injection position (head or body)
- Customizable global variable name
- Supports Vite 6.0 and above

## Installation

```bash
# npm
npm install vite-plugin-version-injection -D

# pnpm
pnpm add vite-plugin-version-injection -D

# yarn
yarn add vite-plugin-version-injection -D
```

## Usage

Add the plugin to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import versionInjection from 'vite-plugin-version-injection';

export default defineConfig({
  plugins: [
    versionInjection()
  ]
});
```

This will inject a script tag with your version (default: current `package.json`'s version) into the HTML:

```html
<script>window.__APP_VERSION__='1.0.0';</script>
```

You can then access the version in your application:

```ts
console.log(window.__APP_VERSION__); // outputs: 1.0.0
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `injectTo` | `'head' \| 'body'` | `'head'` | Specify where to inject the script |
| `versionVarName` | `string` | `'__APP_VERSION__'` | Specify the global variable name |
| `versionResolve` | `() => string` | Reads from `package.json` | Custom version resolution function |

### Configuration Example

```ts
import { defineConfig } from 'vite';
import versionInjection from 'vite-plugin-version-injection';

export default defineConfig({
  plugins: [
    versionInjection({
      injectTo: 'body',
      versionVarName: '__MY_APP_VERSION__',
      versionResolve: () => '1.2.3' // custom version
    })
  ]
});
```

## License

[MIT](./LICENSE)
