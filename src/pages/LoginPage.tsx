import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
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
} from '../lib/cryptoStorage'

export function LoginPage() {
  const { signIn, google, requestAdminEmailCode, user, loading } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [delivery, setDelivery] = useState<AdminDelivery>('personal')
  const [codeSentTo, setCodeSentTo] = useState('')
  const [adminMode, setAdminMode] = useState(false)
  const [remember, setRemember] = useState(false)
  const [hide, setHide] = useState(true)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)

  useEffect(() => {
    void loadEncryptedCredentials().then((saved) => {
      if (!saved) return
      setEmail(saved.email)
      setPassword(saved.password)
      setRemember(true)
    })
  }, [])

  if (!loading && user) return <Navigate to="/home" replace />

  async function onSendCode() {
    setError('')
    setInfo('')
    if (!email.trim() || !password) {
      setError('Escribe correo y contraseña antes de enviar el código.')
      return
    }
    setSendingCode(true)
    try {
      const { to } = await requestAdminEmailCode(email.trim(), password, delivery)
      setCodeSentTo(to)
      setInfo(`Código enviado a ${to}. Revisa bandeja de entrada y spam.`)
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
      await signIn(email.trim(), password, {
        adminMode,
        emailVerificationCode: adminMode ? verificationCode : undefined,
      })
      if (remember) {
        await saveEncryptedCredentials(email.trim(), password)
      } else {
        clearEncryptedCredentials()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setBusy(false)
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
            }}
          >
            <GraduationCap size={18} className={!adminMode ? 'animate-bounce-soft' : ''} />
            Estudiante
          </button>
          <button
            type="button"
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition ${adminMode ? 'bg-[#1967D2] text-white' : 'bg-white text-[#1967D2]'}`}
            onClick={() => setAdminMode(true)}
          >
            <Shield size={18} className={adminMode ? 'animate-bounce-soft' : ''} />
            Administración
          </button>
        </div>
        {adminMode && (
          <p className="mb-4 text-center text-xs leading-snug text-[#5F6368]">
            Elige correo personal o institucional, envía el código y escríbelo para entrar.
          </p>
        )}

        <FieldWithIcon icon={<Mail size={18} />}>
          <input
            className={iconField}
            placeholder="correo@usb.ve"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
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
            autoComplete="current-password"
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
              disabled={sendingCode || busy}
              onClick={() => void onSendCode()}
              className="mb-3 inline-flex items-center justify-center gap-2 rounded-xl border border-[#1967D2] py-3 text-sm font-semibold text-[#1967D2] disabled:opacity-60"
            >
              <Send size={16} />
              {sendingCode ? 'Enviando…' : 'Enviar código al correo'}
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
                required
                minLength={4}
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

        {!adminMode && (
          <>
            <div className="my-6 flex items-center gap-4 text-sm text-slate-500">
              <span className="h-px flex-1 bg-slate-200" /> o <span className="h-px flex-1 bg-slate-200" />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => void google().catch(() => setError('Inicio de sesión cancelado.'))}
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
