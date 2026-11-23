import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const output = path.join(root, "out");
const base = (process.env.DEPLOY_BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const routes = ["/", "/about/", ...["shiyue", "yanyu", "nianhua", "keystone", "liaoning"].map(slug => `/projects/${slug}/`)];
const tracked = new Set(execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0"));
const errors = new Set();
const resources = new Set();
const images = new Set();

function exactFile(filename) {
  const parts = path.relative(output, filename).split(path.sep);
  let current = output;
  for (const part of parts) {
    if (!fs.existsSync(current) || !fs.readdirSync(current).includes(part)) return false;
    current = path.join(current, part);
  }
  return fs.statSync(current).isFile();
}

function check(raw, from, css = false) {
  const value = raw.replaceAll("&amp;", "&").trim();
  if (/^(?:file:|[a-z]:[\\/])|^https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0)(?::|\/|$)/i.test(value)) {
    errors.add(`Non-public resource: ${value}`); return;
  }
  if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) return;
  const url = new URL(value, `https://export.invalid${from}`);
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { errors.add(`Invalid URL: ${value}`); return; }
  if (base && !(pathname === base || pathname.startsWith(`${base}/`))) {
    errors.add(`Missing ${base} prefix: ${value} (in ${from})`); return;
  }
  if (base && pathname.startsWith(`${base}${base}/`)) errors.add(`Repeated base path: ${value}`);
  const relative = pathname.slice(base.length).replace(/^\//, "");
  let filename = path.join(output, relative);
  if (pathname.endsWith("/") || fs.existsSync(filename) && fs.statSync(filename).isDirectory()) filename = path.join(filename, "index.html");
  if (!filename.startsWith(output + path.sep) || !exactFile(filename)) errors.add(`Missing file or case mismatch: ${value} (in ${from})`);
  resources.add(pathname);
  if (/\.(?:png|jpe?g|webp|svg|gif|avif|pdf|woff2?|ttf|otf)$/i.test(relative)) {
    if (!tracked.has(`public/${relative}`) && !relative.startsWith("_next/")) errors.add(`Not tracked by Git: public/${relative}`);
    if (/\.(?:png|jpe?g|webp|svg|gif|avif)$/i.test(relative)) images.add(pathname);
  }
  if (!css && /(?:^|\/)(?:references|Temp)\/|localhost|[A-Z]:[\\/]/.test(value)) errors.add(`Non-public resource: ${value}`);
}

for (const route of routes) {
  const filename = path.join(output, route, "index.html");
  if (!fs.existsSync(filename)) { errors.add(`Route not exported: ${route}`); continue; }
  const html = fs.readFileSync(filename, "utf8");
  for (const match of html.matchAll(/\b(?:src|href)="([^"]*)"/g)) check(match[1], base + route);
  for (const match of html.matchAll(/url\((?:&quot;|["'])?([^)'"&]+)(?:&quot;|["'])?\)/g)) check(match[1], base + route);
  for (const img of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(img[0])) errors.add(`Image missing alt: ${route}`);
  function checkSegmentAliases(directory, parts) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const nextParts = [...parts, entry.name];
      if (entry.isDirectory()) checkSegmentAliases(path.join(directory, entry.name), nextParts);
      else if (entry.name.endsWith(".txt")) check(`${base}${route}${nextParts.join(".")}`, base + route);
    }
  }
  for (const entry of fs.readdirSync(path.dirname(filename), { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name.startsWith("__next.")) checkSegmentAliases(path.join(path.dirname(filename), entry.name), [entry.name]);
  }
}

function scanCss(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) scanCss(filename);
    else if (entry.name.endsWith(".css")) {
      const from = base + "/" + path.relative(output, filename).replaceAll(path.sep, "/");
      for (const match of fs.readFileSync(filename, "utf8").matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) check(match[1], from, true);
    }
  }
}
scanCss(path.join(output, "_next"));
if (errors.size) {
  console.error([...errors].join("\n"));
  process.exitCode = 1;
} else console.log(`Export verified: ${routes.length} routes, ${resources.size} resource/navigation URLs, ${images.size} images; basePath=${base || "/"}. All public assets are tracked, case-correct and present.`);
