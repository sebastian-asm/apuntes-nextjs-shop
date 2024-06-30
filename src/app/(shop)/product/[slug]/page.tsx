import { notFound } from 'next/navigation'

import { initialData } from '@/seed/seed'
import { QuantitySelector, SizeSelector, Slideshow, SlideshowMobile } from '@/components'
import { titleFont } from '@/config/fonts'

interface Props {
  params: { slug: string }
}

const products = initialData.products

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const product = products.find((product) => product.slug === slug)
  if (!product) notFound()

  return (
    <section className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <SlideshowMobile title={product.title} images={product.images} className="block md:hidden" />
        <Slideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>
      <div className="px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        <QuantitySelector quantity={2} />
        <button type="button" className="btn-primary my-5">
          Agregar al carrito
        </button>
        <div>
          <h3 className="font-bold">Descripción</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </section>
  )
}
