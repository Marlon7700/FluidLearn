import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FluidLearnLoadingOverlay } from './FluidLearnLoadingOverlay'

const TAB_LOAD_MS = 650

/** Muestra la animación al cambiar de ruta (pestañas legales, login, registro, etc.). */
export function RouteLoadingOverlay() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const skipFirst = useRef(true)
  const prevPath = useRef(pathname)

  useEffect(() => {
    const prev = prevPath.current
    prevPath.current = pathname
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    // Entre políticas el encabezado es el mismo: no overlay (evita el salto)
    if (prev.startsWith('/legal') && pathname.startsWith('/legal')) return
    setShow(true)
    const t = window.setTimeout(() => setShow(false), TAB_LOAD_MS)
    return () => window.clearTimeout(t)
  }, [pathname])

  return <FluidLearnLoadingOverlay show={show} />
}

export function useTabLoading(durationMs = TAB_LOAD_MS) {
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<number | null>(null)

  function startLoading() {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setLoading(true)
    timerRef.current = window.setTimeout(() => {
      setLoading(false)
      timerRef.current = null
    }, durationMs)
  }

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    [],
  )

  return { loading, startLoading }
}
