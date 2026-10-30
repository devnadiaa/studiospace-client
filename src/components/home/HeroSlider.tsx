"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section className="overflow-hidden bg-gray-950">
      <div
        className="relative flex min-h-[400px] items-center bg-cover bg-center px-6 py-16 sm:min-h-[440px] lg:min-h-[480px]"
        style={{
          backgroundImage: `url("${slides[currentSlide].image}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20"></div>

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white sm:text-sm">
              {slides[currentSlide].subtitle}
            </p>

            <h1 className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
              {slides[currentSlide].title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
              {slides[currentSlide].description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/studios"
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Explore Studios
              </Link>

              <Link
                href="/studios"
                className="rounded-xl border border-white/50 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
              >
                Host Your Space
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition hover:bg-violet-600"
          aria-label="Previous slide"
        >
          &#8249;
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white transition hover:bg-violet-600"
          aria-label="Next slide"
        >
          &#8250;
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-violet-500"
                  : "w-2 bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;