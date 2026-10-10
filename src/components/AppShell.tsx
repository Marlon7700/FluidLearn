import { Bell, Home, Menu, UserRound } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserProfile } from '../types'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { UserAvatar } from './CharacterAvatar'

export function AppShell() {
  const { profile, signOut, addTeacherNotice } = useAuth()
  const [drawer, setDrawer] = useState(false)
  const [notes, setNotes] = useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  const home = loc.pathname === '/home'
  const me = loc.pathname === '/me'
  const showNav = home || me
  const unread = profile?.feedItems?.length ?? 0

  return (
    <div className="relative min-h-svh">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[240px] flex-col border-r border-[#E4EBF5] bg-white/90 px-5 py-7 backdrop-blur transition-colors duration-500 dark:border-[#2A3650] dark:bg-[#1A2438]/95 lg:flex">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <p className="text-xl font-extrabold text-[#1967D2]">FluidLearn</p>
        </div>
        <nav className="mt-10 space-y-1.5">
          <SideLink
            selected={home}
            label="Inicio"
            icon={<Home size={20} />}
            onClick={() => navigate('/home')}
          />
          <SideLink
            selected={me}
            label="Yo"
            icon={<UserRound size={20} />}
            onClick={() => navigate('/me')}
          />
        </nav>
        <div className="mt-auto">
          <button
            type="button"
            className="w-full rounded-2xl px-3 py-3 text-left text-sm font-semibold text-[#CC3B5A] hover:bg-rose-50 dark:hover:bg-rose-950/40"
            onClick={() => void signOut()}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className={`${showNav ? 'pb-28 lg:pb-8' : ''} lg:pl-[240px]`}>
        <Outlet context={{ openMenu: () => setDrawer(true), openNotes: () => setNotes(true) }} />
      </div>

      {showNav && (
        <nav
          className="fixed inset-x-0 bottom-[14px] z-30 flex justify-center lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex h-[68px] w-[188px] items-center justify-evenly rounded-3xl bg-white/95 shadow-[0_10px_30px_rgba(22,42,78,0.12)] dark:bg-[#1A2438]">
            <NavItem selected={home} label="Home" onClick={() => navigate('/home')} icon={<Home size={20} />} />
            <NavItem selected={me} label="Yo" onClick={() => navigate('/me')} icon={<UserRound size={20} />} />
          </div>
        </nav>
      )}

      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setDrawer(false)} />
          <div className="absolute left-0 top-0 h-full w-[78%] max-w-[300px] bg-[#F8FAFF] shadow-xl dark:bg-[#1A2438]">
            <div className="bg-[#E8EEF8] px-5 pb-5 pt-10 dark:bg-[#243044]">
              <Logo size={40} />
              <p className="mt-2 text-[22px] font-extrabold text-[#1967D2]">FluidLearn</p>
            </div>
            <button className="flex w-full items-center gap-3 px-5 py-3 text-left text-[#1967D2]" onClick={() => { setDrawer(false); navigate('/me') }}>
              <UserRound size={20} /> Perfil
            </button>
            <button className="flex w-full items-center gap-3 px-5 py-3 text-left text-[#1967D2]" onClick={() => { setDrawer(false); void addTeacherNotice() }}>
              <Bell size={20} /> Demo: aviso del profesor
            </button>
            <hr className="my-2 border-slate-200 dark:border-[#2A3650]" />
            <button className="flex w-full items-center gap-3 px-5 py-3 text-left text-[#CC3B5A]" onClick={() => { setDrawer(false); void signOut() }}>
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {notes && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 lg:items-center lg:p-8">
          <div className="max-h-[80%] w-full overflow-y-auto rounded-t-3xl bg-[#F8FAFC] p-5 dark:bg-[#1A2438] lg:max-w-lg lg:rounded-3xl">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 lg:hidden" />
            <h2 className="mb-3 text-xl font-extrabold text-[#1967D2]">Notificaciones</h2>
            {unread === 0 ? (
              <p className="px-4 py-10 text-center text-[15px] text-[#7A879A]">
                Aún no hay notificaciones. Completa una actividad o espera material de tu profesor.
              </p>
            ) : (
              <ul className="space-y-2 pb-6">
                {profile!.feedItems.map((n, i) => (
                  <li key={`${n.title}-${i}`} className="rounded-xl bg-white p-3">
                    <p className="font-semibold">{n.title}</p>
                    <p className="text-sm text-slate-500">{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" className="mb-4 w-full py-2 text-sm text-slate-500" onClick={() => setNotes(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SideLink({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-[15px] ${
        selected ? 'bg-[#1967D2] font-bold text-white' : 'font-semibold text-[#1967D2] hover:bg-[#EEF4FF] dark:text-[#8BB4FF] dark:hover:bg-[#243044]'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function NavItem({
  selected,
  label,
  icon,
  onClick,
}: {
  selected: boolean
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center">
      <span className={`grid h-9 w-9 place-items-center rounded-full ${selected ? 'bg-[#1967D2] text-white' : 'text-[#8C99AD]'}`}>
        {icon}
      </span>
      <span className={`text-[13px] ${selected ? 'font-bold text-[#1967D2]' : 'font-medium text-[#1967D2]/70'}`}>{label}</span>
    </button>
  )
}

export function TopIcon({
  children,
  onClick,
  className = '',
  badge,
}: {
  children: ReactNode
  onClick: () => void
  className?: string
  badge?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#717F95] shadow-[0_4px_12px_rgba(22,42,78,0.08)] hover:bg-[#E8EEF9] dark:bg-[#243044] dark:text-[#E8EEF8] dark:hover:bg-[#2C3B55] ${className}`}
    >
      {children}
      {badge && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E24B4B]" />}
    </button>
  )
}

export function HeaderBar({
  onMenu,
  onNotes,
  onAvatar,
  profile,
  unread,
}: {
  onMenu: () => void
  onNotes: () => void
  onAvatar: () => void
  profile?: UserProfile | null
  unread?: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={onAvatar}
        className="grid h-10 w-10 overflow-hidden place-items-center rounded-full bg-white shadow-[0_4px_10px_rgba(11,61,145,0.1)] lg:hidden"
      >
        <UserAvatar profile={profile} size={40} />
      </button>
      <div className="flex items-center gap-2.5 lg:hidden">
        <Logo size={34} />
        <p className="text-[22px] font-bold text-[#1967D2] dark:text-[#8BB4FF]">FluidLearn</p>
      </div>
      <p className="hidden text-[22px] font-bold text-[#1967D2] dark:text-[#8BB4FF] lg:block">Inicio</p>
      <div className="ml-auto flex gap-2.5">
        <ThemeToggle />
        <TopIcon onClick={onNotes} badge={unread}>
          <Bell size={20} />
        </TopIcon>
        <TopIcon onClick={onMenu} className="lg:hidden">
          <Menu size={20} />
        </TopIcon>
      </div>
    </div>
  )
}
