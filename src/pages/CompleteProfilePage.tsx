import { ArrowLeft } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../components/AppFrame'
import {
  ACCESSORIES,
  CharacterAvatar,
  DEFAULT_CUSTOM_AVATAR,
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  SHIRT_COLORS,
  SKIN_TONES,
} from '../components/CharacterAvatar'
import { useAuth } from '../context/AuthContext'
import { AVATAR_COUNT, avatarSrc } from '../lib/localSkillQuestions'
import { digitsOnlyMax12 } from '../lib/studentId'
import type { CustomAvatar } from '../types'

export function CompleteProfilePage() {
  const { profile, completeProfile, needsProfile, signOut } = useAuth()
  const nav = useNavigate()
  const [fullName, setFullName] = useState(profile?.fullName ?? '')
  const [studentId, setStudentId] = useState(profile?.studentId ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [avatarIndex, setAvatarIndex] = useState<number | undefined>(profile?.avatarIndex)
  const [custom, setCustom] = useState<CustomAvatar>(profile?.customAvatar ?? DEFAULT_CUSTOM_AVATAR)
  const [mode, setMode] = useState<'preset' | 'create'>(profile?.customAvatar ? 'create' : 'preset')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    try {
      await completeProfile({
        fullName,
        studentId,
        bio,
        avatarIndex: mode === 'preset' ? avatarIndex : undefined,
        customAvatar: mode === 'create' ? custom : null,
      })
      setMsg('Perfil guardado')
      if (!needsProfile) nav('/me')
    } finally {
      setBusy(false)
    }
  }

  async function goBack() {
    if (needsProfile) {
      await signOut()
      nav('/login')
      return
    }
    nav(-1)
  }

  return (
    <Page>
      <button
        type="button"
        onClick={() => void goBack()}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1967D2] dark:text-[#8BB4FF]"
      >
        <ArrowLeft size={18} /> Volver
      </button>
      {!needsProfile && <p className="mb-2 text-sm text-[#97A3B5]">Datos personales</p>}
      <h1 className="mb-6 text-2xl font-extrabold text-[#1967D2] dark:text-[#8BB4FF]">Completa tu perfil</h1>
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1A2438] lg:p-8"
      >
        <div className="mb-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-full border-4 border-white shadow-md dark:border-[#2A3650]">
              {mode === 'create' ? (
                <CharacterAvatar avatar={custom} size={160} />
              ) : avatarSrc(avatarIndex) ? (
                <img src={avatarSrc(avatarIndex)} alt="" className="avatar-bob h-40 w-40 object-cover" />
              ) : (
                <div className="grid h-40 w-40 place-items-center bg-[#162A4E] text-4xl font-extrabold text-[#98E7FF]">
                  {(fullName || 'U')[0]}
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-sm text-[#7A879A]">Así te verán en FluidLearn</p>
          </div>

          <div>
            <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-xl border border-[#1967D2]">
              <button
                type="button"
                className={`py-2.5 text-sm font-semibold ${mode === 'preset' ? 'bg-[#1967D2] text-white' : 'bg-transparent text-[#1967D2] dark:text-[#8BB4FF]'}`}
                onClick={() => setMode('preset')}
              >
                Elegir
              </button>
              <button
                type="button"
                className={`py-2.5 text-sm font-semibold ${mode === 'create' ? 'bg-[#1967D2] text-white' : 'bg-transparent text-[#1967D2] dark:text-[#8BB4FF]'}`}
                onClick={() => setMode('create')}
              >
                Crear personaje
              </button>
            </div>

            {mode === 'preset' ? (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {Array.from({ length: AVATAR_COUNT }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatarIndex(i)}
                    className={`overflow-hidden rounded-2xl border-2 ${avatarIndex === i ? 'border-[#1967D2]' : 'border-transparent'}`}
                    style={{ animationDelay: `${(i % 8) * 0.12}s` }}
                  >
                    <img
                      src={avatarSrc(i)}
                      alt={`Avatar ${i + 1}`}
                      className="avatar-bob h-16 w-full object-cover"
                      style={{ animationDelay: `${(i % 8) * 0.12}s` }}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <SwatchRow label="Piel" colors={SKIN_TONES} value={custom.skin} onChange={(skin) => setCustom((c) => ({ ...c, skin }))} />
                <SwatchRow label="Cabello" colors={HAIR_COLORS} value={custom.hair} onChange={(hair) => setCustom((c) => ({ ...c, hair }))} />
                <p className="text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Peinado</p>
                <div className="flex flex-wrap gap-2">
                  {HAIR_STYLES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCustom((c) => ({ ...c, hairStyle: s.id }))}
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                        custom.hairStyle === s.id
                          ? 'bg-[#1967D2] text-white'
                          : 'bg-[#EEF3FA] text-[#1967D2] dark:bg-[#243044] dark:text-[#8BB4FF]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <SwatchRow label="Ojos" colors={EYE_COLORS} value={custom.eyes} onChange={(eyes) => setCustom((c) => ({ ...c, eyes }))} />
                <SwatchRow label="Ropa" colors={SHIRT_COLORS} value={custom.shirt} onChange={(shirt) => setCustom((c) => ({ ...c, shirt }))} />
                <p className="text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Accesorio</p>
                <div className="flex flex-wrap gap-2">
                  {ACCESSORIES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCustom((c) => ({ ...c, accessory: s.id }))}
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                        custom.accessory === s.id
                          ? 'bg-[#1967D2] text-white'
                          : 'bg-[#EEF3FA] text-[#1967D2] dark:bg-[#243044] dark:text-[#8BB4FF]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <input
          className="mb-3 w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="mb-3 w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
          placeholder="Código estudiantil (máx. 12 dígitos)"
          value={studentId}
          onChange={(e) => setStudentId(digitsOnlyMax12(e.target.value))}
          inputMode="numeric"
          pattern="\d{1,12}"
          maxLength={12}
          required
        />
        <textarea
          className="mb-4 w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
          placeholder="Bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        {msg && <p className="mb-3 text-sm text-emerald-600">{msg}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#1967D2] py-3 font-semibold text-white">
          {busy ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
    </Page>
  )
}

function SwatchRow({
  label,
  colors,
  value,
  onChange,
}: {
  label: string
  colors: string[]
  value: string
  onChange: (c: string) => void
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`${label} ${c}`}
            onClick={() => onChange(c)}
            className={`h-8 w-8 rounded-full border-2 ${value === c ? 'border-[#1967D2] ring-2 ring-[#1967D2]/30' : 'border-white dark:border-[#1A2438]'}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  )
}
