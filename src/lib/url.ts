function basePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

export function url(path: string): string {
  const base = basePath();
  if (path === "/" || path === "") return `${base}/`;
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  return `${base}/${clean}/`;
}

export function asset(path: string): string {
  return `${basePath()}/${path.replace(/^\//, "")}`;
}

export function isCurrent(pathname: string, path: string, prefix = false): boolean {
  const current = normalize(pathname);
  const target = normalize(url(path));
  if (current === target) return true;
  return prefix && target !== "/" && current.startsWith(`${target}/`);
}

function normalize(value: string): string {
  if (value === "/") return "/";
  return value.replace(/\/$/, "") || "/";
}
