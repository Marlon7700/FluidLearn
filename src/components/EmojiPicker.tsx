import { Search, Smile } from 'lucide-react'
import { useMemo, useState } from 'react'

const GROUPS: { id: string; label: string; emojis: string[] }[] = [
  {
    id: 'smile',
    label: 'Emoticonos y personas',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
      '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪',
      '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🫡', '🤐', '🤨', '😐', '😑', '😶', '🫥',
      '😏', '😒', '🙄', '😬', '😮‍💨', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷',
      '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎',
      '🤓', '🧐', '😕', '🫤', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '🥹',
      '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩',
      '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👻',
      '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🤟',
      '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊',
      '🤛', '🤜', '👏', '🙌', '🫶', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🔥',
      '⭐', '🌟', '✨', '💫', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
      '💯', '🎉', '📚', '✏️', '🎓', '💡', '🗣️', '🎧', '🎤', '📖',
    ],
  },
]

export function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const emojis = useMemo(() => {
    const all = GROUPS[0].emojis
    const query = q.trim()
    if (!query) return all
    return all.filter((e) => e.includes(query))
  }, [q])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
          open ? 'bg-[#1A6FE8] text-white' : 'bg-[#EEF3FA] text-[#1A6FE8] dark:bg-[#243044] dark:text-[#8BB4FF]'
        }`}
        aria-expanded={open}
      >
        <Smile size={16} /> Iconos
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-[min(calc(100vw-2.5rem),340px)] overflow-hidden rounded-2xl border border-[#E4EBF5] bg-[#1C1C1E] p-3 shadow-2xl dark:border-[#2A3650] sm:w-[340px]">
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#2C2C2E] px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar emoji"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <p className="mb-2 text-[11px] font-medium text-slate-400">{GROUPS[0].label}</p>
          <div className="grid max-h-[220px] grid-cols-8 gap-1 overflow-y-auto sm:grid-cols-9">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="grid h-8 w-8 place-items-center rounded-lg text-lg hover:bg-white/10"
                onClick={() => {
                  onPick(emoji)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
