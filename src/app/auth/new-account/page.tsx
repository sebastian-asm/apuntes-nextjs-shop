import Link from 'next/link'

import { titleFont } from '@/config/fonts'
import RegisterForm from './ui/RegisterForm'

export default function NewAccountPage() {
  return (
    <section className="flex flex-col min-h-screen pt-32 sm:pt-40">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
      <RegisterForm />
      <Link href="/auth/login" className="btn-secondary text-center">
        Iniciar sessión
      </Link>
    </section>
  )
}
