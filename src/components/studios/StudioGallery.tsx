"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

interface StudioGalleryProps {
  imageUrl: string;
  images?: string[];
  title: string;
}

const StudioGallery = ({
  imageUrl,
  images,
  title,
}: StudioGalleryProps) => {
  const galleryImages = Array.from(
    new Set([imageUrl, ...(images ?? [])].filter(Boolean)),
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1,
    );
  };

  if (galleryImages.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-3xl bg-gray-100 dark:bg-gray-800">
        <Images size={48} className="text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="group relative aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={galleryImages[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
          className="object-cover transition duration-500"
        />

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white">
              {activeIndex + 1} / {galleryImages.length}
            </div>
          </>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                activeIndex === index
                  ? "border-violet-600"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudioGallery;