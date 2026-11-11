import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  Accessibility,
  BookOpen,
  Bot,
  CheckCircle2,
  Clock,
  GraduationCap,
  Headphones,
  Keyboard,
  LayoutDashboard,
  ListChecks,
  MonitorSmartphone,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from '../components/FluidLearnLoadingOverlay'
import { LandingFooter } from '../components/LandingFooter'
import { LandingNavbar } from '../components/LandingNavbar'
import { LetterReveal } from '../components/LetterReveal'
import { FLUIDLEARN_TEST_LINKS } from '../data/levelTest'
import { useLandingReveal } from '../hooks/useLandingReveal'
import {
  getLandingDict,
  htmlLangFor,
  readLandingLang,
  saveLandingLang,
  type LandingLangCode,
} from '../lib/landingI18n'
import { A1MotionCard, A1Title } from './LevelTestPage'

const HERO_IMG =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80'

const LEVELS = [
  {
    code: 'A1',
    tone: 'Principiante (Beginner)',
    color: '#22C55E',
    to: '/test/a1',
    items: [
      'Presentarte.',
      'Dar información personal básica.',
      'Comprender expresiones simples.',
      'Mantener conversaciones muy sencillas.',
    ],
  },
  {
    code: 'A2',
    tone: 'Básico avanzado (Elementary)',
    color: '#EAB308',
    to: '/test/a2',
    items: [
      'Hablar sobre familia, trabajo y estudios.',
      'Comunicarte en situaciones cotidianas.',
      'Solicitar y proporcionar información básica.',
    ],
  },
  {
    code: 'B1',
    tone: 'Intermedio (Intermediate)',
    color: '#FF6B2C',
    to: '/test/b1',
    items: [
      'Mantener conversaciones sobre diversos temas.',
      'Expresar opiniones y experiencias.',
      'Comprender textos y conversaciones habituales.',
    ],
  },
  {
    code: 'B2',
    tone: 'Intermedio alto (Upper Intermediate)',
    color: '#2563EB',
    to: '/test/b2',
    items: [
      'Comprender textos complejos.',
      'Participar en debates y reuniones.',
      'Comunicarte de forma fluida con hablantes nativos.',
    ],
  },
  {
    code: 'C1',
    tone: 'Avanzado (Advanced)',
    color: '#7C3AED',
    items: [
      'Utilizar el idioma con flexibilidad y precisión.',
      'Comprender textos especializados.',
      'Comunicarte en entornos académicos y profesionales.',
    ],
  },
  {
    code: 'C2',
    tone: 'Dominio completo (Proficiency)',
    color: '#78716C',
    items: [
      'Comprensión total del inglés oral y escrito.',
      'Fluidez natural.',
      'Expresiones complejas y matices del idioma.',
    ],
  },
] as const

export function LevelTestHubPage() {
  const [lang, setLang] = useState<LandingLangCode>(readLandingLang)
  const [langLoading, setLangLoading] = useState(false)
  const t = useMemo(() => getLandingDict(lang), [lang])

  useLandingReveal([lang])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('legal-page')
    document.body.style.backgroundColor = '#0D1B2E'
    window.scrollTo(0, 0)
    return () => {
      root.classList.remove('legal-page')
      document.body.style.backgroundColor = ''
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLangFor(lang)
    saveLandingLang(lang)
  }, [lang])

  function changeLanguage(next: LandingLangCode) {
    if (next === lang || langLoading) return
    setLangLoading(true)
    window.setTimeout(() => {
      setLang(next)
      window.setTimeout(() => setLangLoading(false), 280)
    }, 400)
  }

  return (
    <div className="a1-test-page min-h-svh bg-white text-[#0D1B2E] dark:bg-[#0F1728] dark:text-[#E8EEF8]">
      <FluidLearnLoadingOverlay show={langLoading} message={t.loadingLang} />
      <LandingNavbar lang={lang} onLangChange={changeLanguage} langLoading={langLoading} sectionMode="route" />

      <div
        className="shrink-0 bg-[#0D1B2E] sm:hidden"
        style={{ height: 'calc(68px + env(safe-area-inset-top, 0px))' }}
        aria-hidden
      />
      <div
        className="hidden shrink-0 bg-[#0D1B2E] sm:block"
        style={{ height: 'calc(76px + env(safe-area-inset-top, 0px))' }}
        aria-hidden
      />

      <section className="grid min-h-[min(32rem,70svh)] overflow-hidden bg-[#0D1B2E] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <p
            className="landing-reveal text-xs font-bold uppercase tracking-[0.2em] text-cyan"
            data-reveal
            style={{ '--reveal-delay': '40ms' } as CSSProperties}
          >
            FluidLearn · Test inteligente
          </p>
          <LetterReveal
            as="h1"
            text="Ubica tu nivel de inglés"
            whenVisible
            startDelayMs={80}
            charMs={24}
            className="mt-3 max-w-[14ch] text-3xl font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl"
          />
          <p
            className="landing-reveal mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
            data-reveal
            style={{ '--reveal-delay': '220ms' } as CSSProperties}
          >
            Pon a prueba tus conocimientos sin registrarte y descubre en pocos minutos tu nivel actual. Gratis, online y
            con resultado inmediato.
          </p>
          <a
            href="#niveles"
            className="landing-reveal mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#00AEEF] px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] shadow-lg transition hover:bg-[#33c0f5]"
            data-reveal
            style={{ '--reveal-delay': '360ms' } as CSSProperties}
          >
            Realizar test de nivel
          </a>
        </div>
        <div className="relative min-h-56 overflow-hidden lg:min-h-full">
          <div className="a1-tower-frame">
            <img src={HERO_IMG} alt="" className="a1-tower-img grayscale" />
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <A1Title text="Ubica tu nivel de inglés con nuestro Test Inteligente" />
            <p
              className="landing-reveal mt-5 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
            >
              Pon a prueba tus conocimientos de inglés sin necesidad de registrarte y descubre en pocos minutos cuál es
              tu nivel actual. El examen te ayuda a identificar fortalezas y las habilidades que necesitas mejorar.
            </p>
            <p
              className="landing-reveal mt-4 text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
              style={{ '--reveal-delay': '120ms' } as CSSProperties}
            >
              En FluidLearn, conocer tu nivel es el primer paso. Nuestra evaluación con Inteligencia Artificial te da una
              recomendación personalizada según tu desempeño.
            </p>
          </div>
          <A1MotionCard
            as="aside"
            reveal="self"
            className="mt-10 rounded-2xl bg-[#0D1B2E] p-6 text-white shadow-xl lg:mt-0"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-cyan">Prueba online</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li className="flex gap-2">
                <Clock size={16} className="mt-0.5 shrink-0 text-cyan" /> Tiempo estimado: 10 a 15 minutos
              </li>
              <li className="flex gap-2">
                <MonitorSmartphone size={16} className="mt-0.5 shrink-0 text-cyan" /> Modalidad: Online
              </li>
              <li className="flex gap-2">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-cyan" /> Resultado: Inmediato
              </li>
              <li className="flex gap-2">
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-cyan" /> Certificado de progreso: Premium
              </li>
            </ul>
            <a
              href="#niveles"
              className="mt-5 block rounded-full bg-[#FF6B2C] py-3 text-center text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Elegir nivel
            </a>
          </A1MotionCard>
        </section>

        <section className="bg-[#F7F9FC] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text="¿Cómo funciona nuestro examen de nivel?" />
            <p
              className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
            >
              La prueba es rápida, sencilla y completamente online. Respondes preguntas de selección múltiple diseñadas
              para evaluar distintos aspectos del inglés.
            </p>
            <div className="landing-reveal-group mt-8 grid gap-3 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {[
                'Gramática',
                'Vocabulario',
                'Comprensión lectora (Reading)',
                'Comprensión auditiva (Listening)',
                'Uso de expresiones comunes',
                'Estructuras gramaticales según el MCER',
              ].map((item, i) => (
                <A1MotionCard
                  key={item}
                  as="p"
                  className="flex gap-3 rounded-xl bg-white p-4 text-sm dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
                >
                  <CheckCircle2 className="shrink-0 text-[#FF6B2C]" size={18} />
                  {item}
                </A1MotionCard>
              ))}
            </div>
            <p
              className="landing-reveal mt-8 text-sm font-bold text-[#0D1B2E] dark:text-white"
              data-reveal
            >
              Al finalizar la prueba obtendrás:
            </p>
            <ul className="landing-reveal-group mt-4 grid gap-3 sm:grid-cols-2" data-reveal>
              {[
                'Tu nivel estimado de inglés.',
                'Un reporte de fortalezas y debilidades.',
                'Recomendaciones personalizadas generadas por IA.',
                'Una ruta de aprendizaje sugerida.',
              ].map((item, i) => (
                <li
                  key={item}
                  data-reveal-child
                  className="flex gap-3 text-sm text-[#334155] dark:text-[#CBD5E1]"
                  style={{ '--reveal-delay': `${i * 70}ms` } as CSSProperties}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00AEEF]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text="¿Por qué realizar el Test de Nivel de FluidLearn?" />
          <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {[
              { icon: ListChecks, title: 'Conoce tu nivel real', text: 'Descubre exactamente en qué punto te encuentras.' },
              { icon: Sparkles, title: 'Medir tu progreso', text: 'Repite la evaluación y compara resultados.' },
              { icon: GraduationCap, title: 'Metas académicas', text: 'Ideal para requisitos de colegios y universidades.' },
              { icon: Bot, title: 'Recomendaciones inteligentes', text: 'La IA te muestra qué temas reforzar.' },
              { icon: MonitorSmartphone, title: 'Estudiar desde cualquier lugar', text: 'Computador, tablet o teléfono.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#2A3650] dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <Icon className="text-[#00AEEF]" size={24} />
                  <h3 className="mt-3 font-extrabold text-[#0D1B2E] dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#94A3B8]">{item.text}</p>
                </A1MotionCard>
              )
            })}
          </div>
        </section>

        <section id="niveles" className="scroll-mt-28 bg-[#E8EEF8] py-14 dark:bg-[#121C2E] sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <A1Title text="Niveles disponibles en FluidLearn" />
            <p
              className="landing-reveal mt-4 max-w-3xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
              data-reveal
            >
              Nuestra plataforma está alineada con el Marco Común Europeo de Referencia para las Lenguas (MCER).
            </p>
            <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2 lg:grid-cols-3" data-reveal>
              {LEVELS.map((level, i) => (
                <A1MotionCard
                  key={level.code}
                  as="article"
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1A2438]"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: level.color }}>
                    {level.code}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-[#0D1B2E] dark:text-white">{level.tone}</h3>
                  <ul className="mt-3 flex-1 space-y-2">
                    {level.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#475569] dark:text-[#94A3B8]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: level.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {'to' in level && level.to ? (
                    <Link
                      to={level.to}
                      className="mt-5 inline-flex justify-center rounded-full bg-[#0D1B2E] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-[#00AEEF] hover:text-[#0D1B2E]"
                    >
                      Presentar {level.code}
                    </Link>
                  ) : (
                    <p className="mt-5 text-center text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Próximamente
                    </p>
                  )}
                </A1MotionCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <A1Title text="¿Qué hace diferente a FluidLearn?" />
          <div className="landing-reveal-group mt-8 grid gap-4 perspective-[1100px] sm:grid-cols-2" data-reveal>
            {[
              { icon: Bot, title: 'Inteligencia Artificial Educativa', text: 'Evalúa tu desempeño y genera planes personalizados.' },
              { icon: GraduationCap, title: 'Profesores conectados', text: 'Tutorías y acompañamiento especializado.' },
              { icon: Sparkles, title: 'Microlearning', text: 'Lecciones de 10 a 15 minutos adaptadas a tu tiempo.' },
              { icon: LayoutDashboard, title: 'Dashboard académico', text: 'Progreso y resultados en tiempo real.' },
              { icon: BookOpen, title: 'Colegios y universidades', text: 'Monitorea estudiantes, reportes y competencias lingüísticas.' },
              { icon: Accessibility, title: 'Accesibilidad total', text: 'Modo oscuro, tamaño de texto, lectores de pantalla, teclado y alto contraste.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <A1MotionCard
                  key={item.title}
                  as="article"
                  className="rounded-2xl bg-[#0D1B2E] p-5 text-white"
                  style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
                >
                  <Icon className="text-cyan" size={22} />
                  <h3 className="mt-3 font-extrabold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                </A1MotionCard>
              )
            })}
          </div>
          <div className="landing-reveal mt-6 flex flex-wrap gap-3 text-sm text-[#475569] dark:text-[#94A3B8]" data-reveal>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F9FC] px-3 py-1 dark:bg-[#1A2438]">🌙 Modo oscuro</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F9FC] px-3 py-1 dark:bg-[#1A2438]">🔠 +A / −A</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F9FC] px-3 py-1 dark:bg-[#1A2438]">
              <Headphones size={14} /> Lectores de pantalla
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F7F9FC] px-3 py-1 dark:bg-[#1A2438]">
              <Keyboard size={14} /> Navegación por teclado
            </span>
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:py-20">
          <A1Title
            text="Comienza hoy mismo"
            className="mx-auto max-w-3xl text-center text-2xl font-extrabold uppercase tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl"
          />
          <p
            className="landing-reveal mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-[#334155] dark:text-[#CBD5E1]"
            data-reveal
          >
            Descubre tu nivel de inglés y empieza a construir una ruta de aprendizaje personalizada con FluidLearn.
          </p>
          <a
            href="#niveles"
            className="landing-reveal mt-8 inline-flex items-center justify-center rounded-full bg-[#00AEEF] px-8 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E] transition hover:bg-[#33c0f5]"
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
          >
            Realizar test de nivel
          </a>
          <p className="mt-4 text-xs text-[#64748B]">Da el primer paso hacia la fluidez en inglés con FluidLearn.</p>
        </section>

        <section className="border-t border-slate-100 px-4 py-14 dark:border-[#2A3650] sm:py-16">
          <A1Title
            text="Prepárate para superar cualquier test con FluidLearn"
            className="mx-auto max-w-4xl text-center text-xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-2xl"
          />
          <div className="landing-reveal-group mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {FLUIDLEARN_TEST_LINKS.map((col, ci) => (
              <ul
                key={col[0].label}
                data-reveal-child
                className="space-y-3 text-center sm:text-left"
                style={{ '--reveal-delay': `${ci * 90}ms` } as CSSProperties}
              >
                {col.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="text-sm font-medium text-[#00AEEF] underline-offset-2 hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-[#64748B] dark:text-[#94A3B8]">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>

      <LandingFooter lang={lang} />
    </div>
  )
}
