import type { Metadata } from 'next'

import { inter } from '@/config/fonts'
import './globals.css'

// Metadata estática
export const metadata: Metadata = {
  title: {
    template: '%s | NextJS Shop',
    default: 'Inicio | NextJS Shop'
  },
  description: 'Tienda virtual creada con NextJS 13+'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
