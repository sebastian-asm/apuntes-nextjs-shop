'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function getOrderById(id: string) {
  try {
    const session = await auth()
    if (!session) throw new Error('Error en sesión del usuario')

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`La orden ${id} no existe`)
    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) throw new Error(`La orden ${id} no corresponde al usuario`)
    }

    return order
  } catch (error) {
    console.error(error)
    return null
  }
}
