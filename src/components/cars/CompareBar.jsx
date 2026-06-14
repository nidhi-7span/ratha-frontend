'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'
import { useCompare } from '@/context/CompareContext'

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  if (compareList.length === 0) return null

  const ids = compareList.map((c) => c.id).join(',')
  const canCompare = compareList.length >= 2

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <span className="text-white text-sm font-semibold shrink-0">
          Compare ({compareList.length}/5)
        </span>

        <div className="flex items-center gap-3 flex-1 overflow-x-auto">
          {compareList.map((car) => (
            <div
              key={car.id}
              className="relative flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 shrink-0"
            >
              <div className="relative w-10 h-8 shrink-0">
                <Image
                  src={`https://directus-8b8q.onrender.com/assets/${car.image}`}
                  alt={car.model}
                  fill
                  className="object-cover rounded"
                  sizes="40px"
                />
              </div>
              <span className="text-white text-xs font-medium max-w-[100px] truncate">
                {car.model}
              </span>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="ml-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {compareList.length < 5 && (
            <div className="flex items-center justify-center w-[130px] h-[44px] border border-dashed border-gray-500 rounded-lg shrink-0">
              <span className="text-gray-500 text-xs">+ Add car</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={clearCompare}
            className="text-gray-400 hover:text-white text-xs transition-colors"
          >
            Clear all
          </button>
          {canCompare ? (
            <Link
              href={`/cars/compare?ids=${ids}`}
              className="flex items-center gap-1.5 bg-amber-400 text-black text-sm font-bold px-5 py-2 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Compare Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-400/40 text-black/50 text-sm font-bold px-5 py-2 rounded-lg cursor-not-allowed">
              Add {2 - compareList.length} more
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
