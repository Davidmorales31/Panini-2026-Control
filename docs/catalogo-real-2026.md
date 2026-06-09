# Catalogo Real Panini Mundial 2026

## Estado

La app usa un catalogo local de 980 fichas para `FIFA World Cup 2026 Official Sticker Collection`.

## Fuentes

### Panini oficial

Fuente usada para validar datos comerciales generales:

- Producto oficial Panini Espana: `https://www.panini.es/shp_esp_es/fifa-world-cup-2026-official-sticker-collection-pack-3-blisters-8-sobres-colecci-n-oficial-panini-bundle005460kbe8w-3-es01.html`
- Panini America FIFA World Cup 2026 Official Sticker Collection: `https://www.paniniamerica.net/sticker-collections/sticker-collection/fifa-world-cup-2026tm.html`

Datos validados:

- 980 cromos.
- 112 paginas.
- 68 cromos especiales en material premium.
- Sobres de 7 cromos.

### Scanini

Fuente usada para el listado ficha por ficha:

- `https://scanini.app/albums/world-cup-2026`

Nota: Scanini declara ser un proyecto independiente y no afiliado con Panini o FIFA. En esta app se usa como referencia de coleccionista para codigos, secciones y nombres.

## Archivo Generado

- `data/catalog-world-cup-2026.json`

Contenido:

- 50 secciones.
- 980 fichas.
- 68 fichas marcadas como `Foil`.
- Codigos como `00`, `FWC 19`, `COL 20`, `MEX 1`, etc.
- Tipo estimado: `special`, `team-logo`, `team-photo`, `player`.
- URL de origen por ficha cuando existe.

## Scripts

- `scripts/extract-scanini-links.mjs`: extrae las secciones desde el indice de Scanini.
- `scripts/build-catalog-from-scanini.mjs`: genera el JSON final desde las paginas descargadas.

## Validacion Local

Comando:

```powershell
node -e "const c=require('./data/catalog-world-cup-2026.json'); console.log(c.sections.length, c.stickers.length, c.stickers.filter(s=>s.rarity==='Foil').length)"
```

Resultado esperado:

```text
50 980 68
```
