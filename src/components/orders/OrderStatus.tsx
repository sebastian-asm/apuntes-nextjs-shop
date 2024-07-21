import { IoCardOutline } from 'react-icons/io5'
import clsx from 'clsx'

interface Props {
  isPaid: boolean
}

export default function OrderStatus({ isPaid }: Props) {
  return (
    <div
      className={clsx('mb-6 flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white', {
        'bg-red-400': !isPaid,
        'bg-green-600': isPaid
      })}
    >
      <IoCardOutline size={30} />
      <p className="ml-2">{isPaid ? 'Pagada' : 'Pendiente de pago'}</p>
    </div>
  )
}
