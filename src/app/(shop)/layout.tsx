import { Footer, Sidebar, TopMenu } from '@/components'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      <Sidebar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
