import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'fluidlearn-theme'

interface ThemeCtx {
  theme: Theme
  dark: boolean
  toggle: () => void
  setTheme: (t: Theme) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

function readTheme(): Theme {
  try {
    return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(KEY, theme)
  }, [theme])

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      dark: theme === 'dark',
      toggle: () => {
        const next = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
        const doc = document as Document & {
          startViewTransition?: (cb: () => void) => void
        }
        if (typeof doc.startViewTransition === 'function') {
          doc.startViewTransition(next)
        } else {
          next()
        }
      },
      setTheme: setThemeState,
    }),
    [theme],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
