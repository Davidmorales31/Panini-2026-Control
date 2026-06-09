import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const teams = JSON.parse(await readFile(".cache/catalog/teams.json", "utf8"));
const colors = ["#FFD800", "#174EA6", "#B73578", "#E30613", "#F26A21", "#9ACD32"];

function decodeHtml(value) {
  return String(value)
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function stickerKind(label) {
  const lower = label.toLowerCase();
  if (lower.includes("team logo")) return "team-logo";
  if (lower.includes("team photo")) return "team-photo";
  if (lower.includes("special")) return "special";
  if (lower.includes("foil")) return "foil";
  return "player";
}

function isFoil(label, name, code) {
  return label.toLowerCase().includes("foil") || code === "00" || code.startsWith("FWC ");
}

function extractItemList(html, file) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script);
      if (parsed["@type"] === "ItemList" && Array.isArray(parsed.itemListElement)) {
        return parsed;
      }
    } catch {
      // Continue: not every JSON-LD block is the checklist.
    }
  }
  throw new Error(`No ItemList found in ${file}`);
}

function extractVisibleLabels(html) {
  const rows = [];
  const rowRegex = /<a href="\/stickers\/[^"]+"[\s\S]*?<span[^>]*>([^<]+)<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>\s*(?:<span[^>]*>([\s\S]*?)<\/span>)?/g;
  for (const match of html.matchAll(rowRegex)) {
    rows.push({
      code: decodeHtml(match[1]),
      name: decodeHtml(match[2]).replace(/<[^>]+>/g, ""),
      typeLabel: decodeHtml(match[3] || "")
    });
  }
  return rows;
}

function codeNumber(code) {
  if (code === "00") return 0;
  const match = code.match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

const files = await readdir(".cache/catalog");
const sections = [];
const stickers = [];
let globalNumber = 1;

for (const [index, team] of teams.entries()) {
  const file = `.cache/catalog/team-${team.slug}.html`;
  if (!files.includes(basename(file))) {
    throw new Error(`Missing downloaded page for ${team.slug}`);
  }

  const html = await readFile(file, "utf8");
  const itemList = extractItemList(html, file);
  const visible = extractVisibleLabels(html);
  const visibleByCode = new Map(visible.map((row) => [row.code, row]));
  const sectionId = `sec-${team.slug}`;

  sections.push({
    id: sectionId,
    albumId: "album-panini-2026",
    code: team.code,
    slug: team.slug,
    name: team.name,
    color: colors[index % colors.length],
    sortOrder: index + 1,
    count: itemList.itemListElement.length,
    sourceUrl: team.url
  });

  for (const item of itemList.itemListElement) {
    const raw = decodeHtml(item.name).replace(/\s+—\s+/, " — ");
    const [codePart, ...nameParts] = raw.split(" — ");
    const code = codePart.trim();
    const name = nameParts.join(" — ").trim();
    const visibleRow = visibleByCode.get(code);
    const typeLabel = visibleRow?.typeLabel || "";

    stickers.push({
      id: `sticker-${team.slug}-${code.toLowerCase().replace(/\s+/g, "-")}`,
      albumId: "album-panini-2026",
      sectionId,
      number: globalNumber,
      code,
      localNumber: codeNumber(code),
      name,
      country: team.name,
      teamCode: team.code,
      rarity: isFoil(typeLabel, name, code) ? "Foil" : "Base",
      type: stickerKind(typeLabel || name),
      sourceUrl: item.url,
      sortOrder: globalNumber
    });
    globalNumber += 1;
  }
}

const catalog = {
  album: {
    id: "album-panini-2026",
    name: "FIFA World Cup 2026 Official Sticker Collection",
    subtitle: "Checklist 980 cromos",
    year: 2026,
    publisher: "Panini",
    totalStickers: stickers.length,
    pages: 112,
    packSize: 7,
    premiumStickers: 68,
    sourceNotes: [
      "Panini oficial confirma 980 cromos, 112 paginas, sobres de 7 cromos y 68 cromos especiales premium.",
      "El listado ficha por ficha fue importado de Scanini, fuente independiente de referencia para coleccionistas."
    ]
  },
  sections,
  stickers,
  source: {
    officialProductUrl: "https://www.panini.es/shp_esp_es/fifa-world-cup-2026-official-sticker-collection-pack-3-blisters-8-sobres-colecci-n-oficial-panini-bundle005460kbe8w-3-es01.html",
    checklistUrl: "https://scanini.app/albums/world-cup-2026",
    importedAt: new Date().toISOString()
  }
};

await mkdir("data", { recursive: true });
await writeFile("data/catalog-world-cup-2026.json", JSON.stringify(catalog, null, 2), "utf8");

console.log(`Built catalog: ${sections.length} sections, ${stickers.length} stickers`);
