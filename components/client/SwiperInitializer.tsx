'use client'

import { useEffect } from 'react'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'

interface SliderSettings {
  always?: boolean
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>
  slidesPerView: number
  spaceBetween: number
}

const sliderSettings: Record<string, SliderSettings> = {
  offers: {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  },
  reviews: {
    slidesPerView: 1.15,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  },
  brands: {
    always: true,
    slidesPerView: 2.2,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  },
  blog: {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  },
}

export function SwiperInitializer() {
  useEffect(() => {
    const tabletBreakpoint = window.matchMedia('(max-width: 1024px)')
    const sliders = new Map<HTMLElement, Swiper>()

    const initSliders = () => {
      const sliderElements = document.querySelectorAll<HTMLElement>('[data-slider]')

      sliderElements.forEach((slider) => {
        const sliderName = slider.dataset.slider

        if (!sliderName) {
          return
        }

        const config = sliderSettings[sliderName]

        if (!config) {
          return
        }

        const shouldRun = config.always === true || tabletBreakpoint.matches

        if (shouldRun && !sliders.has(slider)) {
          const swiper = new Swiper(slider, {
            breakpoints: config.breakpoints,
            grabCursor: true,
            modules: [Pagination],
            observeParents: true,
            observer: true,
            pagination: {
              clickable: true,
              el: slider.querySelector<HTMLElement>('.swiper-pagination'),
            },
            slidesPerView: config.slidesPerView,
            spaceBetween: config.spaceBetween,
            speed: 600,
            watchOverflow: true,
          })

          sliders.set(slider, swiper)
        }

        if (!shouldRun && sliders.has(slider)) {
          sliders.get(slider)?.destroy(true, true)
          sliders.delete(slider)
        }
      })
    }

    initSliders()
    tabletBreakpoint.addEventListener('change', initSliders)
    window.addEventListener('resize', initSliders)

    return () => {
      tabletBreakpoint.removeEventListener('change', initSliders)
      window.removeEventListener('resize', initSliders)
      sliders.forEach((slider) => slider.destroy(true, true))
      sliders.clear()
    }
  }, [])

  return null
}
