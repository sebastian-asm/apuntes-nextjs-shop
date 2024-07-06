import { create } from 'zustand'

import { CartProduct } from '@/interfaces'

interface State {
  cart: CartProduct[]
  addProductToCart: (product: CartProduct) => void
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
  addProductToCart: (product: CartProduct) => {
    const { cart } = get()
    // Comprobando si ya existe el producto en el carrito
    const productInCart = cart.some(({ id, size }) => id === product.id && size === product.size)
    // Si no existe se agrega como nuevo elemento
    if (!productInCart) return set({ cart: [...cart, product] })
    // Si ya existe, se actualiza el carrito con las nuevas cantidades
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return {
          ...item,
          quantity: item.quantity + product.quantity
        }
      }
      return item
    })
    set({ cart: updatedCartProducts })
  }
}))
