import { ChevronRight, LogOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserAvatar } from './CharacterAvatar'

export function ProfileMenu() {
  const { profile, signOut } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function go(path: string) {
    setOpen(false)
    nav(path)
  }

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full bg-white p-0.5 shadow-[0_4px_12px_rgba(22,42,78,0.08)] dark:bg-[#243044]"
        aria-label="Menú de perfil"
      >
        <UserAvatar profile={profile} size={36} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[240px] overflow-hidden rounded-xl border border-[#E4EBF5] bg-white py-1 shadow-[0_16px_40px_rgba(22,42,78,0.16)] dark:border-[#2A3650] dark:bg-[#1A2438]">
          <p className="bg-[#D7E4F5] px-3 py-2 text-[13px] font-semibold text-[#1D2A44]">Accesibilidad</p>
          <MenuItem label="Perfil" onClick={() => go('/me')} />
          <MenuItem label="Calificaciones" onClick={() => go('/progress')} />
          <MenuItem label="Calendario" onClick={() => go('/calendar')} />
          <MenuItem label="Datos personales" onClick={() => go('/profile')} />
          <MenuItem label="Informes" onClick={() => go('/progress')} />
          <div className="my-1 border-t border-[#EEF2F7] dark:border-[#2A3650]" />
          <MenuItem label="Preferencias" onClick={() => go('/notifications')} />
          <button
            type="button"
            onClick={() => go('/language')}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-[14px] text-[#1D2A44] hover:bg-[#F4F7FC] dark:text-[#E8EEF8] dark:hover:bg-[#243044]"
          >
            Idioma
            <ChevronRight size={14} className="text-[#8C99AD]" />
          </button>
          <div className="my-1 border-t border-[#EEF2F7] dark:border-[#2A3650]" />
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[14px] font-semibold text-[#CC3B5A] hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full px-3 py-2 text-left text-[14px] text-[#1D2A44] hover:bg-[#F4F7FC] dark:text-[#E8EEF8] dark:hover:bg-[#243044]"
    >
      {label}
    </button>
  )
}
