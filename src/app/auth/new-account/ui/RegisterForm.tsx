'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import clsx from 'clsx'

import { login, registerUser } from '@/actions'
import { useState } from 'react'

type Inputs = {
  name: string
  email: string
  password: string
}

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage('')
    const { name, email, password } = data
    const response = await registerUser(name, email, password)
    if (!response.user) return setErrorMessage(response.message)
    await login(email, password)
    window.location.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Nombre</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', { 'border-red-500': errors.name })}
        type="text"
        id="name"
        {...register('name', { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', { 'border-red-500': errors.email })}
        type="email"
        id="email"
        {...register('email', {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', { 'border-red-500': errors.password })}
        type="password"
        id="password"
        {...register('password', { required: true, minLength: 6 })}
      />
      {errorMessage && <p className="mb-5 text-red-500 text-sm">{errorMessage}</p>}
      <button className="btn-primary">Crear</button>
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
    </form>
  )
}
