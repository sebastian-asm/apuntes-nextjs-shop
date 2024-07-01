import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mb-8 text-center">
      <Link href="/">
        <strong>NextJS</strong> | Shop - {new Date().getFullYear()}
      </Link>
    </footer>
  )
}
