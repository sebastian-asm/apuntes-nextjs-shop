'use server'
import prisma from '@/lib/prisma'

export async function deleteUserAddress(userId: string) {
  try {
    await prisma.userAddress.delete({ where: { userId } })
  } catch (error) {
    console.error(error)
    throw error
  }
}
