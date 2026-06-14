'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Navbar() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const router = useRouter()

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/cars?search=${encodeURIComponent(search.trim())}`)
    } else {
      router.push('/cars')
    }
  }

  return (
    <nav className="bg-[#111111] text-white border-b border-white/10">
      <div className="max-w-350 mx-auto px-4 sm:px-6 h-16 flex items-center gap-4 sm:gap-8">
        <Link href="/" className="shrink-0">
          <Image src="/logo.png" alt="Ratha" width={100} height={100} className="h-18 w-auto" priority />
        </Link>

        <div className="hidden sm:flex flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by brand, model or variant..."
              className="w-full bg-white text-black rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none"
            />
          </form>
        </div>

        <div className="flex items-center gap-4 sm:gap-7 text-sm ml-auto whitespace-nowrap">
          <Link href="/cars" className="hidden sm:block hover:text-amber-400 transition-colors font-medium">
            Buy Car
          </Link>
          <button className="sm:hidden text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-amber-400 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
