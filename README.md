# FluidLearn (React + Tailwind + TypeScript)

Esta carpeta **reemplaza Flutter** para web y APK (Capacitor). Los datos del proyecto original ya están aquí.

## Contenido copiado desde Flutter

| Origen | En `web-app` |
| --- | --- |
| `avatars/` | `public/avatars/` (se usan en el perfil) |
| `assets/data/` | `public/data/` (`reading.json`, `writing.json`, `fluidlearn_ai_weights.json`) |
| `lib/` | `from-flutter/lib/` (referencia Dart) |
| `Training_IA/` | `Training_IA/` (entrenamiento Python) |
| `firestore.rules` | `firestore.rules` |
| `firebase.json` | `firebase.json` (Hosting + reglas) |

Reading/Writing se cargan en las actividades. Writing pide texto libre (como en Flutter).

## Web

```bash
cd web-app
npm install
npm run dev
```

Abre `http://localhost:5173`. En escritorio se ve como la APK (columna de teléfono).

Firebase: `pu-fluidlearn` (claves en `.env`, ver `.env.example`).

## APK Android

```bash
npm run android:sync
npx cap open android
```

Luego **Build → Build APK(s)** en Android Studio.

## Firebase (reglas / hosting)

Desde `web-app`:

```bash
firebase deploy --only firestore:rules
firebase deploy --only hosting
```
