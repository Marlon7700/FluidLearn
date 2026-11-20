import { Check, Settings, X } from 'lucide-react'
import { timeAgo } from '../lib/timeAgo'
import type { FeedItem } from '../types'

export function NotificationsPanel({
  items,
  onClose,
  onSeeAll,
  className = '',
}: {
  items: FeedItem[]
  onClose: () => void
  onSeeAll?: () => void
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#E4EBF5] bg-white shadow-[0_16px_40px_rgba(22,42,78,0.16)] dark:border-[#2A3650] dark:bg-[#1A2438] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[#EEF2F7] px-4 py-2.5 dark:border-[#2A3650]">
        <p className="flex-1 text-[15px] font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Notificaciones</p>
        <Check size={16} className="text-[#1A6FE8]" />
        <Settings size={16} className="text-[#8C99AD]" />
        <button type="button" onClick={onClose} className="text-[#8C99AD]" aria-label="Cerrar">
          <X size={16} />
        </button>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-[#7A879A]">
            Aún no hay notificaciones. Completa una actividad o espera material de tu profesor.
          </p>
        ) : (
          items.map((n, i) => (
            <article key={`${n.title}-${i}`} className="border-b border-[#EEF2F7] px-4 py-3 last:border-0 dark:border-[#2A3650]">
              <p className="text-[14px] font-medium leading-snug text-[#1D2A44] dark:text-[#E8EEF8]">{n.title}</p>
              {n.body ? <p className="mt-0.5 text-[13px] text-[#5B6B82]">{n.body}</p> : null}
              <p className="mt-1 text-[12px] text-[#8C99AD]">{timeAgo(n.at)}</p>
              <button type="button" className="mt-1 text-[12px] font-semibold text-[#1A6FE8]">
                Ver notificación completa
              </button>
            </article>
          ))
        )}
      </div>
      <button
        type="button"
        onClick={onSeeAll}
        className="w-full border-t border-[#EEF2F7] py-2.5 text-center text-[13px] font-semibold text-[#1A6FE8] dark:border-[#2A3650]"
      >
        Ver todo
      </button>
    </div>
  )
}
