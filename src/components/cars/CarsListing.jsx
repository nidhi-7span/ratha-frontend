'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { LayoutGrid, List, ChevronDown, Loader2, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CarCard from './carCard'
import CarCardSkeleton from './CarCardSkeleton'
import FilterSidebar from '../filters/FilterSidebar'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

async function fetchCarsPage({ filters, sortBy, page, search, city }) {
  const params = new URLSearchParams({
    filters: JSON.stringify(filters),
    sortBy,
    page: String(page),
  })
  if (search) params.set('search', search)
  if (city) params.set('city', city)
  const res = await fetch(`/api/cars?${params}`)
  if (!res.ok) throw new Error('Failed to fetch cars')
  return res.json()
}

const EMPTY_FILTERS = {
  priceRange: null,
  brands: [],
  fuelTypes: [],
  transmissions: [],
  bodyTypes: [],
  ownerTypes: [],
  registrationYears: null,
  kmDriven: null,
}

export default function CarsListing({ initialCars, total: initialTotal, facets, initialSearch = '', initialCity = '' }) {
  const router = useRouter()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')

  const [cars, setCars] = useState(initialCars)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

  useEffect(() => {
    setCars(initialCars)
    setTotal(initialTotal)
    setPage(1)
  }, [initialSearch, initialCity, initialCars, initialTotal])

  const hasMore = cars.length < total

 
  const requestId = useRef(0)
  const didMount = useRef(false)


  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    const token = ++requestId.current
    setLoading(true)
    setIsFiltering(true)
    const timer = setTimeout(async () => {
      try {
        const { data, total: newTotal } = await fetchCarsPage({ filters, sortBy, page: 1, search: initialSearch, city: initialCity })
        if (token !== requestId.current) return
        setCars(data)
        setTotal(newTotal)
        setPage(1)
      } finally {
        if (token === requestId.current) {
          setLoading(false)
          setIsFiltering(false)
        }
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [filters, sortBy])

  const loadMore = useCallback(async () => {
    if (loading || cars.length >= total) return

    const token = ++requestId.current
    const nextPage = page + 1
    setLoading(true)
    try {
      const { data } = await fetchCarsPage({ filters, sortBy, page: nextPage, search: initialSearch, city: initialCity })
      if (token !== requestId.current) return
      setCars((prev) => [...prev, ...data])
      setPage(nextPage)
    } finally {
      if (token === requestId.current) setLoading(false)
    }
  }, [loading, cars.length, total, page, filters, sortBy])

  const sentinelRef = useInfiniteScroll(loadMore, hasMore && !loading)

  const activeChips = [
    ...filters.brands.map((v) => ({ key: 'brands', value: v })),
    ...filters.fuelTypes.map((v) => ({ key: 'fuelTypes', value: v })),
    ...filters.transmissions.map((v) => ({ key: 'transmissions', value: v })),
    ...filters.bodyTypes.map((v) => ({ key: 'bodyTypes', value: v })),
    ...filters.ownerTypes.map((v) => ({ key: 'ownerTypes', value: v })),
  ]

  const removeChip = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key].filter((v) => v !== value) }))

  const clearAll = () => {
    setFilters(EMPTY_FILTERS)
    if (initialSearch || initialCity) router.push('/cars')
  }

  return (
    <div className="max-w-350 mx-auto px-4 sm:px-6 py-6 sm:py-8 flex gap-6 items-start">
     
      <FilterSidebar facets={facets} filters={filters} onFiltersChange={setFilters} />

      <div className="flex-1 min-w-0">
        
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Used Cars</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {total} cars found{initialSearch ? ` for "${initialSearch}"` : ''}{initialCity ? ` in ${initialCity}` : ''}
            </p>
          </div>

          <Sheet>
            <SheetTrigger className="md:hidden flex items-center gap-1.5 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {Object.values(filters).some((v) => (Array.isArray(v) ? v.length > 0 : v !== null)) && (
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              )}
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
              <SheetHeader className="p-4 pb-0">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">
                <FilterSidebar facets={facets} filters={filters} onFiltersChange={setFilters} asDrawer />
              </div>
            </SheetContent>
          </Sheet>
        </div>

       
        <div className="flex items-center justify-end gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-gray-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="km_asc">KM: Low to High</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {(activeChips.length > 0 || initialSearch) && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {initialSearch && (
              <span className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                Search: {initialSearch}
                <button
                  onClick={() => router.push(initialCity ? `/cars?city=${encodeURIComponent(initialCity)}` : '/cars')}
                  className="text-amber-600 hover:text-amber-900 leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {initialCity && (
              <span className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
                City: {initialCity}
                <button
                  onClick={() => router.push(initialSearch ? `/cars?search=${encodeURIComponent(initialSearch)}` : '/cars')}
                  className="text-amber-600 hover:text-amber-900 leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {activeChips.map((chip) => (
              <span
                key={`${chip.key}-${chip.value}`}
                className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {chip.value}
                <button
                  onClick={() => removeChip(chip.key, chip.value)}
                  className="text-gray-400 hover:text-gray-700 leading-none"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-amber-500 text-sm font-medium hover:text-amber-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {cars.length === 0 && !loading ? (
          <div className="text-center py-24 text-gray-400">
            No cars match the selected filters.
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'flex flex-col gap-4'
              }
            >
              {isFiltering
                ? Array.from({ length: 9 }).map((_, i) => <CarCardSkeleton key={i} />)
                : cars.map((car) => <CarCard key={car.id} car={car} />)}
            </div>

           
            <div ref={sentinelRef} className="flex justify-center py-8">
              {loading && <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />}
            </div>

           
            {hasMore && !loading && (
              <div className="flex justify-center pb-8">
                <button
                  onClick={loadMore}
                  className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
