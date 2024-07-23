import prisma from '@/lib/prisma'

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      include: { ProductImage: true },
      where: { slug }
    })

    if (!product) return null

    return {
      ...product,
      images: product.ProductImage.map(({ url }) => url)
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener el producto por slug')
  }
}
