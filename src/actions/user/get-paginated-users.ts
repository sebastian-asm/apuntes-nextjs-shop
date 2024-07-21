'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function getPaginatedUsers() {
  try {
    const session = await auth()
    if (session?.user.role !== 'admin') throw new Error('La sesión no es de un administrador')
    const users = await prisma.user.findMany({ orderBy: { name: 'desc' } })
    return users
  } catch (error) {
    console.error(error)
    return null
  }
}
