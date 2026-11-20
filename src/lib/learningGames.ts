import type { GameClue } from '../types'

export type { GameClue }

export function normalizeWord(word: string) {
  return word
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z]/g, '')
}

export function buildWordSearch(words: string[], size = 12) {
  const list = words.map(normalizeWord).filter((w) => w.length >= 2 && w.length <= size)
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''))
  const placed: string[] = []
  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [0, -1],
    [-1, 0],
  ]

  function canPlace(word: string, r: number, c: number, dr: number, dc: number) {
    for (let i = 0; i < word.length; i++) {
      const rr = r + dr * i
      const cc = c + dc * i
      if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false
      const ch = grid[rr][cc]
      if (ch && ch !== word[i]) return false
    }
    return true
  }

  for (const word of list) {
    let ok = false
    for (let attempt = 0; attempt < 80 && !ok; attempt++) {
      const [dr, dc] = dirs[attempt % dirs.length]
      const r = Math.floor(Math.random() * size)
      const c = Math.floor(Math.random() * size)
      if (!canPlace(word, r, c, dr, dc)) continue
      for (let i = 0; i < word.length; i++) grid[r + dr * i][c + dc * i] = word[i]
      placed.push(word)
      ok = true
    }
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = letters[Math.floor(Math.random() * letters.length)]
    }
  }
  return { size, grid, words: placed }
}

export type CrosswordCell = { ch: string; num?: number } | null

export function buildCrossword(entries: GameClue[]) {
  const items = entries
    .map((e) => ({ word: normalizeWord(e.word), clue: e.clue }))
    .filter((e) => e.word.length >= 2)
    .slice(0, 8)
  const size = Math.min(16, Math.max(8, ...items.map((i) => i.word.length + 2)))
  const grid: CrosswordCell[][] = Array.from({ length: size }, () => Array.from({ length: size }, () => null))
  const across: { num: number; clue: string; word: string; r: number; c: number }[] = []
  const down: { num: number; clue: string; word: string; r: number; c: number }[] = []
  let num = 1

  function place(word: string, r: number, c: number, vertical: boolean) {
    for (let i = 0; i < word.length; i++) {
      const rr = vertical ? r + i : r
      const cc = vertical ? c : c + i
      if (rr >= size || cc >= size) return false
    }
    for (let i = 0; i < word.length; i++) {
      const rr = vertical ? r + i : r
      const cc = vertical ? c : c + i
      const prev = grid[rr][cc]
      if (prev && prev.ch !== word[i]) return false
    }
    const start = grid[r][c]
    const n = start?.num ?? num++
    for (let i = 0; i < word.length; i++) {
      const rr = vertical ? r + i : r
      const cc = vertical ? c : c + i
      grid[rr][cc] = { ch: word[i], num: i === 0 ? n : grid[rr][cc]?.num }
    }
    ;(vertical ? down : across).push({ num: n, clue: items.find((x) => x.word === word)?.clue || word, word, r, c })
    return true
  }

  if (items[0]) place(items[0].word, 1, 1, false)
  for (const item of items.slice(1)) {
    let placed = false
    for (let r = 0; r < size && !placed; r++) {
      for (let c = 0; c < size && !placed; c++) {
        const cell = grid[r][c]
        if (!cell) continue
        const idx = item.word.indexOf(cell.ch)
        if (idx < 0) continue
        if (place(item.word, r - idx, c, true)) placed = true
        else if (place(item.word, r, c - idx, false)) placed = true
      }
    }
    if (!placed) place(item.word, Math.min(size - 2, across.length + 1), 1, across.length % 2 === 0)
  }

  return { size, grid, across, down }
}
