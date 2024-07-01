import { redirect } from 'next/navigation'

import { getProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products } = await getProductsWithImages({ page })
  if (products.length === 0) redirect('/')

  return (
    <section className="px-5">
      <Title title="Tienda" subtitle="Todos los productos" className="mb-8" />
      <ProductGrid products={products} />
    </section>
  )
}
