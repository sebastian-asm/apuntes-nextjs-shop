'use server'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function changeUserRole(id: string, role: 'admin' | 'user') {
  try {
    const session = await auth()
    if (session?.user.role !== 'admin') throw new Error('Debe iniciar sesión como administrador')
    const user = await prisma.user.update({ where: { id }, data: { role } })
    revalidatePath('/admin/users')
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
