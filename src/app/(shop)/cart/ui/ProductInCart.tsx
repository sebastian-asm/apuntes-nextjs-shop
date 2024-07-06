'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useCartStore } from '@/store'
import { QuantitySelector } from '@/components'
import Link from 'next/link'

export default function ProductInCart() {
  const [loadedComponent, setLoadedComponente] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeProduct = useCartStore((state) => state.removeProduct)

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
          <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
            {product.size} - {product.title}
          </Link>
          <p>${product.price}</p>
          <QuantitySelector
            handleQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            quantity={product.quantity}
          />
          <button onClick={() => removeProduct(product)} className="underline mt-3" type="button">
            Eliminar
          </button>
        </div>
      </div>
    ))
  )
}
