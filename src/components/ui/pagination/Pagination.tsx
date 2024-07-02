'use client'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import clsx from 'clsx'

import { generatePaginationNumber } from '@/utils'

interface Props {
  totalPages: number
}

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(+pageString) ? 1 : +pageString
  const allPages = generatePaginationNumber(currentPage, totalPages)

  console.log(pathname)

  if (currentPage < 1) redirect(pathname)

  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    if (pageNumber === '...') return `${pathname}?${params.toString()}`
    if (+pageNumber <= 0) return `${pathname}`
    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex justify-center mt-16 mb-32">
      <nav>
        <ul className="flex items-center list-style-none">
          <li className="page-item">
            <Link
              className="page-link block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={index} className="page-item">
              <Link
                className={clsx(
                  'page-link block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    'bg-blue-500 text-white shadow-sm hover:bg-blue-400 hover:text-white': page === currentPage
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
