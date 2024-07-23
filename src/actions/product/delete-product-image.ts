'use server'
import { v2 as cloudinary } from 'cloudinary'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: 'dzu2kemtg',
  api_key: process.env.CLOUDINARY_URL_KEY,
  api_secret: process.env.CLOUDINARY_URL_SECRET
})

export async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith('http')) return
  // https://res.cloudinary.com/dzu2kemtg/image/upload/v1721775102/gihpjnaf1tdfselyj62w.avif
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(imageName)
    const deleteImage = await prisma.productImage.delete({
      where: { id: imageId },
      select: { product: { select: { slug: true } } }
    })

    revalidatePath(`/admin/products/${deleteImage.product.slug}`)
    revalidatePath(`/admin/products`)
    revalidatePath(`/product/${deleteImage.product.slug}`)
  } catch (error) {
    console.error(error)
  }
}
