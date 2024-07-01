import Link from 'next/link'

import { titleFont } from '@/config/fonts'

export default function NewAccountPage() {
  return (
    <section className="flex flex-col min-h-screen pt-32 sm:pt-40">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="text" id="name" />
        <label htmlFor="email">Correo electrónico</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" id="password" />
        <button className="btn-primary">Crear</button>
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <Link href="/auth/login" className="btn-secondary text-center">
          Iniciar sessión
        </Link>
      </div>
    </section>
  )
}
