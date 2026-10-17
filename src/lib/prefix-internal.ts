export function prefixInternal(url: string, prefix: string): string {
  if (!prefix) return url;
  if (!url.startsWith("/") || url.startsWith("//")) return url;
  if (url === prefix || url.startsWith(`${prefix}/`)) return url;
  return `${prefix}${url}`;
}
