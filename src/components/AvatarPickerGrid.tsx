import { avatarSrc } from '../lib/localSkillQuestions'

const RING = [
  '#C9E4C5',
  '#E8D5B5',
  '#F7C4C0',
  '#C9E4C5',
  '#D4C4F0',
  '#B8D4E8',
  '#C5E8E0',
  '#E8C8D8',
  '#E8DCC5',
  '#D0C8E8',
  '#C8E0C8',
  '#F0D4A8',
  '#C8E0C8',
  '#E8C8D8',
  '#C8D8F0',
  '#D5DDE8',
]

export function AvatarPickerGrid({
  count,
  selected,
  onSelect,
}: {
  count: number
  selected?: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => {
        const src = avatarSrc(i)
        const active = selected === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`fl-rise overflow-hidden rounded-full p-[3px] transition duration-200 hover:scale-[1.04] lg:w-full lg:rounded-full lg:p-0 ${
              active ? 'ring-[3px] ring-[#1A6FE8]' : 'ring-[3px] ring-transparent'
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
            aria-label={`Avatar ${i + 1}`}
          >
            <span
              className="flex h-[92px] w-[92px] items-center overflow-hidden rounded-full lg:h-16 lg:w-full lg:justify-start"
              style={{ background: RING[i % RING.length] }}
            >
              {src ? (
                <img src={src} alt="" className="h-full w-full object-cover object-top lg:h-16 lg:w-16 lg:rounded-full" />
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}
