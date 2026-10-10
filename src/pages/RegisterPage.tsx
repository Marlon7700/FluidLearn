import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IdCard, Lock, Mail, UserRound } from 'lucide-react'
import { AuthCard } from '../components/AppFrame'
import { FieldWithIcon, iconField } from '../components/FieldWithIcon'
import { GoogleIcon } from '../components/GoogleIcon'
import { Logo } from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { digitsOnlyMax12 } from '../lib/studentId'

export function RegisterPage() {
  const { signUp, google } = useAuth()
  const nav = useNavigate()
  const [fullName, setFullName] = useState('')
  const [studentId, setStudentId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    const id = window.setTimeout(() => nav('/login', { replace: true }), 2200)
    return () => window.clearTimeout(id)
  }, [success, nav])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      // signUp solo resuelve si Auth + Firestore users/{uid} quedaron guardados.
      await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        studentId: studentId.trim(),
      })
      // Solo tras Auth + Firestore confirmados (signUp lanza si falla el guardado).
      setSuccess(true)
    } catch (err) {
      console.error('[RegisterPage] registro falló', err)
      setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta.')
    } finally {
      setBusy(false)
    }
  }

  if (success) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center py-6 text-center">
          <span className="thumbs-up text-6xl" aria-hidden>
            👍
          </span>
          <h1 className="mt-5 text-2xl font-extrabold text-[#1967D2]">
            Usuario registrado correctamente
          </h1>
          <p className="mt-2 text-sm text-[#5F6368]">
            Te estamos llevando al inicio de sesión…
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl bg-[#1967D2] px-6 py-3 font-semibold text-white"
            onClick={() => nav('/login', { replace: true })}
          >
            Ir al login
          </button>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <form onSubmit={(e) => void onSubmit(e)}>
        <div className="mb-6 flex flex-col items-center">
          <Logo size={64} />
          <h1 className="mt-4 text-2xl font-bold text-[#1967D2]">Crear cuenta</h1>
          <p className="text-sm text-[#5F6368]">Datos de estudiante USB</p>
        </div>

        <FieldWithIcon className="mb-4" icon={<UserRound size={18} />}>
          <input
            className={iconField}
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </FieldWithIcon>
        <FieldWithIcon className="mb-4" icon={<IdCard size={18} />}>
          <input
            className={iconField}
            placeholder="Código estudiantil (máx. 12 dígitos)"
            value={studentId}
            onChange={(e) => setStudentId(digitsOnlyMax12(e.target.value))}
            inputMode="numeric"
            pattern="\d{1,12}"
            maxLength={12}
            required
          />
        </FieldWithIcon>
        <FieldWithIcon className="mb-4" icon={<Mail size={18} />}>
          <input
            className={iconField}
            placeholder="correo@usb.ve"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FieldWithIcon>
        <FieldWithIcon className="mb-4" icon={<Lock size={18} />}>
          <input
            className={iconField}
            type="password"
            placeholder="Contraseña (mín. 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </FieldWithIcon>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-[#1967D2] py-4 text-white">
          {busy ? 'Creando…' : 'Registrarme'}
        </button>
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#1967D2] py-4 text-[#1967D2]"
          onClick={() => void google()}
        >
          <GoogleIcon size={22} />
          Continuar con Google
        </button>
        <Link to="/login" className="mt-6 block text-center font-bold text-[#1967D2]">
          Ya tengo cuenta
        </Link>
      </form>
    </AuthCard>
  )
}
