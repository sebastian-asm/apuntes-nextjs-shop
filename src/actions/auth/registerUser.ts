'use server'
import { hashSync } from 'bcrypt'

import prisma from '@/lib/prisma'

export async function registerUser(name: string, email: string, password: string) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashSync(password, 10)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return {
      message: 'Usuario creado exitosamente',
      user
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Error al crear el usuario',
      user: null
    }
  }
}
