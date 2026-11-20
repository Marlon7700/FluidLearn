# Reglas Firestore — PU-FluidLearn

Proyecto: **`pu-fluidlearn`**.

Las claves viven en `.env` (no se suben a git). Usa `.env.example` como plantilla.

## Publicar reglas

1. Abre [Firebase Console → Firestore → Reglas](https://console.firebase.google.com/project/pu-fluidlearn/firestore/rules)
2. Pega el contenido de `firestore.rules`
3. Publicar

O por CLI (después de `npx firebase login`):

```bash
firebase use pu-fluidlearn
firebase deploy --only firestore:rules,storage
```

Participantes de curso: `courses/{skill}/participants/{uid}` — cualquier usuario autenticado puede leer; cada estudiante solo escribe su propio ingreso.

## Storage (fotos de perfil)

Publica también `storage.rules`. Los estudiantes autenticados pueden subir imágenes en `users/{uid}/profile.*` (máx. 5 MB).

## Qué permiten

- `isSignedIn()` / `isOwner(uid)` / `isAdmin()`
- Crear/editar/borrar `users/{uid}`: dueño o admin
- Alta tras registro: documento con `uid == auth.uid`

## Google en Vercel

En producción se usa **redirección** (no popup). En Firebase Console:

1. Authentication → Settings → **Authorized domains**
2. Añade el dominio de Vercel, por ejemplo `tu-proyecto.vercel.app` (y el dominio propio si lo hay)
3. Deja `VITE_FIREBASE_AUTH_DOMAIN=pu-fluidlearn.firebaseapp.com` (no pongas el dominio de Vercel ahí)
