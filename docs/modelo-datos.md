# Modelo De Datos Inicial

## Entidades

### UserProfile

Representa a un coleccionista o perfil familiar.

Campos:
- `id`
- `name`
- `avatar`
- `createdAt`
- `updatedAt`

### Album

Representa un album coleccionable.

Campos:
- `id`
- `profileId`
- `name`
- `description`
- `year`
- `publisher`
- `totalStickers`
- `coverImage`
- `currency`
- `createdAt`
- `updatedAt`

### Section

Agrupa laminas dentro de un album.

Campos:
- `id`
- `albumId`
- `name`
- `description`
- `color`
- `sortOrder`
- `createdAt`
- `updatedAt`

### Sticker

Representa una lamina unica del checklist.

Campos:
- `id`
- `albumId`
- `sectionId`
- `number`
- `code`
- `name`
- `country`
- `team`
- `position`
- `rarity`
- `imageUrl`
- `notes`
- `sortOrder`
- `createdAt`
- `updatedAt`

### StickerInventory

Representa el estado de una lamina para un perfil.

Campos:
- `id`
- `profileId`
- `albumId`
- `stickerId`
- `quantity`
- `pasted`
- `reservedQuantity`
- `priority`
- `favorite`
- `condition`
- `notes`
- `updatedAt`

Reglas:
- `quantity = 0`: faltante.
- `quantity = 1`: obtenida.
- `quantity > 1`: tiene repetidas.
- Repetidas disponibles = `quantity - 1 - reservedQuantity`.
- `pasted` solo aplica si `quantity >= 1`.

### PackOpening

Registra una apertura de sobre, caja o lote.

Campos:
- `id`
- `profileId`
- `albumId`
- `type`
- `source`
- `cost`
- `openedAt`
- `createdAt`

### PackOpeningItem

Detalle de laminas dentro de una apertura.

Campos:
- `id`
- `packOpeningId`
- `stickerId`
- `wasNew`
- `quantityBefore`
- `quantityAfter`

### Expense

Registra gastos.

Campos:
- `id`
- `profileId`
- `albumId`
- `type`
- `description`
- `amount`
- `currency`
- `quantity`
- `date`
- `notes`
- `createdAt`

Tipos:
- `album`
- `pack`
- `box`
- `single_sticker`
- `trade`
- `other`

### Contact

Persona para intercambio.

Campos:
- `id`
- `profileId`
- `name`
- `phone`
- `email`
- `location`
- `notes`
- `createdAt`
- `updatedAt`

### Trade

Intercambio con otra persona.

Campos:
- `id`
- `profileId`
- `albumId`
- `contactId`
- `status`
- `notes`
- `createdAt`
- `updatedAt`
- `completedAt`

Estados:
- `draft`
- `proposed`
- `pending`
- `confirmed`
- `completed`
- `cancelled`

### TradeItem

Lamina dentro de un intercambio.

Campos:
- `id`
- `tradeId`
- `stickerId`
- `direction`
- `quantity`

Direcciones:
- `give`
- `receive`

## Consultas Clave

### Faltantes

Laminas del album donde no existe inventario o `quantity = 0`.

### Repetidas

Laminas donde `quantity > 1`.

### Disponibles Para Intercambio

`quantity - 1 - reservedQuantity`, solo si el resultado es mayor a 0.

### Progreso General

`laminas_unicas_obtenidas / total_laminas`.

### Progreso Por Seccion

`laminas_obtenidas_de_la_seccion / total_laminas_de_la_seccion`.

## Almacenamiento Para MVP

Para la primera version:

- `localStorage` o `IndexedDB` para guardar datos localmente.
- Exportacion JSON para backup.
- Estructura preparada para migrar luego a Supabase, Firebase o backend propio.

## Ejemplo JSON

```json
{
  "profiles": [
    {
      "id": "profile-main",
      "name": "Mi album"
    }
  ],
  "albums": [
    {
      "id": "album-panini-2026",
      "profileId": "profile-main",
      "name": "Panini 2026",
      "year": 2026,
      "publisher": "Panini",
      "totalStickers": 670,
      "currency": "COP"
    }
  ],
  "sections": [],
  "stickers": [],
  "inventory": []
}
```
