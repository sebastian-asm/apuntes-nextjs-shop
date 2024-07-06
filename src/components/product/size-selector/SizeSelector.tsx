import clsx from 'clsx'

import type { ValidSize } from '@/interfaces'

interface Props {
  selectedSize?: ValidSize
  availableSizes: ValidSize[]
  handleSizeChanged: (size: ValidSize) => void
}

export default function SizeSelector({ selectedSize, availableSizes, handleSizeChanged }: Props) {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles:</h3>
      {availableSizes.map((size) => (
        <button
          onClick={() => handleSizeChanged(size)}
          key={size}
          type="button"
          className={clsx('mx-2 text-lg hover:underline', {
            underline: size === selectedSize
          })}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
