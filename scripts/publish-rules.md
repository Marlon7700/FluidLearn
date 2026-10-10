# Publicar reglas (obligatorio para que se guarden usuarios)

Sin esto, Firebase Auth crea la cuenta pero **Firestore bloquea** el documento.

1. Abre: https://console.firebase.google.com/project/pu-fluidlearn/firestore/rules
2. Borra lo que haya y pega **todo** el archivo `firestore.rules` de la raíz del proyecto
3. Pulsa **Publicar**
4. Espera 1 minuto y vuelve a crear un estudiante (registro o panel admin)

También puedes ejecutar en una terminal interactiva:

```bash
firebase login
firebase use pu-fluidlearn
firebase deploy --only firestore:rules
```
