'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import './slideshow.css'

interface Props {
  images: string[]
  title: string
  className?: string
}

export default function SlideshowMobile({ images, title, className }: Props) {
  return (
    <div className={className}>
      <Swiper
        style={{ height: '500px' }}
        autoplay={{ delay: 3000 }}
        pagination
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={`/products/${image}`} width="600" height="500" alt={title} className="object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
