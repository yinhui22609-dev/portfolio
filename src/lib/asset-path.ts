/** Prefix files from public/ once; Next Link already handles page routes. */
export function assetPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
  if (!base || path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
