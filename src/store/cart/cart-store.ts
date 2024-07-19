import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartProduct } from '@/interfaces'

interface State {
  cart: CartProduct[]
  addProductToCart: (product: CartProduct) => void
  getTotalItems: () => number
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
  clearCart: () => void
  getSummaryInformation: () => {
    subtotal: number
    tax: number
    total: number
    itemsInCart: number
  }
}

export const useCartStore = create<State>()(
  // Persist es un middleware para persistir el store en localstorage
  persist(
    (set, get) => ({
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
      },
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, { quantity }) => total + quantity, 0)
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get()
        const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size)
        set({ cart: updatedCartProducts })
      },
      getSummaryInformation: () => {
        const { cart, getTotalItems } = get()
        const subtotal = cart.reduce((subtotal, product) => product.quantity * product.price + subtotal, 0)
        const itemsInCart = getTotalItems()
        const tax = subtotal * 0.19
        const total = subtotal + tax
        return { subtotal, tax, total, itemsInCart }
      },
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'shopping-cart'
    }
  )
)
