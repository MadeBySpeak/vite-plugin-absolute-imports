import fs from "fs";
import path from "path";

const absoluteImports = (options) => ({
  name: "absolute-imports",
  config(config, { command }) {
    if (!options || !options.importsConfig) {
      console.error(
        "absolute-imports plugin error importsConfig required option."
      );
      return;
    }

    const pkgImports = JSON.parse(
      fs.readFileSync(options.importsConfig, "utf-8")
    );
    const mergeConfig = {};
    if (command === "serve") {
      mergeConfig.resolve = {
        alias: [
          ...Object.keys(pkgImports.absolute || {}).map((k) => ({
            find: k,
            replacement: path.resolve(
              `${pkgImports.servePathToRoot || ""}${pkgImports.absolute[k]}`
            ),
          })),
          ...Object.keys(pkgImports.url || {}).map((k) => ({
            find: k,
            replacement: pkgImports.url[k],
          })),
          ...(pkgImports.absolutePaths || []).map((aPath) => ({
            find: aPath,
            replacement: path.resolve(
              `${pkgImports.servePathToRoot || ""}${aPath}`
            ),
          })),
        ],
      };
    } else if (command === "build") {
      if (pkgImports.url) {
        mergeConfig.resolve = {
          alias: {
            ...pkgImports.url,
          },
        };
      }
      if (pkgImports.absolute) {
        mergeConfig.build = {
          rollupOptions: {
            external: [...Object.keys(pkgImports.absolute)],
            output: {
              paths: { ...pkgImports.absolute },
            },
          },
        };
      }
    }
    return mergeConfig;
  },
});

export default absoluteImports;

