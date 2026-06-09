# Despliegue Gratis

Ruta recomendada:

- Frontend/PWA: Cloudflare Pages.
- API propia: Cloudflare Workers.
- Base de datos: Cloudflare D1.
- Android: Capacitor + Android Studio cuando quieras generar APK/AAB.

## 1. Lo Que Debes Crear

1. Cuenta gratis en Cloudflare.
2. Cuenta gratis en GitHub.
3. Repositorio GitHub con este proyecto.
4. Base D1 en Cloudflare.
5. Worker conectado a esa base D1.
6. Proyecto Pages apuntando al repo.

## 2. Publicar El Frontend

En Cloudflare:

1. Entra a `Workers & Pages`.
2. Crea una app de `Pages`.
3. Conecta tu repositorio de GitHub.
4. Usa estos valores:

```text
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: /
```

5. Publica.

Si Cloudflare te muestra algo de `wrangler deploy`, `wrangler.jsonc` o assets con directorio `.`, estas en el flujo de Workers, no en Pages clasico. Vuelve a `Workers & Pages > Pages > Connect to Git` y usa los valores anteriores.

Al final Cloudflare te dara una URL parecida a:

```text
https://mi-album-mundialista.pages.dev
```

## 3. Crear La Base D1

Instala Wrangler solo cuando vayas a desplegar:

```powershell
npm install --save-dev wrangler
```

Inicia sesion:

```powershell
npx wrangler login
```

Crea la base:

```powershell
npx wrangler d1 create mi-album-mundialista-db
```

Copia el `database_id` que te muestra Cloudflare.

Luego crea `wrangler.toml` desde el ejemplo:

```powershell
Copy-Item wrangler.toml.example wrangler.toml
```

Edita `wrangler.toml` y reemplaza:

```text
REEMPLAZA_CON_TU_DATABASE_ID
```

Aplica las tablas:

```powershell
npx wrangler d1 execute mi-album-mundialista-db --remote --file cloudflare/d1-schema.sql
```

## 4. Publicar La API

Despliega el Worker:

```powershell
npx wrangler deploy
```

Cloudflare te dara una URL similar a:

```text
https://mi-album-mundialista-api.tuusuario.workers.dev
```

Prueba:

```powershell
Invoke-WebRequest https://mi-album-mundialista-api.tuusuario.workers.dev/health
```

## 5. Conectar La App Publicada

En la app:

1. Abre `Ajustes`.
2. En `URL API` pega la URL del Worker.
3. Proveedor: `Cloudflare gratis`.
4. Crea cuenta o inicia sesion.
5. Presiona `Subir coleccion`.
6. En otro dispositivo inicia sesion y presiona `Bajar coleccion`.

## 5.1 Login Con Google

La app ya soporta `Google`, pero Google exige crear un OAuth Client ID.

En Google Cloud:

1. Entra a `APIs & Services`.
2. Abre `OAuth consent screen`.
3. Configura una app externa o de prueba.
4. Luego entra a `Credentials`.
5. Crea `OAuth client ID`.
6. Tipo: `Web application`.
7. En `Authorized JavaScript origins` agrega:

```text
https://panini-2026-control.juandavidmoralesparra31.workers.dev
```

8. Copia el `Client ID`.

En Cloudflare:

1. Abre el Worker `panini-2026-control`.
2. Entra a `Settings > Variables and secrets`.
3. Agrega una variable:

```text
GOOGLE_CLIENT_ID = TU_CLIENT_ID_DE_GOOGLE
```

4. Redeploya el Worker.

Despues de eso, el boton `Google` en Ajustes podra iniciar sesion y guardar el progreso en D1.

## 6. Android

Cuando la web y la API ya esten publicadas:

1. Instala Android Studio.
2. Instala dependencias de Capacitor.
3. Usa la guia `docs/android-build.md`.
4. Compila APK para pruebas.
5. Compila AAB si vas a Play Store.

## Estado De Costos

Con uso normal de MVP, este camino debe mantenerse gratis. Si la app crece mucho, Cloudflare avisara limites y se podra pasar a plan pago o migrar a otra arquitectura.
