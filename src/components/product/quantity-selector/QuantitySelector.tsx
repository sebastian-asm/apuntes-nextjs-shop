'use client'
import { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
}

export default function QuantitySelector({ quantity }: Props) {
  const [count, setCount] = useState(quantity)

  const handleQuantity = (value: number) => {
    if (count + value < 1) return
    setCount(count + value)
  }

  return (
    <div className="flex items-center">
      <button onClick={() => handleQuantity(-1)} type="button">
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 rounded text-center">{count}</span>
      <button onClick={() => handleQuantity(1)} type="button">
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
