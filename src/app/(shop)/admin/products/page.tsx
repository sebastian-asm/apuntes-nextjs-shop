import Link from 'next/link'

import { Pagination, ProductImage, Title } from '@/components'
import { getProductsWithImages } from '@/actions'
import { currencyFormat } from '@/utils'

interface Props {
  searchParams: { page?: string }
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getProductsWithImages({ page })

  return (
    <>
      <div className="mb-10 mx-5">
        <Title title="Mantenimiento de productos" />
        <div className="flex justify-end mb-5">
          <Link href="/admin/products/new" className="btn-primary">
            Nuevo producto
          </Link>
        </div>
        <table className="min-w-full overflow">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Título
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Etiqueta
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                  <ProductImage
                    alt={product.title}
                    src={product.ProductImage[0]?.url}
                    className="w-20 h-20 object-cover rounded"
                    width={100}
                    height={100}
                  />
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/products/${product.slug}`} className="hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.gender}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{product.inStock}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
