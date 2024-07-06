// Se revalidan los datos de la página después de 7 días (Time-based revalidation)
export const revalidate = 604800

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Slideshow, SlideshowMobile, StockLabel } from '@/components'
import { titleFont } from '@/config/fonts'
import { getProductBySlug } from '@/actions'
import AddToCart from './ui/AddToCart'

interface Props {
  params: { slug: string }
}

// Metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const product = await getProductBySlug(slug)

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  return (
    <section className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <SlideshowMobile title={product.title} images={product.images} className="block md:hidden" />
        <Slideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>
      <div className="px-5">
        {/* El stock es el único dato que se mantiene actualizado on-demand */}
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        <AddToCart product={product} />
        <div>
          <h3 className="font-bold">Descripción</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </section>
  )
}
