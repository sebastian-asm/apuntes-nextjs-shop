'use server'
import prisma from '@/lib/prisma'

export async function setTransactionId(orderId: string, transactionId: string): Promise<boolean> {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })
    if (!order) throw new Error('La orden de compra no existe')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
