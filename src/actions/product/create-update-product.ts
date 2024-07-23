'use server'
import { revalidatePath } from 'next/cache'

import { Gender, Product, Size } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'
import { z } from 'zod'

import prisma from '@/lib/prisma'

cloudinary.config({
  cloud_name: 'dzu2kemtg',
  api_key: process.env.CLOUDINARY_URL_KEY,
  api_secret: process.env.CLOUDINARY_URL_SECRET
})

const productSchema = z.object({
  // el id puede no venir o puede venir con null
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((v) => Number(v.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((v) => Number(v.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((v) => v.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export async function createUpdateProduct(formData: FormData) {
  try {
    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)
    if (!productParsed.success) throw new Error(productParsed.error as any)
    productParsed.data.slug = productParsed.data.slug.toLowerCase().replace(/ /g, '-').trim()

    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const { id, ...rest } = productParsed.data
      const tagsArray = rest.tags.split(',').map((tag) => tag.trim().toLowerCase())

      // actualizar
      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: tagsArray
          }
        })
        // crear
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagsArray }
          }
        })
      }

      // proceso de carga y guardado de las imágenes
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])
        if (!images) throw new Error('Error al cargar las imágenes')
        await tx.productImage.createMany({
          data: images.map((image) => ({ url: image, productId: product.id }))
        })
      }

      return product
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${prismaTx.slug}`)
    revalidatePath(`/product/${prismaTx.slug}`)
    return prismaTx
  } catch (error) {
    console.error(error)
    return null
  }
}

async function uploadImages(images: File[]) {
  try {
    const uploadPromises = images.map(async (image) => {
      const buffer = await image.arrayBuffer()
      const base64Image = Buffer.from(buffer).toString('base64')
      return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then((r) => r.secure_url)
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.error(error)
    return null
  }
}
