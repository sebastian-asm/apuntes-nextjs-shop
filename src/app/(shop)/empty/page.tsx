import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <section className="flex flex-col justify-center items-center h-[600px]">
      <IoCartOutline size={80} className="text-blue-500" />
      <h1 className="font-semibold text-xl">El carrito de compra esta vacío</h1>
      <Link href="/" className="mt-4 block hover:underline">
        Volver al inicio
      </Link>
    </section>
  )
}
