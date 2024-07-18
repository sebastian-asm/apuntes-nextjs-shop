import Link from 'next/link'

import { Title } from '@/components'
import ProductInCart from './ui/ProductInCart'
import PlaceOrder from './ui/PlaceOrder'

export default function CheckoutPage() {
  return (
    <section className="flex flex-col justify-center items-center mb-10 px-5 sm:px-0">
      <Title title="Verificar compra" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        <div>
          <div className="mb-6">
            <p>Detalle del carrito</p>
            <Link href="/cart" className="underline">
              Editar
            </Link>
          </div>
          <ProductInCart />
        </div>
        <PlaceOrder />
      </div>
    </section>
  )
}
