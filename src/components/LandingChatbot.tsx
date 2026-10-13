import { useEffect, useId, useRef, useState } from 'react'
import { Bot, CalendarDays, ChevronRight, KeyRound, Mic, Send, X } from 'lucide-react'
import { Link } from 'react-router-dom'

type Msg = { role: 'bot' | 'user'; text: string }

const QUICK = [
  { id: 'planes', label: 'Planes y precios', icon: CalendarDays },
  { id: 'registro', label: 'Registro y acceso', icon: Bot },
  { id: 'requisitos', label: 'Requisitos de inglés', icon: KeyRound },
] as const

function answerFor(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('plan') || q.includes('precio') || q.includes('costo') || q.includes('premium')) {
    return 'Tenemos tres planes: Gratis (acceso básico), Premium Estudiante ($14.900 COP/mes, acceso completo + IA) e Institucional (desde $34.900 COP, licencias y dashboard). Mira la sección Planes o pulsa «Descubre nuestros planes».'
  }
  if (q.includes('regist') || q.includes('cuenta') || q.includes('acceso') || q.includes('login') || q.includes('entrar')) {
    return 'Puedes registrarte como estudiante en «Registrarse» o iniciar sesión en «Entrar». Los administradores usan el modo Administración con código enviado al correo.'
  }
  if (q.includes('requis') || q.includes('inglés') || q.includes('ingles') || q.includes('nivel')) {
    return 'FluidLearn refuerza listening, speaking, reading y writing a tu ritmo. No exige un nivel mínimo para empezar; el progreso se adapta a tu práctica diaria.'
  }
  if (q.includes('hola') || q.includes('ayuda')) {
    return '¡Hola! Puedo ayudarte con planes, registro o requisitos de inglés. Elige un botón o escríbeme.'
  }
  return 'Puedo ayudarte con planes y precios, registro y acceso, o requisitos de inglés. Elige una opción rápida o reformula tu pregunta.'
}

export function LandingChatbot() {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const recognizing = useRef(false)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  function speak(text: string) {
    try {
      if (!window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'es-CO'
      window.speechSynthesis.speak(u)
    } catch {
      /* ignore */
    }
  }

  function pushBot(text: string) {
    setMsgs((m) => [...m, { role: 'bot', text }])
    speak(text)
  }

  function ask(raw: string) {
    const text = raw.trim()
    if (!text) return
    setMsgs((m) => [...m, { role: 'user', text }])
    setInput('')
    pushBot(answerFor(text))
  }

  function onQuick(id: (typeof QUICK)[number]['id']) {
    const map = {
      planes: 'Planes y precios',
      registro: 'Registro y acceso',
      requisitos: 'Requisitos de inglés',
    } as const
    ask(map[id])
  }

  function startVoice() {
    const SR = (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition
      || (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition
    if (!SR) {
      pushBot('Tu navegador no soporta dictado por voz. Puedes escribir tu pregunta.')
      return
    }
    if (recognizing.current) return
    const rec = new SR()
    rec.lang = 'es-CO'
    rec.interimResults = false
    recognizing.current = true
    rec.onresult = (ev: SpeechRecognitionEvent) => {
      const said = ev.results[0]?.[0]?.transcript ?? ''
      recognizing.current = false
      if (said) ask(said)
    }
    rec.onerror = () => {
      recognizing.current = false
    }
    rec.onend = () => {
      recognizing.current = false
    }
    rec.start()
  }

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Asistente FluidLearn"
          className="flex max-h-[min(70svh,520px)] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl dark:border-[#2A3650] dark:bg-[#1A2438]"
        >
          <div className="flex items-center justify-between bg-[#0D1B2E] px-4 py-3 text-white">
            <p className="text-sm font-semibold">¡Hola! ¿En qué puedo ayudarte?</p>
            <button
              type="button"
              className="rounded-lg p-1 hover:bg-white/10"
              aria-label="Cerrar chat"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-3 py-3 text-sm" aria-live="polite">
            {msgs.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`rounded-xl px-3 py-2 ${
                  m.role === 'bot'
                    ? 'bg-[#EEF3FA] text-[#0D1B2E] dark:bg-[#243044] dark:text-[#E8EEF8]'
                    : 'ml-8 bg-[#FF6B2C] text-white'
                }`}
              >
                {m.text}
              </div>
            ))}
            <div className="space-y-2 pt-1">
              {QUICK.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onQuick(id)}
                  className="flex w-full items-center gap-2 rounded-xl border border-[#1967D2]/40 bg-white px-3 py-2.5 text-left text-sm font-medium text-[#1967D2] transition hover:bg-[#E8F0FE] dark:bg-[#0F1728] dark:text-[#98E7FF]"
                >
                  <Icon size={16} className="animate-bounce-soft shrink-0" aria-hidden />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={16} aria-hidden />
                </button>
              ))}
            </div>
            <p className="pt-2 text-center text-xs text-slate-500">
              <Link className="font-semibold text-[#FF6B2C] underline" to="/register">
                Crear cuenta
              </Link>
              {' · '}
              <Link className="font-semibold text-[#1967D2] underline dark:text-[#98E7FF]" to="/login">
                Entrar
              </Link>
            </p>
          </div>

          <form
            className="flex gap-2 border-t border-slate-200 p-3 dark:border-[#2A3650]"
            onSubmit={(e) => {
              e.preventDefault()
              ask(input)
            }}
          >
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2 text-[#1967D2] dark:border-[#2A3650] dark:text-[#98E7FF]"
              aria-label="Dictar por voz"
              onClick={startVoice}
            >
              <Mic size={18} />
            </button>
            <input
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#1967D2] dark:border-[#2A3650] dark:bg-[#0F1728]"
              placeholder="Escribe tu pregunta…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Mensaje para el asistente"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#FF6B2C] p-2 text-white"
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de IA'}
        onClick={() => setOpen((o) => !o)}
        className="landing-bot-pulse relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0D1B2E] text-[#98E7FF] shadow-lg ring-4 ring-[#FF6B2C]/40"
      >
        <Bot size={28} aria-hidden />
      </button>
    </div>
  )
}

/* Tipado mínimo para SpeechRecognition en navegadores webkit */
interface SpeechRecognition extends EventTarget {
  lang: string
  interimResults: boolean
  start: () => void
  onresult: ((ev: SpeechRecognitionEvent) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}
interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } }
}
