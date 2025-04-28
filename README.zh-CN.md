# vite-plugin-version-injection

一个用于在 vite 项目中注入版本信息的 Vite 插件。这个插件会自动将你的应用版本号注入到 HTML 中，使其在运行时可用。

## 功能特点

- 自动从 `package.json` 中读取版本号
- 支持自定义版本号获取方式
- 可配置注入位置（head 或 body）
- 可自定义全局变量名
- 支持 Vite 6.0 及以上版本

## 安装

```bash
# npm
npm install vite-plugin-version-injection -D

# pnpm
pnpm add vite-plugin-version-injection -D

# yarn
yarn add vite-plugin-version-injection -D
```

## 使用方法

在你的 Vite 配置文件中添加插件：

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

这将会在你的 HTML 中注入一个包含版本号（默认: 当前 `package.json` 的版本）的脚本标签：

```html
<script>window.__APP_VERSION__='1.0.0';</script>
```

然后你可以在应用中访问版本号：

```ts
console.log(window.__APP_VERSION__); // 输出：1.0.0
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `injectTo` | `'head' \| 'body'` | `'head'` | 指定脚本注入的位置 |
| `versionVarName` | `string` | `'__APP_VERSION__'` | 指定全局变量名 |
| `versionResolve` | `() => string` | 从 `package.json` 读取 | 自定义版本号获取函数 |

### 配置示例

```ts
import { defineConfig } from 'vite';
import versionInjection from 'vite-plugin-version-injection';

export default defineConfig({
  plugins: [
    versionInjection({
      injectTo: 'body',
      versionVarName: '__MY_APP_VERSION__',
      versionResolve: () => '1.2.3' // 自定义版本号
    })
  ]
});
```

## License

[MIT](./LICENSE)
