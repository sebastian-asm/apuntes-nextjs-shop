import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products

export default function ShopPage() {
  return (
    <section>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-8" />
      <ProductGrid products={products} />
    </section>
  )
}
