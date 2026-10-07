'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Shield, ArrowRight } from 'lucide-react'
import { useCompare } from '@/context/CompareContext'
import { useState } from 'react'
import { toggleCarLikeAction } from '@/app/actions'

export default function CarCard({ car }) {
  const { addToCompare, removeFromCompare, isInCompare, compareList } = useCompare()
  const checked = isInCompare(car.id)
  const atMax = compareList.length >= 5 && !checked
  const [isLiked, setIsLiked] = useState(car.Liked === true || car.liked === true)
  const [isLiking, setIsLiking] = useState(false)

  const handleCompare = (e) => {
    if (e.target.checked) addToCompare(car)
    else removeFromCompare(car.id)
  }

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const newStatus = !isLiked;
      const res = await toggleCarLikeAction(car.id, newStatus);
      if (res.success) {
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to toggle like status on server");
      }
    } catch (error) {
      console.error("Failed to toggle like status", error);
    } finally {
      setIsLiking(false);
    }
  }

  const discountPct = Math.round(
    ((car.original_price - car.discounted_price) / car.original_price) * 100
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      
      
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={`https://directus-8b8q.onrender.com/assets/${car.image}`}
          alt={car.model}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

       
       
        <span className="absolute top-3 left-3 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
          FEATURED
        </span>


        <button 
          onClick={handleLike}
          disabled={isLiking}
          className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
        >
          <Heart 
            className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>

        
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-full backdrop-blur-sm">
          <Shield className="w-3 h-3 text-amber-400" />
          Ratha Assured
        </div>
      </div>

      
      <div className="p-4">
        <h2 className="font-bold text-gray-900 text-[15px] leading-tight">{car.model}</h2>
        <p className="text-gray-500 text-xs mt-1">
          {car.registration_year} • {car.fuel_type} • {car.transmission}
        </p>
        <p className="text-gray-500 text-xs">
          {car.km_driven.toLocaleString()} km • {car.ownership}
        </p>

        
        <div className="mt-3 flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-bold text-gray-900">
            ₹{car.discounted_price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{car.original_price.toLocaleString()}
          </span>
          <span className="text-green-600 text-xs font-bold">{discountPct}% OFF</span>
        </div>

       
        <div className="text-gray-500 text-xs mt-0.5">
            EMI ₹{car.emi_per_month.toLocaleString()}/mo
        </div>

        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <label className={`flex items-center gap-1.5 select-none ${atMax ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
            <input
              type="checkbox"
              className="w-3.5 h-3.5 accent-amber-500"
              checked={checked}
              disabled={atMax}
              onChange={handleCompare}
            />
            <span className="text-xs text-gray-600">Compare</span>
          </label>
          <Link
            href={`/cars/${car.id}`}
            className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Details
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
