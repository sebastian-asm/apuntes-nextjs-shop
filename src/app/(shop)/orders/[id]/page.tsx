import Link from 'next/link'
import Image from 'next/image'

import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  params: { id: string }
}

export default function OrderPage({ params }: Props) {
  const { id } = params
  const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

  return (
    <section className="flex flex-col justify-center items-center mb-10 px-10 sm:px-0">
      <Title title={`Orden de compra #${id}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        <div>
          <div
            className={clsx('mb-6 flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white', {
              'bg-red-400': false,
              'bg-green-600': true
            })}
          >
            <IoCardOutline size={30} />
            {/* <p className="ml-2">Compra pendiente de pago</p> */}
            <p className="ml-2">Compra pagada</p>
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
                <p>${product.price} x 3</p>
                <p className="font-bold">Subtotal: ${product.price * 3}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2">Dirección de entrega</h2>
          <div className="mb-4">
            <p>Sebastian</p>
            <p>Av. siempre viva 123</p>
            <p>Santiago</p>
          </div>
          <hr />
          <h2 className="text-2xl mb-2 mt-4">Detalle de la compra</h2>
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
        </div>
      </div>
    </section>
  )
}
