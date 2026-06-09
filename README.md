# Album Panini 2026 Control

MVP web responsive para controlar laminas obtenidas, faltantes y repetidas del album Panini 2026.

## Abrir La App

Con Node instalado:

```powershell
npm run web
```

Luego abre:

```text
http://127.0.0.1:4173
```

Tambien puedes abrir `index.html` directamente en un navegador, aunque para pruebas completas conviene usar el servidor local.

Si PowerShell se queda ocupado despues de ejecutar el comando, esta bien: significa que el servidor esta activo. Dejando esa ventana abierta, abre la URL en Chrome, Edge o tu navegador favorito.

## Levantar API Propia

En otra terminal:

```powershell
npm run api
```

La API queda en:

```text
http://127.0.0.1:8787
```

Desde la app entra a `Ajustes > Fase 10` para probar API, crear cuenta, iniciar sesion, subir coleccion o bajar coleccion.

Documentacion: `docs/backend-api.md`.

## Despliegue Gratis

Ruta recomendada:

- Cloudflare Pages para publicar la PWA.
- Cloudflare Workers para la API.
- Cloudflare D1 para la base de datos.

Guia: `docs/despliegue-gratis.md`.

## Android

La app esta preparada como PWA y tiene configuracion base de Capacitor en `capacitor.config.json`.

Guia: `docs/android-build.md`.

## Funciones Del MVP

- Dashboard con progreso general.
- Album en cuadricula o lista.
- Sumar/restar cantidades por lamina.
- Marcar lamina como pegada o prioridad.
- Registro rapido por lote.
- Registro por codigos reales como `COL 20`, `FWC 19` o numero global.
- Lista de faltantes.
- Lista de repetidas.
- Copiar listas y compartir por WhatsApp.
- Exportar/importar backup JSON.
- Guardado local en el navegador.
- API propia Node para login y sincronizacion.
- API productiva compatible para Cloudflare Workers + D1.
- Base PWA/Android preparada.

## Nota

La app usa `data/catalog-world-cup-2026.json`, generado con 980 fichas. Los datos comerciales generales se validaron contra fuentes oficiales Panini; el listado ficha por ficha fue importado desde Scanini como referencia independiente para coleccionistas.

## Verificacion Actual

- `app.js` pasa revision de sintaxis con Node.
- `dev-server.mjs` pasa revision de sintaxis con Node.
- El servidor local entrega `index.html`, `app.js`, `styles.css`, `manifest.json` e `icon.svg` correctamente.
- El catalogo local contiene 50 secciones, 980 fichas y 68 foil/especiales.
