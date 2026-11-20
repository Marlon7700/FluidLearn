import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function BackBar({
  to = '/home',
  label = 'Volver',
  onClick,
}: {
  to?: string
  label?: string
  onClick?: () => void
}) {
  const nav = useNavigate()
  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick()
        else if (to === '-1') nav(-1)
        else nav(to)
      }}
      className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1A6FE8] shadow-[0_8px_20px_rgba(26,111,232,0.12)] transition hover:-translate-x-0.5 hover:shadow-[0_10px_24px_rgba(26,111,232,0.18)] dark:bg-[#1A2438] dark:text-[#8BB4FF]"
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  )
}
