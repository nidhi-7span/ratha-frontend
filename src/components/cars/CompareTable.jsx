import Image from 'next/image'
import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'

const ROWS = [
  { label: 'Price', key: 'discounted_price', format: (v) => `₹${Number(v).toLocaleString()}`, best: 'min' },
  { label: 'Registration Year', key: 'registration_year', best: 'max' },
  { label: 'KM Driven', key: 'km_driven', format: (v) => `${Number(v).toLocaleString()} km`, best: 'min' },
  { label: 'Fuel Type', key: 'fuel_type' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Ownership', key: 'ownership' },
  { label: 'Engine', key: 'engine_cc', format: (v) => v ? `${v} cc` : '—' },
  { label: 'Power', key: 'power_bhp', format: (v) => v ? `${v} bhp` : '—', best: 'max' },
  { label: 'Torque', key: 'torque_bhp', format: (v) => v ? `${v} Nm` : '—', best: 'max' },
  { label: 'Mileage', key: 'mileage', format: (v) => v ? `${v} kmpl` : '—', best: 'max' },
  { label: 'Body Type', key: 'body_type', format: (v) => v || '—' },
  { label: 'Seating', key: 'seating_capacity', format: (v) => v ? `${v} seats` : '—' },
  { label: 'Colour', key: 'colour', format: (v) => v || '—' },
  { label: 'Fuel Tank', key: 'fuel_tank_capacity', format: (v) => v ? `${v} L` : '—' },
  { label: 'Insurance', key: 'insurance_status', format: (v) => v || '—' },
  { label: 'EMI / month', key: 'emi_per_month', format: (v) => `₹${Number(v).toLocaleString()}`, best: 'min' },
]

function getBestIndex(cars, row) {
  if (!row.best) return null
  const values = cars.map((c) => parseFloat(c[row.key]))
  if (values.some(isNaN)) return null
  const target = row.best === 'min' ? Math.min(...values) : Math.max(...values)
  const idx = values.indexOf(target)
  return values.filter((v) => v === target).length === 1 ? idx : null
}

export default function CompareTable({ cars }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-40 min-w-[140px] bg-gray-50 border border-gray-200 p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Specification
            </th>
            {cars.map((car) => (
              <th key={car.id} className="min-w-[200px] border border-gray-200 p-4 bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-full h-36 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={`https://directus-8b8q.onrender.com/assets/${car.image}`}
                      alt={car.model}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                      <Shield className="w-2.5 h-2.5 text-amber-400" />
                      Ratha Assured
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{car.model}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{car.brand?.name}</p>
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const bestIdx = getBestIndex(cars, row)
            return (
              <tr key={row.key} className="hover:bg-amber-50/30 transition-colors">
                <td className="border border-gray-200 p-4 bg-gray-50 text-xs font-semibold text-gray-600">
                  {row.label}
                </td>
                {cars.map((car, idx) => {
                  const raw = car[row.key]
                  const display = row.format ? row.format(raw) : (raw ?? '—')
                  const isBest = bestIdx === idx
                  return (
                    <td
                      key={car.id}
                      className={`border border-gray-200 p-4 text-sm text-center ${
                        isBest ? 'bg-green-50 font-semibold text-green-700' : 'text-gray-800'
                      }`}
                    >
                      {isBest && (
                        <span className="block text-[9px] font-bold text-green-600 uppercase tracking-wide mb-0.5">
                          Best
                        </span>
                      )}
                      {display}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
