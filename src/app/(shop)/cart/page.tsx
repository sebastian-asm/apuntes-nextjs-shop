import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'

export default function CartPage() {
  const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]
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
          {productsInCart.map((product) => (
            <div key={product.slug} className="flex mb-4">
              <Image
                src={`/products/${product.images[0]}`}
                alt={product.title}
                width="100"
                height="100"
                className="rounded object-cover"
              />
              <div className="ml-2">
                <p>{product.title}</p>
                <p>${product.price}</p>
                <QuantitySelector quantity={3} />
                <button className="underline mt-3" type="button">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2">Detalle de la compra</h2>
          <div className="grid grid-cols-2">
            <p>Cantidad de productos:</p>
            <p className="text-right">3</p>
            <p>Subtotal:</p>
            <p className="text-right">$123</p>
            <p>Impuestos (19%):</p>
            <p className="text-right">$123</p>
            <p className="mt-4 text-xl">Total:</p>
            <p className="text-right mt-4 text-xl">$123</p>
          </div>
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
