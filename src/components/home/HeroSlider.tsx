"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Pagination,
  Navigation,
} from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    subtitle: "YOUR SPACE. YOUR CREATIVE FREEDOM.",
    title: "Find the Perfect Space to Create Something Amazing.",
    description:
      "Discover inspiring studios, professional equipment, and creative spaces designed to bring your vision to life.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
  },
  {
    subtitle: "BUILT FOR CREATORS",
    title: "Where Creative Ideas Turn Into Reality.",
    description:
      "From photography studios to podcast rooms, find the perfect environment for your next big project.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=2000&q=85",
  },
  {
    subtitle: "SHARE YOUR CREATIVE SPACE",
    title: "Turn Your Studio Into an Opportunity.",
    description:
      "List your creative space, connect with talented creators, and make your studio work for you.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
  },
];

const HeroSlider = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative overflow-hidden bg-gray-950">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        speed={900}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: previousButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation;

          if (navigation && typeof navigation !== "boolean") {
            navigation.prevEl = previousButtonRef.current;
            navigation.nextEl = nextButtonRef.current;
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="hero-slider w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[420px] items-center justify-center bg-cover bg-center px-6 py-20 text-center sm:min-h-[460px] lg:min-h-[520px]"
              style={{
                backgroundImage: `url("${slide.image}")`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75" />

              <div className="relative mx-auto flex w-full max-w-7xl justify-center">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                  <p className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white sm:text-sm">
                    {slide.subtitle}
                  </p>

                  <h1 className="mt-6 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/studios"
                      className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      Explore Studios
                    </Link>

                    <Link
                      href="/add-studio"
                      className="rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={previousButtonRef}
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 left-4 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-violet-500 hover:bg-violet-600 sm:left-8 sm:h-12 sm:w-12"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        ref={nextButtonRef}
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-4 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-sm transition hover:border-violet-500 hover:bg-violet-600 sm:right-8 sm:h-12 sm:w-12"
      >
        <ChevronRight size={24} />
      </button>

      <style jsx global>{`
        .hero-slider .swiper-pagination {
          bottom: 24px !important;
        }

        .hero-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #ffffff;
          opacity: 0.55;
          transition: all 0.3s ease;
        }

        .hero-slider .swiper-pagination-bullet-active {
          width: 26px;
          background: #8b5cf6;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;