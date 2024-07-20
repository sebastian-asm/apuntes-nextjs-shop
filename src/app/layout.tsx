import type { Metadata } from 'next'

import { Providers } from '@/components'
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
      <body className={inter.className}>
        {/* Provider que permite obtener la sesión del lado del cliente */}
        {/* Para este provider es necesario una api rest para que verifique la sesión */}
        {/* En este caso sería en /api/auth/[...nextauth]/route.ts */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
