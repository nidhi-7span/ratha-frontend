'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Heart, Shield } from 'lucide-react'

export default function CarGallery({ images, carName }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveIndex(i => (i + 1) % images.length)

  const THUMB_LIMIT = 5
  const extraCount = Math.max(0, images.length - THUMB_LIMIT)

  return (
    <div>
  
      <div className="relative h-95 rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={images[activeIndex]}
          alt={carName}
          fill
          sizes="640px"
          className="object-cover"
          priority
        />

        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          <Shield className="w-3 h-3 text-amber-400" />
          RATHA ASSURED
        </div>

        <Button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </Button>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.slice(0, THUMB_LIMIT).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 flex-1 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image src={img} alt={`${carName} view ${i + 1}`} fill sizes="128px" className="object-cover" />
              {i === THUMB_LIMIT - 1 && extraCount > 0 && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-sm font-bold">
                  +{extraCount}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
