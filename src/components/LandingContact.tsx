import type { CSSProperties } from 'react'
import { Building2, CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { LetterReveal } from './LetterReveal'
import { getLandingDict, type LandingLangCode } from '../lib/landingI18n'

export function LandingContact({ lang }: { lang: LandingLangCode }) {
  const t = getLandingDict(lang)

  return (
    <section
      id="contacto"
      className="landing-section relative overflow-hidden bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16"
      aria-labelledby="contact-title"
    >
      <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rotate-12 rounded-3xl bg-brand/15" aria-hidden />
      <div className="pointer-events-none absolute -right-12 bottom-10 h-36 w-36 -rotate-12 rounded-3xl bg-[#FF6B2C]/15" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p
          className="landing-reveal mb-3 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B2C]"
          data-reveal
        >
          {t.contactKicker}
        </p>
        <div className="flex items-center justify-center gap-2">
          <Phone className="text-brand dark:text-cyan" size={22} aria-hidden />
          <LetterReveal
            key={`contact-${lang}`}
            as="h2"
            id="contact-title"
            text={t.contactTitle}
            whenVisible
            charMs={32}
            className="text-center text-2xl font-extrabold text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
        </div>
        <p
          className="landing-reveal mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-[#334155] dark:text-[#CBD5E1] sm:text-lg"
          data-reveal
          style={{ '--reveal-delay': '80ms' } as CSSProperties}
        >
          {t.contactLead}
        </p>
        <p
          className="landing-reveal mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] sm:text-base"
          data-reveal
          style={{ '--reveal-delay': '140ms' } as CSSProperties}
        >
          {t.contactHelp}
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article
            className="landing-reveal rounded-2xl bg-white p-6 shadow-lg dark:bg-[#1A2438] sm:p-8"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as CSSProperties}
          >
            <h3 className="text-lg font-extrabold text-[#0D1B2E] dark:text-white">{t.contactOfferTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.contactOffers.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1] sm:text-base">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#22C55E]" size={20} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h4 className="mt-7 text-sm font-bold uppercase tracking-wide text-[#FF6B2C]">{t.contactAccessTitle}</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {t.contactAccessItems.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-[#F7F9FC] px-3 py-2.5 text-sm font-medium text-[#0D1B2E] dark:bg-[#243044] dark:text-[#E8EEF8]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <div className="space-y-5">
            <article
              className="landing-reveal rounded-2xl bg-[#0D1B2E] p-6 text-white shadow-lg sm:p-7"
              data-reveal
              style={{ '--reveal-delay': '180ms' } as CSSProperties}
            >
              <h3 className="text-lg font-extrabold">{t.contactInfoTitle}</h3>
              <ul className="mt-5 space-y-4 text-sm sm:text-base">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 shrink-0 text-[#FF6B2C]" size={20} aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{t.contactEmailLabel}</p>
                    <a className="font-semibold underline-offset-2 hover:underline" href={`mailto:${t.contactEmail}`}>
                      {t.contactEmail}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-[#FF6B2C]" size={20} aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{t.contactLocationLabel}</p>
                    <p className="font-medium">{t.contactLocation}</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-[#FF6B2C]" size={20} aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/55">{t.contactHoursLabel}</p>
                    <p className="font-medium">{t.contactHours}</p>
                  </div>
                </li>
              </ul>
              <a
                href={`mailto:${t.contactEmail}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FF6B2C] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {t.contactWrite}
              </a>
            </article>

            <article
              className="landing-reveal rounded-2xl bg-[#FF6B2C] p-6 text-white shadow-lg sm:p-7"
              data-reveal
              style={{ '--reveal-delay': '240ms' } as CSSProperties}
            >
              <Building2 className="mb-2" size={28} aria-hidden />
              <h3 className="text-lg font-extrabold">{t.contactInstTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{t.contactInstBody}</p>
            </article>
          </div>
        </div>

        <div
          className="landing-reveal mt-10 rounded-2xl bg-white px-6 py-8 text-center shadow-lg dark:bg-[#1A2438] sm:px-10"
          data-reveal
          style={{ '--reveal-delay': '200ms' } as CSSProperties}
        >
          <h3 className="text-lg font-extrabold text-[#0D1B2E] dark:text-white">{t.contactConnectTitle}</h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8] sm:text-base">
            {t.contactConnectBody}
          </p>
          <p className="mt-5 text-base font-extrabold italic text-brand dark:text-cyan sm:text-lg">“{t.contactQuote}”</p>
        </div>
      </div>
    </section>
  )
}
