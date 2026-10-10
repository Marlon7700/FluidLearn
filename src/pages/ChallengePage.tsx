import { ArrowLeft, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '../components/AppFrame'
import { useAuth } from '../context/AuthContext'
import { QUIZZES } from '../data/catalog'
import { loadLocalSkillQuestions, mergedQuiz, wordCount } from '../lib/localSkillQuestions'
import type { SkillKey, SkillQuiz } from '../types'

export function ChallengePage() {
  const { skillKey = 'listening', taskId = '' } = useParams()
  const { completeActivity } = useAuth()
  const nav = useNavigate()
  const [quiz, setQuiz] = useState<SkillQuiz | undefined>(QUIZZES[taskId])
  const [answers, setAnswers] = useState<number[]>([])
  const [texts, setTexts] = useState<string[]>([])
  const [spoken, setSpoken] = useState<boolean[]>([])
  const [done, setDone] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void loadLocalSkillQuestions().then(() => {
      setQuiz(mergedQuiz(taskId, QUIZZES[taskId]))
    })
  }, [taskId])

  const phrases = quiz?.speakPhrases ?? []
  const isSpeaking = phrases.length > 0
  const isOpen = (quiz?.questions ?? []).some((q) => (q.minWords ?? 0) > 0)
  const total = isSpeaking ? phrases.length : quiz?.questions.length ?? 0
  const spokenCount = useMemo(() => spoken.filter(Boolean).length, [spoken])

  function speak(text: string) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    window.speechSynthesis.speak(u)
  }

  async function listenPhrase(i: number) {
    const SpeechRecognition =
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition ||
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition
    if (!SpeechRecognition) {
      setSpoken((s) => {
        const n = [...s]
        n[i] = true
        return n
      })
      return
    }
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.onresult = () => {
      setSpoken((s) => {
        const n = [...s]
        n[i] = true
        return n
      })
    }
    rec.start()
  }

  async function submit() {
    if (!quiz) return
    setBusy(true)
    try {
      let correct = 0
      if (isSpeaking) {
        correct = spokenCount
      } else if (isOpen) {
        quiz.questions.forEach((q, i) => {
          if (wordCount(texts[i] ?? '') >= (q.minWords ?? 12)) correct += 1
        })
      } else {
        quiz.questions.forEach((q, i) => {
          if (answers[i] === q.correctIndex) correct += 1
        })
      }
      const percent = total === 0 ? 100 : Math.round((correct / total) * 100)
      await completeActivity({
        skillKey: skillKey as SkillKey,
        taskId,
        taskTitle: taskId.replaceAll('_', ' '),
        overallPercent: percent,
        quizCorrect: correct,
        quizTotal: total || 1,
      })
      setDone(`Resultado: ${percent}% (${correct}/${total || 1})`)
    } catch (e) {
      setDone(e instanceof Error ? e.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  if (!quiz) return <p className="p-6">Actividad no encontrada.</p>

  return (
    <Page>
      <button type="button" className="mb-4 inline-flex items-center gap-2 text-brand" onClick={() => nav(-1)}>
        <ArrowLeft size={18} /> Atrás
      </button>
      <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1A2438] lg:p-8">
        {quiz.intro && <p className="mb-4 whitespace-pre-wrap text-slate-600">{quiz.intro}</p>}
        {quiz.listenAloudText && (
          <button type="button" onClick={() => speak(quiz.listenAloudText!)} className="mb-6 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 font-semibold text-white">
            <Volume2 size={18} /> Escuchar
          </button>
        )}
        {isSpeaking &&
          phrases.map((ph, i) => (
            <div key={ph} className="mb-4 rounded-2xl bg-slate-50 p-4">
              <p className="font-medium">{ph}</p>
              <div className="mt-2 flex gap-2">
                <button type="button" className="rounded-lg bg-navy px-3 py-1 text-sm text-white" onClick={() => speak(ph)}>Modelo</button>
                <button type="button" className="rounded-lg bg-brand px-3 py-1 text-sm text-white" onClick={() => void listenPhrase(i)}>
                  {spoken[i] ? 'Validado' : 'Hablar / Validar'}
                </button>
              </div>
            </div>
          ))}
        {!isSpeaking &&
          quiz.questions.map((q, qi) => (
            <div key={`${q.prompt}-${qi}`} className="mb-6">
              <p className="mb-2 font-semibold">{q.prompt}</p>
              {(q.minWords ?? 0) > 0 ? (
                <>
                  <textarea
                    className="w-full rounded-xl border border-slate-200 p-3"
                    rows={5}
                    placeholder={`Write in English (min. ${q.minWords} words)`}
                    value={texts[qi] ?? ''}
                    onChange={(e) => setTexts((t) => { const n = [...t]; n[qi] = e.target.value; return n })}
                  />
                  <p className="mt-1 text-xs text-slate-500">{wordCount(texts[qi] ?? '')} / {q.minWords} words</p>
                </>
              ) : (
                <div className="grid gap-2">
                  {q.choices.map((c, ci) => (
                    <label key={c} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 ${answers[qi] === ci ? 'border-brand bg-blue-50' : 'border-slate-200'}`}>
                      <input type="radio" name={`q${qi}`} checked={answers[qi] === ci} onChange={() => setAnswers((a) => { const n = [...a]; n[qi] = ci; return n })} />
                      {c}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        {done && <p className="mb-3 font-semibold text-brand">{done}</p>}
        <button disabled={busy} type="button" onClick={() => void submit()} className="w-full rounded-xl bg-brand py-3 font-semibold text-white">
          {busy ? 'Guardando…' : 'Enviar y completar'}
        </button>
      </div>
    </Page>
  )
}

interface SpeechRecognition {
  lang: string
  start: () => void
  onresult: (() => void) | null
}
