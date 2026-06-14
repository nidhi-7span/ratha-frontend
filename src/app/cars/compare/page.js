import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCarsByIds } from '@/services/carService'
import CompareTable from '@/components/cars/CompareTable'

export const metadata = {
  title: 'Compare Cars Side by Side',
  description:
    'Compare used cars side by side on Ratha. View specifications, pricing, mileage, and more to make an informed buying decision.',
  robots: {
    index: false,
    follow: true,
  },
}

export default async function ComparePage({ searchParams }) {
  const { ids: rawIds = '' } = await searchParams
  const ids = rawIds
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

  if (ids.length < 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">Select at least 2 cars to compare.</p>
        <Link
          href="/cars"
          className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listing
        </Link>
      </div>
    )
  }

  const cars = await getCarsByIds(ids)

  if (!cars || cars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">Could not load cars for comparison.</p>
        <Link
          href="/cars"
          className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listing
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cars"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Listing
          </Link>
          <div className="h-4 w-px bg-gray-300" aria-hidden="true" />
          <h1 className="text-xl font-bold text-gray-900">
            Comparing {cars.length} Cars
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <CompareTable cars={cars} />
        </div>
      </div>
    </div>
  )
}
