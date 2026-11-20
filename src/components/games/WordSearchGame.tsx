import { useMemo, useState } from 'react'
import { buildWordSearch } from '../../lib/learningGames'

export function WordSearchGame({
  words,
  onComplete,
}: {
  words: string[]
  onComplete: (percent: number) => void
}) {
  const puzzle = useMemo(() => buildWordSearch(words, 12), [words])
  const [found, setFound] = useState<string[]>([])
  const [start, setStart] = useState<{ r: number; c: number } | null>(null)
  const [done, setDone] = useState(false)

  function cellClick(r: number, c: number) {
    if (done) return
    if (!start) {
      setStart({ r, c })
      return
    }
    const dr = Math.sign(r - start.r)
    const dc = Math.sign(c - start.c)
    const len = Math.max(Math.abs(r - start.r), Math.abs(c - start.c)) + 1
    let letters = ''
    for (let i = 0; i < len; i++) {
      const rr = start.r + dr * i
      const cc = start.c + dc * i
      if (rr < 0 || cc < 0 || rr >= puzzle.size || cc >= puzzle.size) {
        letters = ''
        break
      }
      letters += puzzle.grid[rr][cc]
    }
    const hit = puzzle.words.find((w) => w === letters || w === letters.split('').reverse().join(''))
    if (hit && !found.includes(hit)) {
      const next = [...found, hit]
      setFound(next)
      if (next.length === puzzle.words.length) {
        setDone(true)
        onComplete(100)
      }
    }
    setStart(null)
  }

  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Sopa de letras</p>
      <p className="mt-1 text-sm text-[#64748B]">Toca la primera y la última letra de cada palabra.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {puzzle.words.map((w) => (
          <span key={w} className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${found.includes(w) ? 'bg-emerald-100 text-emerald-700 line-through' : 'bg-[#F1F5F9] text-[#0D1B2E]'}`}>
            {w}
          </span>
        ))}
      </div>
      <div className="mt-4 inline-grid gap-0.5 rounded-2xl bg-[#0D1B2E] p-2" style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}>
        {puzzle.grid.map((row, r) =>
          row.map((ch, c) => {
            const active = start?.r === r && start?.c === c
            return (
              <button
                key={`${r}-${c}`}
                type="button"
                onClick={() => cellClick(r, c)}
                className={`h-7 w-7 text-[11px] font-extrabold sm:h-8 sm:w-8 ${active ? 'bg-[#00AEEF] text-[#0D1B2E]' : 'bg-white text-[#0D1B2E] hover:bg-[#E0F6FF]'}`}
              >
                {ch}
              </button>
            )
          }),
        )}
      </div>
      {found.length === puzzle.words.length && puzzle.words.length > 0 ? (
        <p className="mt-4 font-extrabold text-[#1A6FE8]">¡Encontraste todas las palabras!</p>
      ) : (
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-[#1A6FE8]"
          onClick={() => {
            setDone(true)
            onComplete(Math.round((found.length / Math.max(1, puzzle.words.length)) * 100))
          }}
        >
          Entregar avance ({found.length}/{puzzle.words.length})
        </button>
      )}
    </div>
  )
}
