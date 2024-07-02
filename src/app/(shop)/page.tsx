import { redirect } from 'next/navigation'

import { getProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, currentPage, totalPages } = await getProductsWithImages({ page })
  if (products.length === 0) redirect('/')

  return (
    <section className="px-5">
      <Title title="Tienda" subtitle="Todos los productos" className="mb-8" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </section>
  )
}
