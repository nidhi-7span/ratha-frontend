'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Heart } from 'lucide-react'

export default function Navbar() {
  const [search, setSearch] = useState('')

  return (
    <nav className="bg-[#111111] text-white border-b border-white/10">
      <div className="max-w-350 mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold tracking-wide">
            <span className="text-amber-400">R</span>ATHA
          </span>
        </Link>

        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by brand, model or city..."
              className="w-full bg-white text-black rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-7 text-sm ml-auto whitespace-nowrap">
          <Link href="/cars" className="hover:text-amber-400 transition-colors font-medium">
            Buy Car
          </Link>
          <button className="hover:text-amber-400 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
