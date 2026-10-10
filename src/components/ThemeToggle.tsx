import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { dark, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white text-[#717F95] shadow-[0_4px_12px_rgba(22,42,78,0.08)] transition-colors duration-300 hover:bg-[#E8EEF9] dark:bg-[#243044] dark:text-[#F6C344] dark:hover:bg-[#2C3B55] ${className}`}
    >
      <span className={`absolute transition-all duration-500 ${dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0'}`}>
        <Sun size={18} />
      </span>
      <span className={`absolute transition-all duration-500 ${dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}>
        <Moon size={18} />
      </span>
    </button>
  )
}
