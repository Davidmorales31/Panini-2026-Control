import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

const entries = [
  "index.html",
  "app.js",
  "styles.css",
  "manifest.json",
  "sw.js",
  "assets",
  "data"
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const entry of entries) {
  await cp(join(root, entry), join(dist, entry), { recursive: true });
}

console.log("Static app copied to dist/");
