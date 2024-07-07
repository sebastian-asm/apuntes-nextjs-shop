import Link from 'next/link'

import { titleFont } from '@/config/fonts'
import LoginForm from './ui/LoginForm'

export default function LoginPage() {
  return (
    <section className="flex flex-col min-h-screen pt-32 sm:pt-40">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Iniciar sesión</h1>
      <LoginForm />
      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear nueva cuenta
      </Link>
    </section>
  )
}
