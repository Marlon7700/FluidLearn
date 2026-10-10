import { BarChart3, Bell, Flame, HelpCircle, Languages, LogOut, Moon, RotateCcw, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Page } from '../components/AppFrame'
import { UserAvatar } from '../components/CharacterAvatar'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function MePage() {
  const { profile, user, signOut, resetProgress } = useAuth()
  const { dark, toggle } = useTheme()
  const nav = useNavigate()
  const vals = profile?.skillProgress
  const avg = Math.round(
    (((vals?.listening ?? 0) + (vals?.speaking ?? 0) + (vals?.reading ?? 0) + (vals?.writing ?? 0)) / 4) * 100,
  )
  const lessons = profile?.completedTaskIds.length ?? 0
  const hours = lessons <= 0 ? '0h' : `${(lessons * 0.25).toFixed(lessons % 4 === 0 ? 0 : 1)}h`

  return (
    <Page className="bg-transparent">
      <div className="mx-auto overflow-hidden rounded-full border-4 border-white shadow dark:border-[#2A3650]">
        <UserAvatar profile={profile} size={102} />
      </div>
      <h1 className="mt-3.5 text-center text-[30px] font-extrabold text-[#1967D2]">{profile?.fullName || 'User'}</h1>
      <p className="text-center text-sm font-medium text-[#97A3B5]">{user?.email}</p>
      <p className="mt-1 text-center text-[13px] text-[#667389]">
        {profile?.bio?.trim() || 'Passionate about language learning'}
      </p>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => nav('/profile')}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1967D2] shadow-sm dark:bg-[#243044] dark:text-[#8BB4FF]"
        >
          Personal Data
        </button>
      </div>

      <div className="mt-[18px] flex justify-around rounded-2xl bg-[#E8EEF8] px-2.5 py-3.5 dark:bg-[#1A2438]">
        <Stat icon={<Flame className="text-[#FFB352]" size={18} />} bg="#FFF1DC" value={`${profile?.streakDays ?? 0} days`} label="Streak" />
        <Stat icon={<BarChart3 className="text-[#43C88E]" size={18} />} bg="#E3F8EE" value={`${avg}%`} label="Progress" />
        <Stat icon={<Languages className="text-[#6A95F5]" size={18} />} bg="#E8EEFC" value={hours} label="Lessons" />
      </div>

      <div className="mt-3.5 grid gap-2.5 md:grid-cols-2">
        <Tile icon={<Shield className="text-[#6A95F5]" />} title="Account information" onClick={() => nav('/profile')} />
        <Tile icon={<Moon className="text-[#1967D2]" />} title={dark ? 'Modo claro' : 'Modo oscuro'} onClick={toggle} />
        <Tile icon={<Bell className="text-[#EEA73E]" />} title="Notifications" badge="3" onClick={() => nav('/')} />
        <Tile icon={<BarChart3 className="text-[#43C88E]" />} title="Learning Progress" onClick={() => nav('/')} />
        <Tile icon={<Languages className="text-[#8B74E8]" />} title="App Language" />
        <Tile icon={<HelpCircle className="text-[#4DC6A6]" />} title="Help Center" />
        <Tile icon={<RotateCcw className="text-[#9AA4B8]" />} title="Reset practice progress" onClick={() => void resetProgress()} />
        <Tile icon={<LogOut className="text-[#E25775]" />} title="Sign Out" danger onClick={() => void signOut()} />
      </div>
    </Page>
  )
}

function Stat({ icon, bg, value, label }: { icon: ReactNode; bg: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 grid h-8 w-8 place-items-center rounded-full" style={{ background: bg }}>{icon}</span>
      <p className="text-sm font-bold text-[#1D2A44] dark:text-[#E8EEF8]">{value}</p>
      <p className="text-xs text-[#7A879A]">{label}</p>
    </div>
  )
}

function Tile({
  icon,
  title,
  badge,
  danger,
  onClick,
}: {
  icon: ReactNode
  title: string
  badge?: string
  danger?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-left shadow-sm dark:bg-[#1A2438]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50">{icon}</span>
      <span className={`flex-1 font-semibold ${danger ? 'text-[#CC3B5A]' : 'text-[#1D2A44] dark:text-[#E8EEF8]'}`}>{title}</span>
      {badge && <span className="rounded-full bg-[#1967D2] px-2 text-xs font-bold text-white">{badge}</span>}
    </button>
  )
}
