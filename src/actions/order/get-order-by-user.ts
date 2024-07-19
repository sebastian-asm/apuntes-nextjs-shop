'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function getOrderByUser() {
  try {
    const session = await auth()
    if (!session) throw new Error('Error en sesión del usuario')
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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
