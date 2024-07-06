'use client'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
  handleQuantityChanged: (value: number) => void
}

export default function QuantitySelector({ quantity, handleQuantityChanged }: Props) {
  const valueChanged = (value: number) => {
    if (quantity + value < 1) return
    handleQuantityChanged(quantity + value)
  }

  return (
    <div className="flex items-center">
      <button onClick={() => valueChanged(-1)} type="button">
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 rounded text-center">{quantity}</span>
      <button onClick={() => valueChanged(1)} type="button">
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
