'use client'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { Category, Product } from '@/interfaces'
import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductImage as ProductImageProps } from '@prisma/client'
import { ProductImage } from '@/components'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImageProps[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

interface Inputs {
  title: string
  slug: string
  description: string
  price: number
  inStock: number
  sizes: string[]
  tags: string
  gender: 'men' | 'women' | 'kid' | 'unisex'
  categoryId: string
  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    // formState: { isValid },
    getValues,
    setValue,
    watch
  } = useForm<Inputs>({
    defaultValues: {
      ...product,
      tags: product.tags && product.tags.join(', '),
      sizes: product.sizes ?? [],
      images: undefined
    }
  })

  // volver a renderizar el form cuando los sizes cambian
  watch('sizes')

  const onSubmit = async (data: Inputs) => {
    const formData = new FormData()
    if (product.id) formData.append('id', product.id)
    formData.append('title', data.title)
    formData.append('slug', data.slug)
    formData.append('description', data.description)
    formData.append('price', data.price.toString())
    formData.append('inStock', data.inStock.toString())
    formData.append('sizes', data.sizes.toString())
    formData.append('tags', data.tags)
    formData.append('gender', data.gender)
    formData.append('categoryId', data.categoryId)

    if (data.images) {
      for (const image of Array.from(data.images)) {
        formData.append('images', image)
      }
    }

    const productUpdate = await createUpdateProduct(formData)
    if (!productUpdate) return alert('El producto no se pudo actualizar')
    router.replace(`/admin/products/${productUpdate.slug}`)
  }

  const onSizeChange = (size: string) => {
    // el Set no permite valores repetidos
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    // se vuelve a combertir a un array
    setValue('sizes', Array.from(sizes))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <p className="mb-3">Título</p>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Slug</p>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Descripción</p>
          <textarea
            rows={4}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Precio</p>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Etiquetas</p>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Género</p>
          <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
            <option value="">- Seleccionar -</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <p className="my-3">Categoria</p>
          <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
            <option value="">- Seleccionar -</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary w-full mt-6">
          Guardar
        </button>
      </div>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <p className="mb-3">Stock</p>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col">
          <p className="my-3">Tallas</p>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <button
                onClick={() => onSizeChange(size)}
                type="button"
                key={size}
                className={clsx(
                  'flex items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all cursor-pointer',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size)
                  }
                )}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col mb-2">
            <p className="my-3">Imágenes</p>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  onClick={() => deleteProductImage(image.id, image.url)}
                  type="button"
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
