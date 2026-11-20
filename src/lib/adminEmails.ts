/** Correos autorizados como administrador (también en firestore.rules). */
export const ADMIN_EMAILS = new Set([
  'admin@usb.ve',
  'administracion@usb.ve',
  'maopromaster11@gmail.com',
  'martingmailcom95@gmail.com',
])

export function isAllowlistedAdminEmail(email: string) {
  return ADMIN_EMAILS.has(email.trim().toLowerCase())
}
