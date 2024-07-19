'use server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import type { Address, ValidSize } from '@/interfaces'

interface ProductToOrder {
  productId: string
  quantity: number
  size: ValidSize
}

export async function placeOrder(productIds: ProductToOrder[], address: Address) {
  const session = await auth()
  const userId = session?.user.id
  if (!userId) return { message: 'La sesión de usuario no existe' }

  const products = await prisma.product.findMany({
    where: { id: { in: productIds.map(({ productId }) => productId) } }
  })

  const itemsInOrder = productIds.reduce((count, { quantity }) => count + quantity, 0)

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((product) => product.id === item.productId)
      if (!product) throw new Error(`El producto ${item.productId} no existe`)
      const subTotal = product.price * productQuantity
      totals.subTotal += subTotal
      totals.tax += subTotal * 0.19
      totals.total += subTotal * 1.19
      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        // acumulación de valores
        const productQuantity = productIds
          .filter(({ productId }) => productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)
        if (productQuantity === 0) throw new Error(`El producto ${product.id} no tiene cantidad definida`)

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)
      // verificando valores negativos en el stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) throw new Error(`El producto "${product.title}" no cuenta con stock suficiente`)
      })

      // crear la orden (encabezado)
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.productId,
                price: products.find(({ id }) => id === product.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      // crear dirección de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2,
          postalCode: address.postalCode,
          city: address.city,
          phone: address.phone,
          countryId: address.country,
          orderId: order.id
        }
      })
      return { order, orderAddress, updatedProducts }
    })
    return { message: 'Orden creada exitosamente', order: prismaTx.order }
  } catch (error: any) {
    console.error(error?.message)
    return { message: error?.message, order: null }
  }
}
