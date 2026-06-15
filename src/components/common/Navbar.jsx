'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart, X, ChevronDown } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Navbar() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [cities, setCities] = useState([])
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef(null)

  useEffect(() => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => setCities(data.data || []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setSearch(searchParams.get('search') || '')
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    setIsMobileSearchOpen(false)
    if (search.trim()) {
      router.push(`/cars?search=${encodeURIComponent(search.trim())}`)
    } else {
      router.push('/cars')
    }
  }

  return (
    <nav className="bg-[#111111] text-white border-b border-white/10 relative z-50">
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
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1"
            >
              Buy Car {searchParams.get('city') ? `in ${searchParams.get('city')}` : ''}
              <ChevronDown className={`w-4 h-4 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCityDropdownOpen && (
              <div className="absolute top-full mt-4 right-0 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                <Link 
                  href="/cars"
                  onClick={() => setIsCityDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-50 text-sm font-medium"
                >
                  All Cities
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                {cities.map(city => (
                  <Link 
                    key={city}
                    href={`/cars?city=${encodeURIComponent(city)}`}
                    onClick={() => setIsCityDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="sm:hidden text-gray-400 hover:text-white transition-colors"
          >
            {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
          <button className="hover:text-amber-400 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="sm:hidden px-4 pb-4 absolute top-16 left-0 right-0 bg-[#111111] border-b border-white/10 shadow-lg">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by brand, model or variant..."
              className="w-full bg-white text-black rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      )}
    </nav>
  )
}
