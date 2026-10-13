type Props = {
  show: boolean
  message?: string
}

/** Overlay de carga FluidLearn (logo + anillo), mismo estilo que cambio de idioma en landing. */
export function FluidLearnLoadingOverlay({ show, message = 'Cargando…' }: Props) {
  if (!show) return null

  return (
    <div
      className="landing-lang-overlay fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-[#0D1B2E]/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative">
        <img
          src="/logo.png"
          alt=""
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-2xl object-cover shadow-xl"
        />
        <span
          className="landing-lang-spinner absolute -inset-2 rounded-3xl border-2 border-transparent border-t-[#98E7FF] border-r-[#FF6B2C]"
          aria-hidden
        />
      </div>
      <p className="text-sm font-semibold text-white">{message}</p>
    </div>
  )
}
