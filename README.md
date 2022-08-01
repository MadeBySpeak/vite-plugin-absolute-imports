# vite-plugin-absolute-imports

A plugin for vite to allow for aliased imports and absolute URL imports to be used in a deployed monorepo

## usage

```js
// vite.config.js
import { defineConfig, loadEnv } from "vite";
i;
import absoluteImports from "@madebyspeak/vite-plugin-absolute-imports";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    absoluteImports({
      importsConfig: "./imports.json",
    }),
  ],
});
```

## Options

| key             | description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `importsConfig` | The path to the json file containing your `absolute`, `url` and `absolutePaths` options. |

## Config File

This is a json file that lists out each import and alias.

### Config Example

```js
{
  // import widgetThing from @modules-shotcut/widget-thing;
  // will appear as in build:
  // import widgetThing from /modules/widget-thing/dist/1.0.0/index.js;
  "absolute": {
    "@modules-shortcut/widget-thing": "/modules/widget-thing/dist/1.0.0/index.js"
  },

  // import preact from preact;
  // will appear as in build:
  // import preact from https://esm.sh/preact@10.10.0;
  "url": {
    "preact": "https://esm.sh/preact@10.10.0",
    "preact/hooks": "https://esm.sh/preact@10.10.0/hooks"
  },

  //  The path from the current directory to the root of all common directories.
  "servePathToRoot": "../../",
  // any paths that need the servePathToRoot prePended when vite is in serve mode
  // ie. importing a module from the same domain as this module that lives at /foo/bar/modules/widget-thing and your servePathToRoot is ../../
  "absolutePaths": ["/modules", "/admin", "/public"]
}
```

