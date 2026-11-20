export function timeAgo(iso?: string) {
  if (!iso) return ''
  const ms = Date.now() - new Date(iso).getTime()
  if (Number.isNaN(ms) || ms < 0) return ''
  const min = Math.floor(ms / 60000)
  if (min < 1) return 'hace un momento'
  if (min < 60) return `hace ${min} minuto${min === 1 ? '' : 's'}`
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h} hora${h === 1 ? '' : 's'} ${min % 60} minutos`
  const d = Math.floor(h / 24)
  return `hace ${d} día${d === 1 ? '' : 's'} ${h % 24} horas`
}
