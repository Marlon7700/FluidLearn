import { Check } from 'lucide-react'

export function DoneChecks({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <span className="inline-flex items-center" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="fl-check-pop grid h-5 w-5 place-items-center rounded-full bg-[#2F9E6A] text-white"
          style={{ animationDelay: `${i * 120}ms`, marginLeft: i === 0 ? 0 : -6 }}
        >
          <Check size={11} strokeWidth={3} />
        </span>
      ))}
    </span>
  )
}
