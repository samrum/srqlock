import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "inline-css",
      enforce: "post",
      generateBundle(_, bundle) {
        let htmlAsset = null;
        const cssAssets = new Map<
          string,
          {
            source: Uint8Array<ArrayBufferLike> | string;
          }
        >();

        for (const [key, value] of Object.entries(bundle)) {
          if (value.type !== "asset") {
            continue;
          }

          if (key.endsWith(".css")) {
            cssAssets.set(key, value);
            continue;
          }

          if (key.endsWith(".html")) {
            htmlAsset = value;
            continue;
          }
        }

        if (!htmlAsset) {
          this.error("Failed to find html asset");
        }

        for (const [key, value] of cssAssets.entries()) {
          htmlAsset.source = String(htmlAsset.source).replace(
            /<link\s+([^>]*?)>/g,
            (match, attrs) => {
              if (!attrs.includes(key) || !attrs.includes('rel="stylesheet"')) {
                return match;
              }

              this.info(`Inlining ${key}`);

              delete bundle[key];

              return `<style>${String(value.source).trim()}</style>`;
            },
          );
        }
      },
    },
  ],
});
