import { Camera } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { AvatarPickerGrid } from '../components/AvatarPickerGrid'
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
import { EmojiPicker } from '../components/EmojiPicker'
import { useAuth } from '../context/AuthContext'
import { AVATAR_COUNT, avatarSrc } from '../lib/localSkillQuestions'
import { digitsOnlyMax12 } from '../lib/studentId'
import type { CustomAvatar } from '../types'

export function CompleteProfilePage() {
  const { profile, completeProfile, needsProfile, signOut } = useAuth()
  const nav = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const [firstName, setFirstName] = useState(profile?.firstName || (profile?.fullName ?? '').split(/\s+/)[0] || '')
  const [lastName, setLastName] = useState(profile?.lastName || (profile?.fullName ?? '').split(/\s+/).slice(1).join(' '))
  const [fullName, setFullName] = useState(profile?.fullName ?? '')
  const [studentId, setStudentId] = useState(profile?.studentId ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [country, setCountry] = useState(profile?.country ?? 'Colombia')
  const [city, setCity] = useState(profile?.city ?? '')
  const [timezone, setTimezone] = useState(profile?.timezone ?? 'America/Bogota')
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>(profile?.visibility ?? 'visible')
  const [interests, setInterests] = useState(profile?.interests ?? '')
  const [imageAlt, setImageAlt] = useState(profile?.imageAlt ?? '')
  const [avatarIndex, setAvatarIndex] = useState<number | undefined>(profile?.avatarIndex)
  const [custom, setCustom] = useState<CustomAvatar>(profile?.customAvatar ?? DEFAULT_CUSTOM_AVATAR)
  const [mode, setMode] = useState<'preset' | 'create'>(profile?.customAvatar ? 'create' : 'preset')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | undefined>(profile?.profilePhotoUrl)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  function onFile(file?: File) {
    if (!file) return
    setPhotoFile(file)
    setPreview(URL.createObjectURL(file))
    setAvatarIndex(undefined)
    setMode('preset')
  }

  function insertEmoji(emoji: string) {
    const el = descRef.current
    if (!el) {
      setBio((v) => v + emoji)
      return
    }
    const start = el.selectionStart ?? bio.length
    const end = el.selectionEnd ?? bio.length
    const next = bio.slice(0, start) + emoji + bio.slice(end)
    setBio(next)
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + emoji.length
      el.setSelectionRange(pos, pos)
    })
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const composed = [firstName, lastName].filter(Boolean).join(' ') || fullName
      await completeProfile({
        fullName: composed,
        firstName,
        lastName,
        studentId,
        bio,
        country,
        city,
        timezone,
        visibility,
        interests,
        imageAlt,
        avatarIndex: photoFile || mode === 'create' ? undefined : avatarIndex,
        customAvatar: !photoFile && mode === 'create' ? custom : null,
        photoFile,
      })
      setMsg('Perfil guardado en Firebase')
      if (!needsProfile) nav('/me')
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo guardar')
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

  const previewSrc = preview || (typeof avatarIndex === 'number' ? avatarSrc(avatarIndex) : undefined)

  return (
    <Page className="max-w-[920px]">
      <BackBar label="Volver" onClick={() => void goBack()} />
      {!needsProfile && <p className="mb-2 text-sm text-[#97A3B5]">Datos personales</p>}
      <h1 className="mb-5 text-2xl font-extrabold text-[#1A6FE8] dark:text-[#8BB4FF]">
        {needsProfile ? 'Completa tu perfil' : (profile?.fullName || 'Editar perfil')}
      </h1>
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="rounded-3xl bg-white p-5 shadow-sm dark:bg-[#1A2438] sm:p-6 lg:p-8"
      >
        <div className="mb-6 grid gap-6 lg:grid-cols-[200px_1fr]">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="group relative overflow-hidden rounded-full border-4 border-white shadow-md dark:border-[#2A3650]"
              aria-label="Cambiar foto de perfil"
            >
              {previewSrc ? (
                <img src={previewSrc} alt="" className="h-36 w-36 object-cover object-top sm:h-40 sm:w-40" />
              ) : mode === 'create' ? (
                <CharacterAvatar avatar={custom} size={160} />
              ) : (
                <div className="grid h-36 w-36 place-items-center bg-[#162A4E] text-4xl font-extrabold text-[#98E7FF] sm:h-40 sm:w-40">
                  {(fullName || 'U')[0]}
                </div>
              )}
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/45 py-1.5 text-[11px] font-semibold text-white">
                <Camera size={12} /> Foto
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <p className="mt-3 text-center text-sm text-[#7A879A]">Así te verán en FluidLearn</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 text-sm font-semibold text-[#1A6FE8]"
            >
              Subir imagen
            </button>
          </div>

          <div>
            <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-xl border border-[#1A6FE8]">
              <button
                type="button"
                className={`py-2.5 text-sm font-semibold ${mode === 'preset' ? 'bg-[#1A6FE8] text-white' : 'bg-transparent text-[#1A6FE8] dark:text-[#8BB4FF]'}`}
                onClick={() => setMode('preset')}
              >
                Elegir
              </button>
              <button
                type="button"
                className={`py-2.5 text-sm font-semibold ${mode === 'create' ? 'bg-[#1A6FE8] text-white' : 'bg-transparent text-[#1A6FE8] dark:text-[#8BB4FF]'}`}
                onClick={() => {
                  setMode('create')
                  setPhotoFile(null)
                }}
              >
                Crear personaje
              </button>
            </div>

            {mode === 'preset' ? (
              <AvatarPickerGrid
                count={AVATAR_COUNT}
                selected={photoFile ? undefined : avatarIndex}
                onSelect={(i) => {
                  setAvatarIndex(i)
                  setPhotoFile(null)
                  setPreview(undefined)
                }}
              />
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
                          ? 'bg-[#1A6FE8] text-white'
                          : 'bg-[#EEF3FA] text-[#1A6FE8] dark:bg-[#243044] dark:text-[#8BB4FF]'
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
                          ? 'bg-[#1A6FE8] text-white'
                          : 'bg-[#EEF3FA] text-[#1A6FE8] dark:bg-[#243044] dark:text-[#8BB4FF]'
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

        <p className="mb-3 text-sm font-bold text-[#1D2A44] dark:text-[#E8EEF8]">General</p>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Nombre</span>
            <input
              className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                setFullName([e.target.value, lastName].filter(Boolean).join(' '))
              }}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Apellido(s)</span>
            <input
              className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                setFullName([firstName, e.target.value].filter(Boolean).join(' '))
              }}
            />
          </label>
        </div>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Dirección de correo</span>
          <input
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-100 px-4 py-3 text-[#7A8699] dark:border-[#2A3650] dark:bg-[#243044]"
            value={profile?.email ?? ''}
            readOnly
          />
        </label>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Visibilidad para participantes del curso</span>
          <select
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'visible' | 'hidden')}
          >
            <option value="visible">Visible para los participantes del curso</option>
            <option value="hidden">Oculto para otros participantes</option>
          </select>
        </label>
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Ciudad/Pueblo</span>
            <input
              className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">País</span>
            <input
              className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
        </div>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Zona horaria</span>
          <select
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="America/Bogota">America/Bogota</option>
            <option value="America/Caracas">America/Caracas</option>
            <option value="America/Mexico_City">America/Mexico_City</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/Madrid">Europe/Madrid</option>
          </select>
        </label>
        <label className="fl-rise mb-3 block" style={{ animationDelay: '90ms' }}>
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Código estudiantil</span>
          <input
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            placeholder="Máx. 12 dígitos"
            value={studentId}
            onChange={(e) => setStudentId(digitsOnlyMax12(e.target.value))}
            inputMode="numeric"
            pattern="\d{1,12}"
            maxLength={12}
            required
          />
        </label>
        <label className="fl-rise mb-2 block" style={{ animationDelay: '140ms' }}>
          <span className="mb-1 flex items-center justify-between text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">
            Descripción
            <EmojiPicker onPick={insertEmoji} />
          </span>
          <textarea
            ref={descRef}
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            placeholder="Cuéntanos algo sobre ti… puedes usar iconos"
            rows={4}
            maxLength={280}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <span className="mt-1 block text-right text-xs text-[#9AA6B8]">{bio.length}/280</span>
        </label>
        <p className="mb-2 mt-6 text-sm font-bold text-[#1D2A44] dark:text-[#E8EEF8]">Imagen del usuario</p>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Descripción de la imagen</span>
          <input
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Texto alternativo de tu foto"
          />
        </label>
        <p className="mb-2 mt-4 text-sm font-bold text-[#1D2A44] dark:text-[#E8EEF8]">Opcional</p>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-semibold text-[#1D2A44] dark:text-[#E8EEF8]">Intereses</span>
          <input
            className="w-full rounded-xl border border-[#E4EBF5] bg-slate-50 px-4 py-3 dark:border-[#2A3650] dark:bg-[#243044] dark:text-[#E8EEF8]"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Inglés, lectura, conversación…"
          />
        </label>
        {msg && <p className="mb-3 text-sm text-emerald-600">{msg}</p>}
        {err && <p className="mb-3 text-sm text-rose-600">{err}</p>}
        <button disabled={busy} className="fl-rise w-full rounded-xl bg-[#1A6FE8] py-3 font-semibold text-white" style={{ animationDelay: '190ms' }}>
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
            className={`h-8 w-8 rounded-full border-2 ${value === c ? 'border-[#1A6FE8] ring-2 ring-[#1A6FE8]/30' : 'border-white dark:border-[#1A2438]'}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  )
}
