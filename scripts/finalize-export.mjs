import fs from "node:fs";
import path from "node:path";

const output = path.resolve("out");
let copied = 0;

function flattenSegments(directory, routeDirectory, parts = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    const relative = [...parts, entry.name];
    if (entry.isDirectory()) flattenSegments(filename, routeDirectory, relative);
    else if (entry.name.endsWith(".txt")) {
      // Next 16.4 on Windows leaves backslashes in segment names, producing
      // directories instead of the dotted filenames requested by the router.
      // Keep the originals and add the same public names as a Linux export.
      fs.copyFileSync(filename, path.join(routeDirectory, relative.join(".")));
      copied++;
    }
  }
}

function visit(directory) {
  const route = fs.existsSync(path.join(directory, "index.html"));
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || ["_next", "images", "references"].includes(entry.name)) continue;
    const filename = path.join(directory, entry.name);
    if (route && entry.name.startsWith("__next.")) flattenSegments(filename, directory, [entry.name]);
    else visit(filename);
  }
}

visit(output);
fs.writeFileSync(path.join(output, ".nojekyll"), "");
console.log(`Static export finalized; ${copied} Windows router segment aliases added.`);
