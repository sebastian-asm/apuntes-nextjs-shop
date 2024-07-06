import Link from 'next/link'

import { Title } from '@/components'
import ProductInCart from './ui/ProductInCart'
import OrderSummary from './ui/OrderSummary'

export default function CartPage() {
  // redirect('/empty')
  return (
    <section className="flex flex-col justify-center items-center mb-10 px-5 sm:px-0">
      <Title title="Carrito de compra" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        <div>
          <div className="mb-6">
            <p>Agregar más items</p>
            <Link href="/" className="underline">
              Continúa comprando
            </Link>
          </div>
          <ProductInCart />
        </div>
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2">Detalle de compra</h2>
          <OrderSummary />
          <div className="mt-6">
            <Link href="/checkout/address" className="btn-primary w-full block text-center">
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
