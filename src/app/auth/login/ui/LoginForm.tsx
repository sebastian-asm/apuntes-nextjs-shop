'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { IoWarningOutline } from 'react-icons/io5'

import { authenticate } from '@/actions'
import { useEffect } from 'react'

const LoginButton = () => {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? 'Ingresando...' : 'Ingresar'}
    </button>
  )
}

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'Success') window.location.replace('/')
  }, [state])

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" id="email" name="email" />
      <label htmlFor="password">Contraseña</label>
      <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" id="password" name="password" />
      {state === 'CredentialsSignin' && (
        <div className="flex items-center mb-5 text-red-500">
          <IoWarningOutline className="h-5 w-5" />
          <p className="text-sm ml-1.5">Credenciales inválidas</p>
        </div>
      )}
      <LoginButton />
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  )
}
