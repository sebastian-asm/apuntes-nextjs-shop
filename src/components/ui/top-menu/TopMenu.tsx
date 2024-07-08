'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store'

const options = [
  { path: '/gender/men', title: 'Hombres' },
  { path: '/gender/women', title: 'Mujeres' },
  { path: '/gender/kid', title: 'Niños' }
]

export default function TopMenu() {
  const params = useParams()
  const [loadedComponent, setLoadedComponent] = useState(false)
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const totalItems = useCartStore((state) => state.getTotalItems())

  // Esto evita problema de la hidratación con el contador de elementos del carrito
  useEffect(() => setLoadedComponent(true), [])

  const activeLink = (path: string): string => {
    const shortPath = path.split('/').at(-1)
    return shortPath === params.gender ? 'bg-gray-100' : ''
  }

  return (
    <nav className="flex px-5 justify-between items-center w-full py-2">
      <div>
        <Link href="/" className={`${titleFont.className} antialiased`}>
          <span className="font-bold">NextJS</span> | Shop
        </Link>
      </div>
      <div className="hidden sm:block">
        {options.map((option) => (
          <Link
            key={option.title}
            href={option.path}
            className={`${activeLink(option.path)} m-2 p-2 rounded-md transition-all hover:bg-gray-100`}
          >
            {option.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={totalItems === 0 && loadedComponent ? '/empty' : '/cart'} className="mx-2">
          <div className="relative">
            {loadedComponent && totalItems > 0 && (
              <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={openSideMenu} type="button" className="mx-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menú
        </button>
      </div>
    </nav>
  )
}
