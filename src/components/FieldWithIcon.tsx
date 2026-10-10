import type { ReactNode } from 'react'

export function FieldWithIcon({
  icon,
  children,
  className = '',
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#1967D2]">
        {icon}
      </span>
      {children}
    </div>
  )
}

export const iconField =
  'w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] py-4 pl-11 pr-4 outline-none focus:border-[#1967D2] focus:ring-1 focus:ring-[#1967D2] dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]'
