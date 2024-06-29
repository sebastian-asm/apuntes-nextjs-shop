import { ProductGrid, Title } from '@/components'
import { ValidCategory } from '@/interfaces'
import { initialData } from '@/seed/seed'

interface Props {
  params: { id: ValidCategory }
}

const products = initialData.products

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const productsFilter = products.filter((product) => product.gender === id)
  const label: Record<ValidCategory, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Unisex'
  }

  return (
    <section>
      <Title title={label[id]} className="mb-8" />
      <ProductGrid products={productsFilter} />
    </section>
  )
}
