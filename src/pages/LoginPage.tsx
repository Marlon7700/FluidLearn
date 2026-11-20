import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap, KeyRound, Lock, Mail, Send, Shield } from 'lucide-react'
import { AuthCard } from '../components/AppFrame'
import { AuthAnimatedDecorations } from '../components/AuthAnimatedDecorations'
import { FieldWithIcon, iconField } from '../components/FieldWithIcon'
import { GoogleIcon } from '../components/GoogleIcon'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import type { AdminDelivery } from '../lib/adminProfile'
import {
  clearEncryptedCredentials,
  loadEncryptedCredentials,
  saveEncryptedCredentials,
  type LoginSlot,
} from '../lib/cryptoStorage'
import { isAllowlistedAdminEmail } from '../lib/adminEmails'

type LoginNavState = { adminMode?: boolean; email?: string; info?: string }

export function LoginPage() {
  const { signIn, google, requestAdminEmailCode, resetPassword, user, loading, adminOtpPending } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const incoming = (location.state as LoginNavState | null) ?? null
  const [email, setEmail] = useState(incoming?.email ?? '')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [delivery, setDelivery] = useState<AdminDelivery>('personal')
  const [codeSentTo, setCodeSentTo] = useState('')
  const [adminMode, setAdminMode] = useState(Boolean(incoming?.adminMode))
  const [remember, setRemember] = useState(false)
  const [hide, setHide] = useState(true)
  const [error, setError] = useState('')
  const [info, setInfo] = useState(incoming?.info ?? '')
  const [busy, setBusy] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [sendWait, setSendWait] = useState(0)

  function applySlotFields(saved: { email: string; password: string } | null, incomingEmail?: string) {
    if (incomingEmail) {
      setEmail(incomingEmail)
      setPassword('')
      setRemember(false)
      return
    }
    if (!saved) {
      setEmail('')
      setPassword('')
      setRemember(false)
      return
    }
    setEmail(saved.email)
    setPassword(saved.password)
    setRemember(true)
  }

  useEffect(() => {
    const slot: LoginSlot = adminMode ? 'admin' : 'student'
    void loadEncryptedCredentials(slot).then((saved) => {
      applySlotFields(saved, incoming?.email)
    })
    // Solo al montar: el cambio Estudiante/Admin limpia y carga su propio vault.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (sendWait <= 0) return
    const t = window.setTimeout(() => setSendWait((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [sendWait])

  if (!loading && user && !adminOtpPending) return <Navigate to="/home" replace />

  async function onSendCode() {
    setError('')
    setInfo('')
    if (sendWait > 0) return
    if (!email.trim() || !password) {
      setError('Escribe correo y contraseña antes de enviar el código.')
      return
    }
    setSendingCode(true)
    try {
      const { to, needsInboxConfirm, throttled } = await requestAdminEmailCode(
        email.trim(),
        password,
        delivery,
      )
      setCodeSentTo(to)
      setSendWait(25)
      if (throttled) {
        setInfo(
          `Firebase limitó el login, pero el código se envió a ${to}. Revisa bandeja y spam. Espera 15–30 min y pulsa Entrar (no Enviar código otra vez).`,
        )
      } else if (needsInboxConfirm) {
        setInfo(
          `Abre el correo de ${to} y confirma el enlace de FormSubmit. Luego espera un minuto y pulsa Enviar código otra vez.`,
        )
      } else {
        setInfo(
          `Código enviado a ${to} (${delivery === 'personal' ? 'personal' : 'institucional'}). Revisa bandeja y spam.`,
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el código.')
    } finally {
      setSendingCode(false)
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const slot: LoginSlot = adminMode ? 'admin' : 'student'
      if (!adminMode && isAllowlistedAdminEmail(email)) {
        throw new Error('Esa cuenta es de administración. Entra en la pestaña Administración.')
      }
      await signIn(email.trim(), password, {
        adminMode,
        emailVerificationCode: adminMode ? verificationCode : undefined,
      })
      if (remember) {
        await saveEncryptedCredentials(slot, email.trim(), password)
      } else {
        clearEncryptedCredentials(slot)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setBusy(false)
    }
  }

  async function onGoogleAdmin() {
    setBusy(true)
    setError('')
    try {
      await google({ adminMode: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo entrar con Google.')
    } finally {
      setBusy(false)
    }
  }

  async function onForgotPassword() {
    setError('')
    setInfo('')
    if (!email.trim()) {
      setError('Escribe tu correo y pulsa otra vez Olvidé mi contraseña.')
      return
    }
    try {
      await resetPassword(email.trim())
      setInfo(`Te enviamos un enlace a ${email.trim()} para crear una contraseña nueva. Luego vuelve y entra.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar el restablecimiento.')
    }
  }

  return (
    <AuthCard
      className={adminMode ? 'login-auth-background admin-auth-background' : 'login-auth-background'}
      cardClassName="login-auth-card"
      decorations={
        <AuthAnimatedDecorations admin={adminMode} />
      }
    >
      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
        <div className="mb-6 flex flex-col items-center">
          <Logo size={80} />
          <h1 className="mt-6 text-[26px] font-bold text-[#1967D2]">FluidLearn</h1>
          <p className="mt-2 text-sm text-[#5F6368]">
            {adminMode ? 'Administración — USB' : 'Inicio de sesión — USB'}
          </p>
        </div>

        <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-xl border border-[#1967D2]">
          <button
            type="button"
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition ${!adminMode ? 'bg-[#1967D2] text-white' : 'bg-white text-[#1967D2]'}`}
            onClick={() => {
              setAdminMode(false)
              setCodeSentTo('')
              setInfo('')
              setError('')
              setHide(true)
              void loadEncryptedCredentials('student').then((saved) => applySlotFields(saved))
            }}
          >
            <GraduationCap size={18} className={!adminMode ? 'animate-bounce-soft' : ''} />
            Estudiante
          </button>
          <button
            type="button"
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition ${adminMode ? 'bg-[#1967D2] text-white' : 'bg-white text-[#1967D2]'}`}
            onClick={() => {
              setAdminMode(true)
              setError('')
              setHide(true)
              void loadEncryptedCredentials('admin').then((saved) => applySlotFields(saved))
            }}
          >
            <Shield size={18} className={adminMode ? 'animate-bounce-soft' : ''} />
            Administración
          </button>
        </div>
        {adminMode && (
          <p className="mb-4 text-center text-xs leading-snug text-[#5F6368]">
            Elige Personal, escribe tu Gmail, pulsa Enviar código y entra con el que llega a tu bandeja (nunca se guarda en claro).
          </p>
        )}

        <FieldWithIcon icon={<Mail size={18} />}>
          <input
            className={iconField}
            placeholder={
              adminMode
                ? delivery === 'personal'
                  ? 'Correo personal (Gmail…)'
                  : 'Correo institucional'
                : 'correo@usb.ve'
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={adminMode ? 'admin-email' : 'student-email'}
            autoComplete={adminMode ? 'off' : 'username'}
            autoCapitalize="none"
            spellCheck={false}
            required
          />
        </FieldWithIcon>

        <FieldWithIcon className="mt-4" icon={<Lock size={18} />}>
          <input
            className={`${iconField} pr-12`}
            type={hide ? 'password' : 'text'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={adminMode ? 'admin-password' : 'student-password'}
            autoComplete={adminMode ? 'off' : 'current-password'}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-500"
            onClick={() => setHide((h) => !h)}
          >
            {hide ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </FieldWithIcon>

        {adminMode && (
          <>
            <p className="mb-2 mt-4 text-xs font-medium text-[#5F6368]">
              ¿A qué tipo de correo te registraste?
            </p>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`rounded-xl border py-2 text-sm font-medium ${
                  delivery === 'personal'
                    ? 'border-[#1967D2] bg-[#E8F0FE] text-[#1967D2]'
                    : 'border-slate-200 text-slate-600'
                }`}
                onClick={() => setDelivery('personal')}
              >
                Personal
              </button>
              <button
                type="button"
                className={`rounded-xl border py-2 text-sm font-medium ${
                  delivery === 'institutional'
                    ? 'border-[#1967D2] bg-[#E8F0FE] text-[#1967D2]'
                    : 'border-slate-200 text-slate-600'
                }`}
                onClick={() => setDelivery('institutional')}
              >
                Institucional
              </button>
            </div>
            <button
              type="button"
              disabled={sendingCode || busy || sendWait > 0}
              onClick={() => void onSendCode()}
              className="mb-3 inline-flex items-center justify-center gap-2 rounded-xl border border-[#1967D2] py-3 text-sm font-semibold text-[#1967D2] disabled:opacity-60"
            >
              <Send size={16} />
              {sendingCode
                ? 'Enviando…'
                : sendWait > 0
                  ? `Espera ${sendWait}s`
                  : 'Enviar código al correo'}
            </button>
            {codeSentTo && (
              <p className="mb-2 text-center text-xs text-emerald-700">Destino: {codeSentTo}</p>
            )}
            <FieldWithIcon icon={<KeyRound size={18} />}>
              <input
                className={`${iconField} font-mono tracking-wider`}
                placeholder="Código del correo"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).toUpperCase())
                }
                autoComplete="one-time-code"
                maxLength={12}
              />
            </FieldWithIcon>
          </>
        )}

        <label className="mt-4 flex items-center gap-2 text-sm text-[#5F6368]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1967D2]"
          />
          Recordar correo y contraseña (cifrado)
        </label>

        {info && <p className="mt-3 text-sm text-emerald-700">{info}</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="mt-6 rounded-xl bg-[#1967D2] py-4 text-base text-white disabled:opacity-60">
          {busy ? '…' : 'Entrar'}
        </button>
        {adminMode && (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onForgotPassword()}
              className="mt-3 w-full text-center text-sm font-semibold text-[#1967D2]"
            >
              Olvidé mi contraseña
            </button>
            <div className="my-5 flex items-center gap-4 text-sm text-slate-500">
              <span className="h-px flex-1 bg-slate-200" /> o <span className="h-px flex-1 bg-slate-200" />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => void onGoogleAdmin()}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#1967D2] py-4 font-medium text-[#1967D2]"
            >
              <GoogleIcon size={22} />
              Entrar como admin con Google
            </button>
          </>
        )}

        {!adminMode && (
          <>
            <div className="my-6 flex items-center gap-4 text-sm text-slate-500">
              <span className="h-px flex-1 bg-slate-200" /> o <span className="h-px flex-1 bg-slate-200" />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void google().catch((err) =>
                  setError(err instanceof Error ? err.message : 'No se pudo entrar con Google.'),
                )
              }
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#1967D2] py-4 font-medium text-[#1967D2]"
            >
              <GoogleIcon size={22} />
              Continuar con Google
            </button>
            <p className="mt-6 text-center text-sm">
              ¿No tienes cuenta?{' '}
              <Link className="font-bold text-[#1967D2]" to="/register">
                Registrarse
              </Link>
            </p>
          </>
        )}
        {adminMode && (
          <p className="mt-7 text-center text-sm text-[#5F6368]">
            ¿Primera vez como admin?{' '}
            <button type="button" className="font-bold text-[#1967D2]" onClick={() => nav('/register-admin')}>
              Registrar administrador
            </button>
          </p>
        )}
      </form>
    </AuthCard>
  )
}
