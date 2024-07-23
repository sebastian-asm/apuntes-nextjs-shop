import { redirect } from 'next/navigation'

import { getProductBySlug, getProductsCategories } from '@/actions'
import { Title } from '@/components'
import { ProductForm } from './ui/ProductForm'

interface Props {
  params: { slug: string }
}

export default async function AdminProductpage({ params }: Props) {
  const { slug } = params
  const [product, categories] = await Promise.all([getProductBySlug(slug), getProductsCategories()])
  if (!product && slug !== 'new') redirect('/admin/products')
  const title = slug === 'new' ? 'Agregar nuevo producto' : 'Editar producto'

  return (
    <section>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </section>
  )
}
