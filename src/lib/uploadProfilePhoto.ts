import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

const MAX_BYTES = 5 * 1024 * 1024

export async function uploadProfilePhoto(uid: string, file: File) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Elige una imagen (JPG, PNG o WEBP).')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('La imagen no puede superar 5 MB.')
  }
  const ext = file.type.includes('png') ? 'png' : file.type.includes('webp') ? 'webp' : 'jpg'
  const path = `users/${uid}/profile.${ext}`
  const fileRef = ref(storage, path)
  await uploadBytes(fileRef, file, { contentType: file.type, cacheControl: 'public,max-age=3600' })
  return getDownloadURL(fileRef)
}
