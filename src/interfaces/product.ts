export interface Product {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ValidSize[]
  slug: string
  tags: string[]
  title: string
  // type: ValidType
  gender: ValidCategory
}

export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: ValidSize
  image: string
}

export type ValidCategory = 'men' | 'women' | 'kid' | 'unisex'
export type ValidSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats'
