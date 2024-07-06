'use client'
import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { useCartStore } from '@/store'
import type { CartProduct, Product, ValidSize } from '@/interfaces'

interface Props {
  product: Product
}

export default function AddToCart({ product }: Props) {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [size, setSize] = useState<ValidSize | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [messageError, setMessageError] = useState(false)

  const addToCart = () => {
    if (!size) return setMessageError(true)
    const { id, slug, title, price, images } = product
    const cartProduct: CartProduct = {
      id,
      slug,
      title,
      price,
      quantity,
      size,
      image: images[0]
    }
    addProductToCart(cartProduct)
    setMessageError(false)
    setSize(undefined)
    setQuantity(1)
  }

  return (
    <>
      <SizeSelector handleSizeChanged={setSize} selectedSize={size} availableSizes={product.sizes} />
      <QuantitySelector handleQuantityChanged={setQuantity} quantity={quantity} />
      {messageError && !size && <p className="text-sm text-red-500 mt-5 fade-in">Debe seleccionar una talla</p>}
      <button onClick={addToCart} type="button" className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
