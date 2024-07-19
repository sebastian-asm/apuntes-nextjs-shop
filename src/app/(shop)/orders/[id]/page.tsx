import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import Image from 'next/image'
import clsx from 'clsx'

import { Title } from '@/components'
import { getOrderById } from '@/actions'
import { currencyFormat } from '@/utils'

interface Props {
  params: { id: string }
}

export default async function OrderPage({ params }: Props) {
  const { id } = params
  const order = await getOrderById(id)
  if (!order) redirect('/')

  const address = order.OrderAddress
  const products = order.OrderItem

  return (
    <section className="flex flex-col justify-center items-center mb-10 px-5 sm:px-0">
      <Title title="Orden de compra" />
      <p className="mb-8 text-lg text-left text-gray-500"># {id}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
        <div>
          <div
            className={clsx('mb-6 flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white', {
              'bg-red-400': !order?.isPaid,
              'bg-green-600': order?.isPaid
            })}
          >
            <IoCardOutline size={30} />
            <p className="ml-2">{order?.isPaid ? 'Pagada' : 'Pendiente de pago'}</p>
          </div>
          {products.map((item) => (
            <div key={`${item.product.slug}-${item.size}`} className="flex mb-4">
              <Image
                src={`/products/${item.product.ProductImage[0].url}`}
                alt={item.product.title}
                width="100"
                height="100"
                className="rounded object-cover"
              />
              <div className="ml-2">
                <p>{item.product.title}</p>
                <p>
                  {currencyFormat(item.price)} x {item.quantity}
                </p>
                <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2">Dirección de entrega</h2>
          <div className="mb-4">
            <p className="leading-relaxed">
              Nombre:{' '}
              <strong>
                {address?.firstName} {address?.lastName}
              </strong>
            </p>
            <p className="leading-relaxed">
              Dirección: <strong>{address?.address}</strong>
            </p>
            {address?.address2 && (
              <p className="leading-relaxed">
                Dirección 2: <strong>{address.address2}</strong>
              </p>
            )}
            <p className="leading-relaxed">
              Teléfono: <strong>{address?.phone}</strong>
            </p>
            <p className="leading-relaxed">
              Ciudad y país:{' '}
              <strong>
                {address?.city}, {address?.countryId}
              </strong>
            </p>
            <p className="leading-relaxed">
              Código postal: <strong>{address?.postalCode}</strong>
            </p>
          </div>
          <hr />
          <h2 className="text-2xl mb-2 mt-4">Detalle de la compra</h2>
          <div className="grid grid-cols-2">
            <p>Cantidad de productos:</p>
            <p className="text-right">{order?.itemsInOrder}</p>
            <p>Subtotal:</p>
            <p className="text-right">{order?.subTotal && currencyFormat(order.subTotal)}</p>
            <p>Impuestos (19%):</p>
            <p className="text-right">{order?.tax && currencyFormat(order.tax)}</p>
            <p className="mt-4 text-xl">Total:</p>
            <p className="text-right mt-4 text-xl">{order?.total && currencyFormat(order.total)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
