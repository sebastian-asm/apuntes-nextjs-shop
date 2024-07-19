export const revalidate = 0

import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'
import Link from 'next/link'

import { getOrderByUser } from '@/actions'
import { Title } from '@/components'

export default async function OrdersPage() {
  const orders = await getOrderByUser()
  if (!orders) redirect('/auth/login')

  return (
    <>
      <div className="mb-10 mx-5">
        <Title title="Ordenes de compra" />
        <table className="min-w-full overflow">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">{order.id}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline className={order.isPaid ? 'text-green-800' : 'text-red-500'} />
                  <span className={`mx-2 ${order.isPaid ? 'text-green-800' : 'text-red-500'}`}>
                    {order.isPaid ? 'Pagada' : 'Pendiente de pago'}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
