import { Camera } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { AvatarPickerGrid } from '../components/AvatarPickerGrid'
import { useAuth } from '../context/AuthContext'
import { AVATAR_COUNT, avatarSrc } from '../lib/localSkillQuestions'
import { studentCopy } from '../lib/studentUi'

export function ProfilePhotoPage() {
  const { profile, completeProfile } = useAuth()
  const nav = useNavigate()
  const t = studentCopy(profile?.appLanguage)
  const fileRef = useRef<HTMLInputElement>(null)
  const [index, setIndex] = useState<number | undefined>(profile?.avatarIndex)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | undefined>()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function finish() {
    if (!profile) return
    setBusy(true)
    setErr('')
    try {
      await completeProfile({
        fullName: profile.fullName,
        studentId: profile.studentId,
        bio: profile.bio,
        avatarIndex: photoFile ? undefined : index,
        customAvatar: null,
        photoFile,
      })
      nav('/me')
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'No se pudo guardar la foto')
    } finally {
      setBusy(false)
    }
  }

  const shown = preview || (typeof index === 'number' ? avatarSrc(index) : profile?.profilePhotoUrl)

  return (
    <Page className="max-w-[720px]">
      <BackBar to="/me" label="Volver" />
      <div className="mb-6 flex items-center">
        <h1 className="flex-1 text-center text-[18px] font-bold text-[#1D2A44] dark:text-[#E8EEF8]">{t.profilePhoto}</h1>
        <button
          type="button"
          disabled={busy}
          onClick={() => void finish()}
          className="text-[16px] font-semibold text-[#1A6FE8] disabled:opacity-50"
        >
          {t.finish}
        </button>
      </div>

      <div className="mb-6 flex flex-col items-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative overflow-hidden rounded-full border-4 border-white shadow-md"
        >
          {shown ? (
            <img src={shown} alt="" className="h-28 w-28 object-cover object-top" />
          ) : (
            <div className="grid h-28 w-28 place-items-center bg-[#162A4E] text-3xl font-extrabold text-[#98E7FF]">
              {(profile?.fullName || 'U')[0]}
            </div>
          )}
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/45 py-1 text-[11px] font-semibold text-white">
            <Camera size={12} /> Subir
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return
            setPhotoFile(file)
            setPreview(URL.createObjectURL(file))
            setIndex(undefined)
          }}
        />
      </div>

      <AvatarPickerGrid
        count={AVATAR_COUNT}
        selected={photoFile ? undefined : index}
        onSelect={(i) => {
          setIndex(i)
          setPhotoFile(null)
          setPreview(undefined)
        }}
      />
      {err && <p className="mt-4 text-center text-sm text-rose-600">{err}</p>}
    </Page>
  )
}
