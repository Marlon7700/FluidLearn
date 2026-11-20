import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Clock } from 'lucide-react'
import { A1MotionCard, A1Title } from '../pages/LevelTestPage'

export type GrammarQuizItem = {
  q: string
  options: string[]
  answer: number
  why: string
}

type Copy = {
  kicker: string
  title: string
  lead: string
  start: string
  submit: string
  retry: string
  pending: string
  score: string
  time: string
  expired: string
  show: string
  hide: string
  letters: string[]
}

const TOTAL_SECONDS = 10 * 60

export function GrammarTimedQuiz({ items, copy }: { items: GrammarQuizItem[]; copy: Copy }) {
  const [started, setStarted] = useState(false)
  const [left, setLeft] = useState(TOTAL_SECONDS)
  const [picked, setPicked] = useState<number[]>(() => Array(items.length).fill(-1))
  const [checked, setChecked] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!started || checked) return
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          setChecked(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [started, checked])

  const score = useMemo(
    () => items.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0),
    [items, picked],
  )
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  const pct = Math.max(0, (left / TOTAL_SECONDS) * 100)
  const urgent = started && !checked && left <= 60

  function begin() {
    setStarted(true)
    setChecked(false)
    setShow(false)
    setLeft(TOTAL_SECONDS)
    setPicked(Array(items.length).fill(-1))
  }

  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">{copy.kicker}</p>
      <A1Title text={copy.title} className="mt-2 text-2xl font-extrabold tracking-tight text-[#0D1B2E] dark:text-white sm:text-3xl" />
      <p className="landing-reveal mt-4 text-[15px] leading-[1.85] text-[#64748B] dark:text-[#94A3B8]" data-reveal>
        {copy.lead}
      </p>

      <div className={`grammar-quiz-timer mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#0D1B2E] px-4 py-3 text-white ${urgent ? 'is-urgent' : ''}`}>
        <p className="inline-flex items-center gap-2 text-sm font-extrabold">
          <Clock size={16} className="text-[#00AEEF]" />
          {copy.time}: {started ? `${mm}:${ss}` : '10:00'}
        </p>
        <div className="h-2 min-w-40 flex-1 overflow-hidden rounded-full bg-white/15">
          <span className="grammar-quiz-bar block h-full rounded-full bg-[#00AEEF]" style={{ width: started ? `${pct}%` : '100%' }} />
        </div>
        {!started ? (
          <button type="button" onClick={begin} className="rounded-full bg-[#00AEEF] px-5 py-2 text-xs font-extrabold uppercase text-[#0D1B2E]">
            {copy.start}
          </button>
        ) : (
          <p className="text-xs font-semibold text-white/70">
            {checked
              ? left === 0
                ? copy.expired
                : copy.score.replace('{score}', String(score)).replace('{total}', String(items.length))
              : copy.pending}
          </p>
        )}
      </div>

      {started && (
        <ol className="landing-reveal-group mt-8 space-y-5" data-reveal>
          {items.map((item, i) => (
            <A1MotionCard
              key={item.q}
              as="li"
              className="grammar-quiz-item rounded-2xl border border-slate-200 bg-white p-4 dark:border-[#2A3650] dark:bg-[#1A2438]"
              style={{ '--reveal-delay': `${Math.min(i, 8) * 55}ms` } as CSSProperties}
            >
              <p className="font-semibold">
                {i + 1}. {item.q}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {item.options.slice(0, 3).map((option, oi) => {
                  const active = picked[i] === oi
                  const correct = checked && oi === item.answer
                  const wrong = checked && active && oi !== item.answer
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={checked}
                      onClick={() =>
                        setPicked((prev) => {
                          const next = [...prev]
                          next[i] = oi
                          return next
                        })
                      }
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                        correct
                          ? 'border-[#059669] bg-[#ECFDF5] text-[#047857]'
                          : wrong
                            ? 'border-[#DC2626] bg-[#FEF2F2] text-[#B91C1C]'
                            : active
                              ? 'border-[#00AEEF] bg-[#E8F7FC] text-[#0D1B2E]'
                              : 'border-slate-200 hover:border-[#00AEEF] dark:border-[#2A3650]'
                      }`}
                    >
                      <span className="mr-2 text-[#00AEEF]">{copy.letters[oi]}.</span>
                      {option}
                    </button>
                  )
                })}
              </div>
              {show && <p className="mt-3 text-sm text-[#00AEEF]">{item.why}</p>}
            </A1MotionCard>
          ))}
        </ol>
      )}

      {started && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!checked ? (
            <button type="button" className="rounded-full bg-[#0D1B2E] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white" onClick={() => setChecked(true)}>
              {copy.submit}
            </button>
          ) : (
            <button type="button" className="rounded-full bg-[#00AEEF] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#0D1B2E]" onClick={begin}>
              {copy.retry}
            </button>
          )}
          {checked && (
            <button type="button" className="text-sm font-semibold text-[#00AEEF]" onClick={() => setShow((v) => !v)}>
              {show ? copy.hide : copy.show}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
