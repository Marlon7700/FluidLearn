import { useMemo, useState } from 'react'
import { normalizeWord } from '../../lib/learningGames'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function HangmanGame({
  word,
  clue,
  onComplete,
}: {
  word: string
  clue: string
  onComplete: (percent: number) => void
}) {
  const secret = useMemo(() => normalizeWord(word), [word])
  const [guessed, setGuessed] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const wrong = guessed.filter((l) => !secret.includes(l)).length
  const lives = 6 - wrong
  const display = secret.split('').map((ch) => (guessed.includes(ch) ? ch : '_'))
  const won = secret.length > 0 && display.join('') === secret
  const lost = lives <= 0

  function pick(letter: string) {
    if (done || guessed.includes(letter)) return
    const next = [...guessed, letter]
    setGuessed(next)
    const nextWrong = next.filter((l) => !secret.includes(l)).length
    const nextWon = secret.split('').every((ch) => next.includes(ch))
    if (nextWon || nextWrong >= 6) {
      setDone(true)
      onComplete(nextWon ? 100 : Math.max(0, Math.round((1 - nextWrong / 6) * 40)))
    }
  }

  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Ahorcado</p>
      <p className="mt-1 text-sm text-[#64748B]">Pista: {clue}</p>
      <p className="mt-6 text-center text-3xl font-extrabold tracking-[0.35em] text-[#0D1B2E]">{display.join(' ')}</p>
      <p className="mt-3 text-center text-sm text-[#64748B]">Vidas: {Math.max(0, lives)} / 6</p>
      <div className="mt-5 grid grid-cols-7 gap-2 sm:grid-cols-9">
        {LETTERS.map((l) => (
          <button
            key={l}
            type="button"
            disabled={guessed.includes(l) || done}
            onClick={() => pick(l)}
            className={`rounded-xl py-2 text-sm font-extrabold ${
              guessed.includes(l)
                ? secret.includes(l)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-600'
                : 'bg-[#F1F5F9] text-[#0D1B2E] hover:bg-[#00AEEF] hover:text-[#0D1B2E]'
            } disabled:opacity-60`}
          >
            {l}
          </button>
        ))}
      </div>
      {(won || lost) && (
        <p className="mt-4 text-center font-extrabold text-[#1A6FE8]">
          {won ? `¡Correcto! La palabra es ${secret}.` : `La palabra era ${secret}.`}
        </p>
      )}
    </div>
  )
}
