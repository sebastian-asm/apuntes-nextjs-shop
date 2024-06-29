'use client'
import Link from 'next/link'
import {
  IoCloseOutline,
  // IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from 'react-icons/io5'
// librería que permite agregar clases condicionles
import clsx from 'clsx'

import { useUIStore } from '@/store'

interface OptionesProps {
  path: string
  icon: React.ReactNode
  title: string
}

const options: OptionesProps[] = [
  { path: '/', icon: <IoPersonOutline size={20} />, title: 'Perfil' },
  { path: '/', icon: <IoTicketOutline size={20} />, title: 'Ordenes' }
  // { path: '/', icon: <IoLogInOutline size={20} />, title: 'Ingresar' }
]

const optionsAdmin: OptionesProps[] = [
  { path: '/', icon: <IoShirtOutline size={20} />, title: 'Productos' },
  { path: '/', icon: <IoTicketOutline size={20} />, title: 'Ordenes' },
  { path: '/', icon: <IoPeopleOutline size={20} />, title: 'Clientes' }
]

export default function Sidebar() {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
  const closeSideMenu = useUIStore((state) => state.closeSideMenu)

  return (
    <aside>
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div
            onClick={closeSideMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        </>
      )}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )}
      >
        <IoCloseOutline onClick={closeSideMenu} size={50} className="absolute top-5 right-5 cursor-pointer" />
        <div className="relative mt-20">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {options.map((option) => (
          <Link
            key={option.title}
            href={option.path}
            className="flex items-center my-5 p-2 hover:bg-gray-100 rounded transition-all"
          >
            {option.icon}
            <p className="ml-3">{option.title}</p>
          </Link>
        ))}
        <Link href="/" className="flex items-center my-5 p-2 hover:bg-gray-100 rounded transition-all">
          <IoLogOutOutline size={20} />
          <p className="ml-3">Salir</p>
        </Link>
        <hr />
        {optionsAdmin.map((option) => (
          <Link
            key={option.title}
            href={option.path}
            className="flex items-center my-5 p-2 hover:bg-gray-100 rounded transition-all"
          >
            {option.icon}
            <p className="ml-3">{option.title}</p>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
