import { doc, setDoc } from 'firebase/firestore'
import { useEffect, type ReactNode } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Globe,
  Headphones,
  Languages,
  Mail,
  MapPin,
  Mic,
  Pencil,
  PencilLine,
  Shield,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackBar } from '../components/BackBar'
import { Page } from '../components/AppFrame'
import { UserAvatar } from '../components/CharacterAvatar'
import { useAuth } from '../context/AuthContext'
import { SKILL_META } from '../data/catalog'
import { db } from '../firebase'
import { lastAccessLabel } from '../lib/courseAccess'
import { studentCopy } from '../lib/studentUi'
import type { SkillKey } from '../types'

const skillIcon = {
  listening: Headphones,
  speaking: Mic,
  reading: BookOpen,
  writing: PencilLine,
}

export function MePage() {
  const { profile, user } = useAuth()
  const nav = useNavigate()
  const t = studentCopy(profile?.appLanguage)
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fluidlearn.app'
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`${origin}/#/home`)}`
  const keys = Object.keys(SKILL_META) as SkillKey[]

  useEffect(() => {
    if (!user) return
    void setDoc(doc(db, 'users', user.uid), { lastAccess: new Date().toISOString() }, { merge: true })
  }, [user])

  return (
    <Page className="max-w-[1080px]">
      <BackBar to="/home" label="Volver a inicio" />

      <div className="profile-hero relative mb-6 overflow-hidden rounded-[28px] p-5 text-white sm:p-7">
        <span className="profile-orb profile-orb-a" />
        <span className="profile-orb profile-orb-b" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="profile-avatar-ring mx-auto overflow-hidden rounded-full border-4 border-white/40 shadow-xl sm:mx-0">
            <UserAvatar profile={profile} size={92} />
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Perfil FluidLearn</p>
            <h1 className="mt-1 text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
              {profile?.fullName || 'Estudiante'}
            </h1>
            <p className="mt-1 truncate text-sm text-white/80">{user?.email || profile?.email}</p>
            <button
              type="button"
              onClick={() => nav('/profile')}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1A6FE8] shadow-lg transition hover:scale-105"
            >
              <Pencil size={14} /> Editar perfil
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Card title="Detalles de usuario" delay={40} icon={<Mail size={16} />}>
            <Row label="Dirección de correo" value={user?.email || profile?.email || '—'} />
            <p className="mb-2 text-[11px] text-[#8C99AD]">
              {profile?.visibility === 'hidden' ? 'Oculto para otros participantes' : 'Visible para otros participantes del curso'}
            </p>
            <Row label="País" value={profile?.country || 'Colombia'} icon={<Globe size={12} />} />
            <Row label="Ciudad/Pueblo" value={profile?.city || '—'} icon={<MapPin size={12} />} />
            <Row label="Zona horaria" value={profile?.timezone || 'America/Bogota'} icon={<Clock3 size={12} />} />
            <Row label="Descripción" value={profile?.bio?.trim() || t.defaultBio} />
          </Card>
          <Card title="Privacidad y Políticas" delay={90} icon={<Shield size={16} />}>
            <p className="text-sm leading-relaxed text-[#5B6B82]">
              Resumen de retención de datos: tu progreso y perfil se guardan en Firebase (proyecto FluidLearn).
            </p>
          </Card>
          <Card title="Detalles del curso" delay={140} icon={<Sparkles size={16} />}>
            <p className="mb-3 text-xs font-semibold uppercase text-[#8C99AD]">Perfiles de curso</p>
            <ul className="space-y-2">
              {keys.map((k) => {
                const Icon = skillIcon[k]
                return (
                  <li key={k}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-[#243044]"
                      onClick={() => nav(`/skill/${k}`)}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: `${SKILL_META[k].accent}22`, color: SKILL_META[k].accent }}>
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#1A6FE8]">{SKILL_META[k].title}</span>
                        <span className="block text-xs text-[#7A8699]">{SKILL_META[k].subtitle}</span>
                      </span>
                      <ChevronRight size={16} className="text-[#C5CDDA]" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="Miscelánea" delay={80} icon={<CalendarDays size={16} />}>
            <LinkRow label="Calendario" onClick={() => nav('/calendar')} />
            <LinkRow label="Calificaciones" onClick={() => nav('/progress')} />
            <LinkRow label="Notificaciones" onClick={() => nav('/notifications')} />
            <LinkRow label="Idioma de la app" onClick={() => nav('/language')} icon={<Languages size={14} />} />
          </Card>
          <Card title="Informes" delay={130} icon={<BookOpen size={16} />}>
            <LinkRow label="Progreso de aprendizaje" onClick={() => nav('/progress')} />
            <LinkRow label="Resumen de calificaciones" onClick={() => nav('/progress')} />
          </Card>
          <Card title="Actividad de accesos" delay={180} icon={<Clock3 size={16} />}>
            <Row label="Primer acceso al sitio" value={formatWhen(profile?.createdAt)} />
            <Row label="Último acceso al sitio" value={`${formatWhen(profile?.lastAccess)} (${lastAccessLabel(profile?.lastAccess)})`} />
          </Card>
          <Card title="App para dispositivos móviles" delay={220} icon={<Sparkles size={16} />}>
            <p className="mb-3 text-sm text-[#5B6B82]">Código QR para el acceso desde la app FluidLearn.</p>
            <div className="inline-block rounded-2xl bg-white p-3 shadow-md">
              <img src={qr} alt="QR FluidLearn" className="h-40 w-40" />
            </div>
            <p className="mt-2 text-xs text-[#8C99AD]">Escanea el código o entra a Inicio en tu dispositivo.</p>
          </Card>
        </div>
      </div>
    </Page>
  )
}

function Card({ title, children, delay = 0, icon }: { title: string; children: ReactNode; delay?: number; icon?: ReactNode }) {
  return (
    <section
      className="fl-rise profile-card rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_12px_32px_rgba(22,42,78,0.08)] backdrop-blur dark:border-[#2A3650] dark:bg-[#1A2438]/90"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#1A6FE8]">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#EEF4FF] text-[#1A6FE8] dark:bg-[#243044]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="mb-3">
      <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[#8C99AD]">
        {icon}
        {label}
      </p>
      <p className="text-sm font-medium text-[#1D2A44] dark:text-[#E8EEF8]">{value}</p>
    </div>
  )
}

function LinkRow({ label, onClick, icon }: { label: string; onClick: () => void; icon?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-1.5 flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-semibold text-[#1A6FE8] transition hover:bg-[#EEF4FF] dark:hover:bg-[#243044]"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ChevronRight size={16} className="text-[#C5CDDA]" />
    </button>
  )
}

function formatWhen(iso?: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
