import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(+page) || +page < 1) page = 1
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true }
        }
      }
    })

    const totalCount = await prisma.product.count()
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error al cargar los productos')
  }
}
