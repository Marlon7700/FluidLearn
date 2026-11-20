import { useMemo, useState } from 'react'
import { buildCrossword, type GameClue } from '../../lib/learningGames'

export function CrosswordGame({
  clues,
  onComplete,
}: {
  clues: GameClue[]
  onComplete: (percent: number) => void
}) {
  const puzzle = useMemo(() => buildCrossword(clues), [clues])
  const [values, setValues] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState('')

  function key(r: number, c: number) {
    return `${r}-${c}`
  }

  function check() {
    let total = 0
    let ok = 0
    puzzle.grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell) return
        total += 1
        if ((values[key(r, c)] || '').toUpperCase() === cell.ch) ok += 1
      })
    })
    const percent = total === 0 ? 100 : Math.round((ok / total) * 100)
    setMsg(percent === 100 ? '¡Crucigrama completo!' : `Llevas ${percent}% de letras correctas.`)
    onComplete(percent)
  }

  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#00AEEF]">Crucigrama</p>
      <div className="mt-4 overflow-x-auto">
        <div className="inline-grid gap-px bg-[#0D1B2E] p-1" style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1.9rem)` }}>
          {puzzle.grid.map((row, r) =>
            row.map((cell, c) =>
              cell ? (
                <div key={key(r, c)} className="relative h-[1.9rem] w-[1.9rem] bg-white">
                  {cell.num ? <span className="absolute left-0.5 top-0 text-[8px] font-bold text-[#1A6FE8]">{cell.num}</span> : null}
                  <input
                    maxLength={1}
                    value={values[key(r, c)] || ''}
                    onChange={(e) => setValues((v) => ({ ...v, [key(r, c)]: e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase() }))}
                    className="h-full w-full bg-transparent text-center text-xs font-extrabold uppercase outline-none"
                  />
                </div>
              ) : (
                <div key={key(r, c)} className="h-[1.9rem] w-[1.9rem] bg-[#0D1B2E]" />
              ),
            ),
          )}
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-extrabold uppercase text-[#64748B]">Horizontal</p>
          {puzzle.across.map((a) => (
            <p key={`a${a.num}`} className="mt-1 text-sm">
              <b>{a.num}.</b> {a.clue}
            </p>
          ))}
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase text-[#64748B]">Vertical</p>
          {puzzle.down.map((a) => (
            <p key={`d${a.num}`} className="mt-1 text-sm">
              <b>{a.num}.</b> {a.clue}
            </p>
          ))}
        </div>
      </div>
      {msg && <p className="mt-3 font-semibold text-[#1A6FE8]">{msg}</p>}
      <button type="button" onClick={check} className="mt-4 rounded-xl bg-[#00AEEF] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-[#0D1B2E]">
        Revisar crucigrama
      </button>
    </div>
  )
}
