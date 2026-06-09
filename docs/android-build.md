# Android

La app ya funciona como PWA instalable. Para generar APK/AAB hay dos rutas.

## Opcion Recomendada: Capacitor

Requisitos:

- Node.js
- Android Studio
- Android SDK
- Java configurado para Gradle

Comandos esperados:

```powershell
npm install
npx cap add android
npm run android:sync
npm run android:open
```

En Android Studio:

- Build APK para pruebas.
- Generate Signed Bundle/APK para Play Store.

## Backend En Android

La app ya usa la API publicada:

```text
https://panini-2026-control.juandavidmoralesparra31.workers.dev
```

Si en un dispositivo queda una URL local vieja como `127.0.0.1`, la app publicada la corrige automaticamente.

## Identidad

Configuracion base:

```json
{
  "appId": "com.mialbummundialista.app",
  "appName": "Mi Album Mundialista 2026"
}
```

## Pendiente Para Publicacion

- Splash/iconos Android por densidad.
- Firma de release.
- Politica de privacidad.
- HTTPS obligatorio.
- Prueba de login Google en Android instalado.
- Generar AAB para Play Store.
