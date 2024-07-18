'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export default function ProductInCart() {
  const [loadedComponent, setLoadedComponente] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)

  useEffect(() => setLoadedComponente(true), [])

  if (!loadedComponent) return <p>Cargando...</p>

  return (
    loadedComponent &&
    productsInCart.map((product) => (
      <div key={`${product.slug}-${product.size}`} className="flex mb-4">
        <Image
          src={`/products/${product.image}`}
          alt={product.title}
          width="100"
          height="100"
          className="rounded object-cover"
        />
        <div className="ml-2">
          <p>
            {product.size} - {product.title} ({product.quantity})
          </p>
          <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
        </div>
      </div>
    ))
  )
}
