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
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```

En Android Studio:

- Build APK para pruebas.
- Generate Signed Bundle/APK para Play Store.

## Backend En Android

El celular no puede usar `127.0.0.1:8787` para llegar al PC. Opciones:

- Publicar la API propia en un servidor HTTPS.
- Usar la IP local del PC en la misma red, por ejemplo `http://192.168.1.20:8787`.
- Para produccion, usar dominio con HTTPS.

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
- Backend con base de datos real.
