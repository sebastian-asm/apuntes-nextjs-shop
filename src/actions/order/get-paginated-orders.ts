'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function getPaginatedOrders() {
  try {
    const session = await auth()
    if (session?.user.role !== 'admin') throw new Error('El usuario no es administrador')

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return orders
  } catch (error) {
    console.error(error)
    return null
  }
}
