# API Propia

Backend local para sincronizar colecciones entre PC y celular.

## Arranque

```powershell
npm run api
```

URL por defecto:

```text
http://127.0.0.1:8787
```

La app web usa esa URL en `Ajustes > Fase 10`.

## Endpoints

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /me`
- `GET /sync/album`
- `PUT /sync/album`

Los endpoints protegidos usan:

```http
Authorization: Bearer TOKEN
```

## Persistencia Local

La API guarda datos en:

```text
backend/storage/db.json
```

Para produccion gratis se recomienda Cloudflare Workers + D1.

Archivos listos:

```text
cloudflare/worker.js
cloudflare/d1-schema.sql
wrangler.toml.example
docs/despliegue-gratis.md
```

## Seguridad Actual

- Passwords con `scrypt`.
- Tokens aleatorios por sesion.
- CORS abierto para desarrollo local.

Antes de publicar en internet:

- Restringir CORS al dominio final.
- Usar HTTPS.
- Rotar/expirar tokens.
- Agregar rate limit.
- Migrar almacenamiento a DB.
