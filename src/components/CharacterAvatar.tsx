import type { Accessory, CustomAvatar, HairStyle, UserProfile } from '../types'
import { avatarSrc } from '../lib/localSkillQuestions'

export const DEFAULT_CUSTOM_AVATAR: CustomAvatar = {
  skin: '#E8B887',
  hair: '#2C1810',
  hairStyle: 'short',
  eyes: '#3B2314',
  shirt: '#1967D2',
  accessory: 'none',
}

export const SKIN_TONES = ['#F9D7B5', '#E8B887', '#C68642', '#8D5524', '#5C3317']
export const HAIR_COLORS = ['#1A1A1A', '#4A3728', '#C4A35A', '#D4533B', '#2C5F8A', '#F2F2F2']
export const SHIRT_COLORS = ['#1967D2', '#162A4E', '#20CE9F', '#F36D86', '#9A78FF', '#FFC229']
export const EYE_COLORS = ['#3B2314', '#1F4E79', '#2E7D4F', '#111111']
export const HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: 'short', label: 'Corto' },
  { id: 'long', label: 'Largo' },
  { id: 'curly', label: 'Rizado' },
  { id: 'bun', label: 'Moño' },
  { id: 'fade', label: 'Fade' },
]
export const ACCESSORIES: { id: Accessory; label: string }[] = [
  { id: 'none', label: 'Nada' },
  { id: 'glasses', label: 'Lentes' },
  { id: 'headphones', label: 'Audífonos' },
  { id: 'cap', label: 'Gorra' },
]

export function CharacterAvatar({
  avatar,
  size = 120,
  animated = true,
}: {
  avatar: CustomAvatar
  size?: number
  animated?: boolean
}) {
  const { skin, hair, hairStyle, eyes, shirt, accessory } = avatar
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden
      className={`block ${animated ? 'avatar-float' : ''}`}
    >
      <circle cx="60" cy="60" r="60" fill={shirt} opacity="0.22" />
      <ellipse cx="60" cy="108" rx="38" ry="22" fill={shirt} />
      <circle cx="60" cy="58" r="28" fill={skin} />
      {hairStyle === 'long' && <path d="M32 58c2 28 16 40 28 40s26-12 28-40c-4 10-16 16-28 16S36 68 32 58Z" fill={hair} />}
      {hairStyle === 'curly' && (
        <>
          <circle cx="38" cy="40" r="10" fill={hair} />
          <circle cx="52" cy="30" r="11" fill={hair} />
          <circle cx="68" cy="30" r="11" fill={hair} />
          <circle cx="82" cy="40" r="10" fill={hair} />
        </>
      )}
      {hairStyle === 'bun' && <circle cx="60" cy="24" r="10" fill={hair} />}
      {(hairStyle === 'short' || hairStyle === 'fade' || hairStyle === 'bun' || hairStyle === 'long') && (
        <path
          d={hairStyle === 'fade' ? 'M34 52c2-22 52-22 52 0 0-16-10-26-26-26S34 36 34 52Z' : 'M32 58c0-22 12-32 28-32s28 10 28 32c-6-14-16-20-28-20S38 44 32 58Z'}
          fill={hair}
        />
      )}
      <circle cx="50" cy="58" r="3.2" fill={eyes} />
      <circle cx="70" cy="58" r="3.2" fill={eyes} />
      <path d="M52 70c4 5 12 5 16 0" fill="none" stroke="#c26a5a" strokeWidth="2" strokeLinecap="round" />
      {accessory === 'glasses' && (
        <>
          <circle cx="50" cy="58" r="8" fill="none" stroke="#222" strokeWidth="2" />
          <circle cx="70" cy="58" r="8" fill="none" stroke="#222" strokeWidth="2" />
          <path d="M58 58h4" stroke="#222" strokeWidth="2" />
        </>
      )}
      {accessory === 'headphones' && (
        <>
          <path d="M34 52a26 26 0 0 1 52 0" fill="none" stroke="#1D2A44" strokeWidth="5" />
          <rect x="28" y="50" width="10" height="16" rx="4" fill="#1D2A44" />
          <rect x="82" y="50" width="10" height="16" rx="4" fill="#1D2A44" />
        </>
      )}
      {accessory === 'cap' && (
        <>
          <ellipse cx="60" cy="38" rx="26" ry="10" fill={hair} />
          <rect x="34" y="34" width="52" height="10" rx="5" fill={shirt} />
        </>
      )}
    </svg>
  )
}

export function UserAvatar({
  profile,
  size,
  initial,
}: {
  profile?: Pick<UserProfile, 'fullName' | 'profilePhotoUrl' | 'avatarIndex' | 'customAvatar'> | null
  size: number
  initial?: string
}) {
  const letter = initial || (profile?.fullName || 'U')[0]
  if (profile?.customAvatar) {
    return (
      <div className="overflow-hidden rounded-full" style={{ width: size, height: size }}>
        <CharacterAvatar avatar={profile.customAvatar} size={size} />
      </div>
    )
  }
  const src = profile?.profilePhotoUrl || avatarSrc(profile?.avatarIndex)
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="avatar-bob h-full w-full rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="grid place-items-center rounded-full bg-[#162A4E] font-extrabold text-[#98E7FF]"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {letter}
    </div>
  )
}
