'use client'
import { useState, useMemo } from 'react'
import { LayoutGrid, List, ChevronDown } from 'lucide-react'
import CarCard from './carCard'
import FilterSidebar from '../filters/FilterSidebar'

export default function CarsListing({ cars }) {
  const [filters, setFilters] = useState({
    priceRange: null,
    brands: [],
    fuelTypes: [],
    transmissions: [],
    bodyTypes: [],
    ownerTypes: [],
    registrationYears: null,
    kmDriven: null
  })
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')

  const getBrand = car => car.brand?.name ?? car.model.split(' ')[0]

  const filtered = useMemo(() => {
    let result = [...cars]

    if (filters.priceRange) {
      const [lo, hi] = filters.priceRange
      result = result.filter(c => c.discounted_price >= lo && c.discounted_price <= hi)
    }
    if (filters.brands.length > 0) {
      result = result.filter(c => filters.brands.includes(getBrand(c)))
    }
    if (filters.fuelTypes.length > 0) {
      result = result.filter(c => filters.fuelTypes.includes(c.fuel_type))
    }
    if (filters.transmissions.length > 0) {
      result = result.filter(c => filters.transmissions.includes(c.transmission))
    }
    if(filters.bodyTypes.length > 0) {
      result = result.filter(c => filters.bodyTypes.includes(c.body_type))
    }
    if(filters.ownerTypes.length > 0) {
      result = result.filter(c => filters.ownerTypes.includes(c.ownership))
    }
    if(filters.registrationYears && filters.registrationYears.length === 2) {
      const [lo, hi] = filters.registrationYears
      result = result.filter(c => c.registration_year >= lo && c.registration_year <= hi)
    }
    if(filters.kmDriven && filters.kmDriven.length === 2) {
      const [lo, hi] = filters.kmDriven
      result = result.filter(c => c.km_driven >= lo && c.km_driven <= hi)
    }

    switch (sortBy) {
      case 'price_asc':  result.sort((a, b) => a.discounted_price - b.discounted_price); break
      case 'price_desc': result.sort((a, b) => b.discounted_price - a.discounted_price); break
      case 'km_asc':     result.sort((a, b) => a.km_driven - b.km_driven); break
      case 'newest':     result.sort((a, b) => b.registration_year - a.registration_year); break
    }

    return result
  }, [cars, filters, sortBy])

  const activeChips = [
    ...filters.brands.map(v => ({ key: 'brands', value: v })),
    ...filters.fuelTypes.map(v => ({ key: 'fuelTypes', value: v })),
    ...filters.transmissions.map(v => ({ key: 'transmissions', value: v })),
    ...filters.bodyTypes.map(v => ({ key: 'bodyTypes', value: v })),
    ...filters.ownerTypes.map(v => ({ key: 'ownerTypes', value: v }))
  ]

  const removeChip = (key, value) =>
    setFilters(f => ({ ...f, [key]: f[key].filter(v => v !== value) }))

  const clearAll = () =>
    setFilters({ priceRange: null, brands: [], fuelTypes: [], transmissions: [], bodyTypes: [], ownerTypes: [], registrationYears: null, kmDriven: null })

  return (
    <div className="max-w-350 mx-auto px-6 py-8 flex gap-6 items-start">
      <FilterSidebar cars={cars} filters={filters} onFiltersChange={setFilters} />

      <div className="flex-1 min-w-0">
        
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Used Cars</h1>
            {/* <p className="text-gray-500 text-sm mt-0.5">{filtered.length} cars found</p> */}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e=>setSortBy(e.target.value)}
                 className="appearance-none border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white focus:outline-none">
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
        </div>

       
        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {activeChips.map(chip => (
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

       
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            No cars match the selected filters.
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'flex flex-col gap-4'
            }
          >
            {filtered.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
