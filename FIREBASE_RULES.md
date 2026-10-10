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
firebase deploy --only firestore:rules
```

## Qué permiten

- `isSignedIn()` / `isOwner(uid)` / `isAdmin()`
- Crear/editar/borrar `users/{uid}`: dueño o admin
- Alta tras registro: documento con `uid == auth.uid`
