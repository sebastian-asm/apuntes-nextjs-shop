import Link from 'next/link'
import Image from 'next/image'

import { titleFont } from '@/config/fonts'

export default function PageNotFound() {
  return (
    <section className="flex flex-col-reverse md:flex-row h-[600px] w-full justify-center items-center">
      <div className="text-center">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Página no encontrada"
          width="250"
          height="250"
          className="mx-auto"
        />
        <h2 className={`${titleFont.className} antialiased text-5xl`}>Página no encontrada</h2>
        <p className={`${titleFont.className} antialiased text-2xl text-gray-600 font-bold mt-2`}>Error 404</p>
        <Link href="/" className="mt-4 block hover:underline">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
