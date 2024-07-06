export const revalidate = 60

import { redirect } from 'next/navigation'

import { getProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@prisma/client'

interface Props {
  params: { gender: string }
  searchParams: { page?: string }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { gender } = params
  const { products, totalPages } = await getProductsWithImages({ page, gender: gender as Gender })
  if (products.length === 0) redirect(`/gender/${gender}`)

  const label: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex'
  }

  return (
    <section>
      <Title title={label[gender]} className="mb-8" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </section>
  )
}
