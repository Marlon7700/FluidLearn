import type { ReactNode } from 'react'

/** Lienzo único para web y APK: pantalla completa, sin marco de teléfono. */
export function AppFrame({ children }: { children: ReactNode }) {
  return <div className="min-h-svh bg-[#EEF3FA] text-[#162A4E] transition-colors duration-500 dark:bg-[#0F1728] dark:text-[#E8EEF8]">{children}</div>
}

export function Page({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1120px] px-5 pb-8 lg:px-10 ${className}`}
      style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
    >
      {children}
    </div>
  )
}

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-svh items-center justify-center px-5 py-10"
      style={{
        paddingTop: 'max(2.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="w-full max-w-[440px] rounded-[28px] bg-white p-8 shadow-[0_18px_50px_rgba(22,42,78,0.10)] dark:bg-[#1A2438] dark:shadow-none sm:p-10">
        {children}
      </div>
    </div>
  )
}
