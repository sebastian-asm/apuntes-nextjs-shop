'use client'
// import { useActionState } from 'react'
import { useFormState } from 'react-dom'

import { authenticate } from '@/actions'

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" id="email" name="email" />
      <label htmlFor="password">Contraseña</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" id="password" name="password" />
      <button type="submit" className="btn-primary">
        Ingresar
      </button>
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  )
}
