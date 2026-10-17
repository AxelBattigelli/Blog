import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { site } from "./src/config";
import { baseLinksPlugin } from "./src/lib/base-links";

export default defineConfig({
  site: site.url,
  base: site.base,
  output: "static",
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    },
    processor: satteri({
      mdastPlugins: [baseLinksPlugin],
    }),
  },
});
