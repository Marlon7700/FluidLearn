import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Building2, Lock, Mail, UserRound } from 'lucide-react'
import { AuthCard } from '../components/AppFrame'
import { AuthAnimatedDecorations } from '../components/AuthAnimatedDecorations'
import { FieldWithIcon, iconField } from '../components/FieldWithIcon'
import { GoogleIcon } from '../components/GoogleIcon'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import type { AdminDelivery } from '../lib/adminProfile'

export function RegisterAdminPage() {
  const { signUpAdmin, registerAdminWithGoogle, user, loading, isAdmin, adminOtpPending } = useAuth()
  const nav = useNavigate()
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [preferredDelivery, setPreferredDelivery] = useState<AdminDelivery>('personal')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && user && isAdmin && !adminOtpPending) {
    return <Navigate to="/home" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const result = await signUpAdmin({
        password,
        fullName,
        contactEmail,
        preferredDelivery,
      })
      const info = result.needsLogin
        ? 'Tu cuenta ya existe. Entra, pulsa Enviar código y escribe el que llega a tu correo.'
        : result.needsInboxConfirm
          ? `Te enviamos un enlace a ${result.emailedTo}. Ábrelo para activar el envío y luego pulsa Enviar código otra vez.`
          : `Código enviado a ${result.emailedTo}. Revisa bandeja y spam.`
      nav('/login', {
        replace: true,
        state: { adminMode: true, email: contactEmail.trim().toLowerCase(), info },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setBusy(false)
    }
  }

  async function onGoogle() {
    setBusy(true)
    setError('')
    try {
      await registerAdminWithGoogle(preferredDelivery)
      nav('/home', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar con Google.')
    } finally {
      setBusy(false)
    }
  }

  const emailPlaceholder =
    preferredDelivery === 'personal'
      ? 'Correo personal (Gmail, Outlook…)'
      : 'Correo institucional (universidad)'

  return (
    <AuthCard
      className="login-auth-background admin-auth-background"
      cardClassName="login-auth-card"
      decorations={<AuthAnimatedDecorations admin />}
    >
      <form onSubmit={(e) => void onSubmit(e)}>
        <div className="mb-6 flex flex-col items-center">
          <Logo size={64} />
          <h1 className="mt-4 text-center text-2xl font-bold text-[#1967D2]">Registrar administrador</h1>
          <p className="mt-2 text-center text-xs text-[#5F6368]">
            Puedes crear la cuenta con Google o con correo y contraseña. El código, si lo usas, se guarda hasheado.
          </p>
        </div>

        <p className="mb-2 text-xs font-medium text-[#5F6368]">¿Dónde quieres recibir avisos y códigos?</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={`rounded-xl border py-2.5 text-sm font-medium ${
              preferredDelivery === 'personal'
                ? 'border-[#1967D2] bg-[#1967D2] text-white'
                : 'border-slate-200 text-[#1967D2]'
            }`}
            onClick={() => setPreferredDelivery('personal')}
          >
            Personal
          </button>
          <button
            type="button"
            className={`rounded-xl border py-2.5 text-sm font-medium ${
              preferredDelivery === 'institutional'
                ? 'border-[#1967D2] bg-[#1967D2] text-white'
                : 'border-slate-200 text-[#1967D2]'
            }`}
            onClick={() => setPreferredDelivery('institutional')}
          >
            Institucional
          </button>
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => void onGoogle()}
          className="mb-5 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#1967D2] py-4 font-medium text-[#1967D2] disabled:opacity-60"
        >
          <GoogleIcon size={22} />
          {busy ? 'Conectando con Google…' : 'Registrarme con Google'}
        </button>

        <div className="mb-5 flex items-center gap-4 text-sm text-slate-500">
          <span className="h-px flex-1 bg-slate-200" /> o con correo <span className="h-px flex-1 bg-slate-200" />
        </div>

        <FieldWithIcon className="mb-4" icon={<UserRound size={18} />}>
          <input
            className={iconField}
            placeholder="Nombre"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </FieldWithIcon>

        <FieldWithIcon
          className="mb-4"
          icon={preferredDelivery === 'personal' ? <Mail size={18} /> : <Building2 size={18} />}
        >
          <input
            className={iconField}
            type="email"
            placeholder={emailPlaceholder}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </FieldWithIcon>

        <FieldWithIcon className="mb-4" icon={<Lock size={18} />}>
          <input
            className={iconField}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </FieldWithIcon>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#1967D2] py-4 text-white">
          {busy ? 'Enviando código cifrado…' : 'Guardar y enviar código al correo'}
        </button>
        <Link to="/login" className="mt-6 block text-center font-bold text-[#1967D2]">
          Ir al login
        </Link>
      </form>
    </AuthCard>
  )
}
