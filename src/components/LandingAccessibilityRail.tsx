import { Languages } from 'lucide-react'
import { LandingLanguageSelect } from './LandingLanguageSelect'
import type { LandingLangCode } from '../lib/landingI18n'

type Props = {
  lang: LandingLangCode
  onLangChange: (code: LandingLangCode) => void
  langLoading: boolean
  selectLabel: string
  fontSizeLabel: string
  decreaseFont: string
  increaseFont: string
  fontPercent: number
  fontHint?: string
  onDecreaseFont: () => void
  onIncreaseFont: () => void
}

/** Panel vertical fijo a la derecha: idioma + −A/+A (móvil y escritorio). */
export function LandingAccessibilityRail({
  lang,
  onLangChange,
  langLoading,
  selectLabel,
  fontSizeLabel,
  decreaseFont,
  increaseFont,
  fontPercent,
  fontHint,
  onDecreaseFont,
  onIncreaseFont,
}: Props) {
  return (
    <div
      className="landing-access-rail fixed top-1/2 z-[45] flex -translate-y-1/2 flex-col items-center gap-2 rounded-l-2xl border-0 bg-[#0D1B2E]/95 py-3 shadow-xl backdrop-blur-md lg:top-[6.25rem] lg:translate-y-0"
      style={{
        right: 'max(0px, env(safe-area-inset-right))',
        paddingRight: '6px',
        paddingLeft: '6px',
      }}
      aria-label={fontSizeLabel}
    >
      {/* Idioma solo en móvil/tablet (en escritorio xl+ va en el navbar) */}
      <div className="flex w-full flex-col items-center gap-1.5 border-b border-white/15 pb-2.5 xl:hidden">
        <Languages size={22} className="text-[#98E7FF]" aria-hidden />
        <LandingLanguageSelect
          compact
          rail
          value={lang}
          onChange={onLangChange}
          disabled={langLoading}
          selectLabel={selectLabel}
        />
      </div>
      <div className="flex w-full flex-col items-stretch gap-1.5 px-0.5" role="group" aria-label={fontSizeLabel}>
        <p className="text-center text-[10px] font-bold tabular-nums text-[#98E7FF]" aria-live="polite">
          {fontHint || `${fontPercent}%`}
        </p>
        <button
          type="button"
          className="landing-access-btn flex h-12 w-full items-center justify-center rounded-xl bg-[#FF6B2C] text-base font-extrabold text-white active:scale-[0.98]"
          aria-label={increaseFont}
          onClick={(e) => {
            e.preventDefault()
            onIncreaseFont()
          }}
        >
          +A
        </button>
        <button
          type="button"
          className="landing-access-btn flex h-12 w-full items-center justify-center rounded-xl bg-white/15 text-base font-extrabold text-white active:scale-[0.98]"
          aria-label={decreaseFont}
          onClick={(e) => {
            e.preventDefault()
            onDecreaseFont()
          }}
        >
          −A
        </button>
      </div>
    </div>
  )
}
