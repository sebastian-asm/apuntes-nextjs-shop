'use server'
import { Category } from '@/interfaces'
import prisma from '@/lib/prisma'

export async function getProductsCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({ orderBy: { name: 'desc' } })
  if (!categories) return []
  return categories
}
