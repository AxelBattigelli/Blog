import { defineMdastPlugin } from "satteri";
import { site } from "../config";
import { prefixInternal } from "./prefix-internal";

const prefix = site.base.replace(/\/$/, "");

/** Prefix internal links (`/posts/...`) with the site's public path. */
export const baseLinksPlugin = defineMdastPlugin({
  name: "base-links",
  link(node, ctx) {
    rewrite(node, ctx);
  },
  image(node, ctx) {
    rewrite(node, ctx);
  },
  definition(node, ctx) {
    rewrite(node, ctx);
  },
});

function rewrite(
  node: { readonly url: string },
  ctx: { setProperty(node: { readonly url: string }, key: "url", value: string): void },
) {
  const next = prefixInternal(node.url, prefix);
  if (next !== node.url) ctx.setProperty(node, "url", next);
}
