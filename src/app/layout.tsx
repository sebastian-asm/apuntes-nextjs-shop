import type { Metadata } from 'next'

import { inter } from '@/config/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextJS Shop',
  description: 'Tienda virtual creada con NextJS 13+'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
