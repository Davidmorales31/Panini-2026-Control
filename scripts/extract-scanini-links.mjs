import { mkdir, readFile, writeFile } from "node:fs/promises";

const html = await readFile(".cache/catalog/album.html", "utf8");
const seen = new Set();
const teams = [];
const cardRegex = /<a href="\/teams\/([^"]+)"[\s\S]*?<span[^>]*>([^<]+)<\/span>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<span[^>]*>(\d+) stickers<\/span>/g;

function decodeHtml(value) {
  return value
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .trim();
}

for (const match of html.matchAll(cardRegex)) {
  const [, slug, code, rawName, count] = match;
  if (seen.has(slug)) continue;
  seen.add(slug);
  teams.push({
    slug,
    code: decodeHtml(code),
    name: decodeHtml(rawName),
    count: Number(count),
    url: `https://scanini.app/teams/${slug}`
  });
}

await mkdir(".cache/catalog", { recursive: true });
await writeFile(".cache/catalog/teams.json", JSON.stringify(teams, null, 2), "utf8");
await writeFile(".cache/catalog/team-urls.txt", teams.map((team) => `${team.url}\t${team.slug}`).join("\n"), "utf8");

console.log(`Extracted ${teams.length} team/section links`);
