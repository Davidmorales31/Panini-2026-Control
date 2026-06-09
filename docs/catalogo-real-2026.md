# Catalogo Real Panini Mundial 2026

## Estado

La app usa un catalogo local de 992 fichas para `FIFA World Cup 2026 Official Sticker Collection`: 980 fichas del checklist base y 12 fichas bonus Coca-Cola.

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

### Coca-Cola oficial

Fuente usada para validar la seccion bonus:

- Coca-Cola x Panini FIFA World Cup 26: `https://www.coca-cola.com/us/en/offerings/fifa-world-cup-26/panini`
- FAQ Coca-Cola x Panini: `https://www.coca-cola.com/us/en/offerings/fifa-world-cup-26/panini/frequently-asked-questions`

Datos validados:

- 12 stickers especiales Coca-Cola.
- Se coleccionan para una pagina Coca-Cola dentro del album oficial.
- La app los registra como bonus `CC 1` a `CC 12` hasta tener un checklist publico completo por region.

### Scanini

Fuente usada para el listado ficha por ficha:

- `https://scanini.app/albums/world-cup-2026`

Nota: Scanini declara ser un proyecto independiente y no afiliado con Panini o FIFA. En esta app se usa como referencia de coleccionista para codigos, secciones y nombres.

## Archivo Generado

- `data/catalog-world-cup-2026.json`

Contenido:

- 51 secciones.
- 992 fichas.
- 68 fichas marcadas como `Foil` en el checklist base.
- Codigos como `00`, `FWC 19`, `COL 20`, `MEX 1`, `CC 1`, etc.
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
51 992 68
```
