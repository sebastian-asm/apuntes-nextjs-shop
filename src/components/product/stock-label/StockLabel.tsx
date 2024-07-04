'use client'
import { useEffect, useState } from 'react'

import { titleFont } from '@/config/fonts'
import { getStockBySlug } from '@/actions'

export default function StockLabel({ slug }: { slug: string }) {
  const [stock, setStock] = useState(0)
  const [loading, setLoading] = useState(true)

  const getStock = async () => {
    // Llamando al server action para obtener siempre el stock actualizado
    const stock = await getStockBySlug(slug)
    setStock(stock)
    setLoading(false)
  }

  useEffect(() => {
    getStock()
  })

  return loading ? (
    <h4 className="antialiased font-bold text-lg mb-1 bg-gray-200 animate-pulse rounded">&nbsp;</h4>
  ) : (
    <h4 className={`${titleFont.className} antialiased font-bold text-lg mb-1 fade-in`}>Stock: {stock}</h4>
  )
}
