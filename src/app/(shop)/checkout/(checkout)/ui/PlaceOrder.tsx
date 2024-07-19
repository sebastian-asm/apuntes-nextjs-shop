'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import { placeOrder } from '@/actions'

export default function PlaceOrder() {
  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subtotal, tax, total } = useCartStore((state) => state.getSummaryInformation())
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)
  const router = useRouter()

  useEffect(() => setLoaded(true), [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const resp = await placeOrder(productsToOrder, address)
    if (!resp.order) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message)
      return
    }

    clearCart()
    router.replace(`/orders/${resp.order.id}`)
  }

  if (!loaded) return <p>Cargando...</p>

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-4">
        <p className="leading-relaxed">
          Nombre:{' '}
          <strong>
            {address.firstName} {address.lastName}
          </strong>
        </p>
        <p className="leading-relaxed">
          Dirección: <strong>{address.address}</strong>
        </p>
        {address.address2 && (
          <p className="leading-relaxed">
            Dirección 2: <strong>{address.address2}</strong>
          </p>
        )}
        <p className="leading-relaxed">
          Teléfono: <strong>{address.phone}</strong>
        </p>
        <p className="leading-relaxed">
          Ciudad y país:{' '}
          <strong>
            {address.city}, {address.country}
          </strong>
        </p>
        <p className="leading-relaxed">
          Código postal: <strong>{address.postalCode}</strong>
        </p>
      </div>
      <hr />
      <h2 className="text-2xl mb-2 mt-4">Detalle de la compra</h2>
      <div className="grid grid-cols-2">
        <p>Cantidad de productos:</p>
        <p className="text-right">{itemsInCart}</p>
        <p>Subtotal:</p>
        <p className="text-right">{currencyFormat(subtotal)}</p>
        <p>Impuestos (19%):</p>
        <p className="text-right">{currencyFormat(tax)}</p>
        <p className="mt-4 text-xl">Total:</p>
        <p className="text-right mt-4 text-xl">{currencyFormat(total)}</p>
      </div>
      {errorMessage && <p className="p-2.5 bg-red-200 mt-4 rounded-lg text-sm text-red-600 fade-in">{errorMessage}</p>}
      <div className="mt-6">
        <button
          onClick={onPlaceOrder}
          className={clsx('w-full', {
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder
          })}
        >
          Procesar orden
        </button>
      </div>
    </div>
  )
}
