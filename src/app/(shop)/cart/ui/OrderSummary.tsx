'use client'
import { useEffect, useState } from 'react'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export default function OrderSummary() {
  const [loadedComponent, setLoadedComponent] = useState(false)
  const { subtotal, tax, total, itemsInCart } = useCartStore((state) => state.getSummaryInformation())

  useEffect(() => setLoadedComponent(true), [])

  if (!loadedComponent) return <p>Cargando...</p>

  return (
    loadedComponent && (
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
    )
  )
}
