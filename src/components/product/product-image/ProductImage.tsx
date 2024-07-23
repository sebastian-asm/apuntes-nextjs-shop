import Image from 'next/image'

interface Props {
  src: string
  alt: string
  className: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>
}

export default function ProductImage({ src, alt, width, height, className, onMouseEnter, onMouseLeave }: Props) {
  const localSource = src ? (src.startsWith('http') ? src : `/products/${src}`) : `/imgs/placeholder.jpg`
  return (
    <Image
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      alt={alt}
      src={localSource}
      width={width}
      height={height}
      className={className}
    />
  )
}
