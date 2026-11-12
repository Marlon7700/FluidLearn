import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Lock, Mail, RefreshCw, ShieldCheck, UserRound } from 'lucide-react'
import { AuthCard } from '../components/AppFrame'
import { AuthAnimatedDecorations } from '../components/AuthAnimatedDecorations'
import { FieldWithIcon, iconField } from '../components/FieldWithIcon'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { generateSecureAdminCode, type AdminDelivery } from '../lib/adminProfile'

export function RegisterAdminPage() {
  const { signUpAdmin } = useAuth()
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [preferredDelivery, setPreferredDelivery] = useState<AdminDelivery>('personal')
  const [generatedCode, setGeneratedCode] = useState(() => generateSecureAdminCode(10))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [doneMsg, setDoneMsg] = useState('')
  const [extraHint, setExtraHint] = useState('')

  function refreshCode() {
    setGeneratedCode(generateSecureAdminCode(10))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setDoneMsg('')
    setExtraHint('')
    try {
      const result = await signUpAdmin({
        password,
        fullName,
        contactEmail,
        preferredDelivery,
        generatedCode,
      })
      setDoneMsg(
        `Cuenta guardada. Revisá tu bandeja (y spam) en ${result.emailedTo}: ahí está el código para entrar como administrador.`,
      )
      if (result.needsInboxConfirm || result.channel === 'formsubmit') {
        setExtraHint(
          'Si es la primera vez que usas ese correo, FormSubmit te manda un enlace de activación: ábrelo y vuelve a pulsar «Enviar código» en el login.',
        )
      }
      if (result.channel === 'dev-console') {
        setExtraHint(
          `Modo desarrollo: el correo no salió por un proveedor. Tu código es ${generatedCode} (también en la consola F12).`,
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
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
            Guardamos tus datos y enviamos el código a tu correo para el login de administración.
          </p>
        </div>

        <p className="mb-2 text-xs font-medium text-[#5F6368]">¿Dónde quieres recibir el código?</p>
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

        <FieldWithIcon className="mb-2" icon={<ShieldCheck size={18} />}>
          <input
            className={`${iconField} pr-12 font-mono tracking-wider`}
            value={generatedCode}
            readOnly
            aria-label="Código seguro generado"
          />
          <button
            type="button"
            title="Generar otro código"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-[#1967D2]"
            onClick={refreshCode}
          >
            <RefreshCw size={18} />
          </button>
        </FieldWithIcon>
        <p className="mb-4 text-center text-[11px] text-[#5F6368]">
          Este código se guarda y se envía a tu correo al crear la cuenta.
        </p>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        {doneMsg && <p className="mb-2 text-sm text-emerald-600">{doneMsg}</p>}
        {extraHint && <p className="mb-3 text-xs text-amber-700">{extraHint}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#1967D2] py-4 text-white">
          {busy ? 'Guardando y enviando correo…' : 'Crear admin y enviar código al correo'}
        </button>
        <Link to="/login" className="mt-6 block text-center font-bold text-[#1967D2]">
          Ir al login
        </Link>
      </form>
    </AuthCard>
  )
}
