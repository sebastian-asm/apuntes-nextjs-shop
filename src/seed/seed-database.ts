import { countries } from './seed-countries'
import { initialData } from './seed'
import prisma from '../lib/prisma'

async function main() {
  try {
    // Limpiar db
    await prisma.orderAddress.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
    await prisma.country.deleteMany()
    await prisma.userAddress.deleteMany()

    // Construyendo datos para la db
    const { categories, products, users } = initialData
    await prisma.user.createMany({ data: users })
    const categoriesData = categories.map((category) => ({ name: category }))
    await prisma.category.createMany({ data: categoriesData })
    await prisma.country.createMany({ data: countries })

    const categoriesDB = await prisma.category.findMany()
    const categoriesMap = categoriesDB.reduce((map, category) => {
      map[category.name.toLowerCase()] = category.id
      return map
    }, {} as Record<string, string>)

    products.forEach(async (product) => {
      const { type, images, ...rest } = product
      const productDb = await prisma.product.create({ data: { ...rest, categoryId: categoriesMap[type] } })
      const imagesData = images.map((image) => ({ url: image, productId: productDb.id }))
      await prisma.productImage.createMany({ data: imagesData })
    })

    console.log('✅ Seed ejecutado correctamente')
  } catch (error) {
    console.log('❌ Error al ejecutar el seed', error)
  }
}

main()
