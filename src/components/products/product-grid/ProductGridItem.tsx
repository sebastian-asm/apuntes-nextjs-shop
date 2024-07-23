'use client'
import { useState } from 'react'
import Link from 'next/link'

import { Product } from '@/interfaces'
import { ProductImage } from '@/components'

interface Props {
  product: Product
}

export default function ProductGridItem({ product }: Props) {
  const [image, setImage] = useState(product.images[0])
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="rounded-md overflow-hidden fade-in">
        <ProductImage
          onMouseEnter={() => setImage(product.images[1])}
          onMouseLeave={() => setImage(product.images[0])}
          src={image}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
        />
        <div className="p-4">
          <p>{product.title}</p>
          <p className="font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  )
}
