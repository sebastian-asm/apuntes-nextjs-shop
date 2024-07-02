'use client'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'

const options = [
  { path: '/gender/men', title: 'Hombres' },
  { path: '/gender/women', title: 'Mujeres' },
  { path: '/gender/kid', title: 'Niños' }
]

export default function TopMenu() {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  return (
    <nav className="flex px-5 justify-between items-center w-full py-2">
      <div>
        <Link href="/" className={`${titleFont.className} antialiased`}>
          <span className="font-bold">NextJS</span> | Shop
        </Link>
      </div>
      <div className="hidden sm:block">
        {options.map((option) => (
          <Link key={option.title} href={option.path} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
            {option.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
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
