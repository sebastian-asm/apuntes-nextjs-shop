'use client'
import { useState } from 'react'

import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './slideshow.css'

import { ProductImage } from '@/components'

interface Props {
  images: string[]
  title: string
  className?: string
}

export default function Slideshow({ images, title, className }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()
  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        spaceBetween={10}
        autoplay={{ delay: 3000 }}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage src={image} width={1024} height={800} alt={title} className="rounded-lg object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage src={image} width={300} height={300} alt={title} className="rounded-lg object-fill" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
