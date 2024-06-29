import clsx from 'clsx'

import { ValidSize } from '@/interfaces'

interface Props {
  selectedSize: ValidSize
  availableSizes: ValidSize[]
}

export default function SizeSelector({ selectedSize, availableSizes }: Props) {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles:</h3>
      {availableSizes.map((size) => (
        <button
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
