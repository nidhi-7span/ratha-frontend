import Image from "next/image";
import { ShieldCheck, Tag, CreditCard, Star } from "lucide-react";
import { getCarsPaged, getCarFacets } from "@/services/carService";
import CarsListing from "@/components/cars/CarsListing";

export const metadata = {
  title: 'Browse Used Cars – Verified & Inspected',
  description:
    'Explore our curated collection of verified used cars. Filter by brand, fuel type, transmission, price, and more. Every car is 167-point inspected with easy EMI options.',
  alternates: {
    canonical: '/cars',
  },
  openGraph: {
    title: 'Browse Used Cars – Verified & Inspected | Ratha',
    description:
      'Explore our curated collection of verified used cars. Filter by brand, fuel type, transmission, price, and more.',
    url: '/cars',
  },
}

export default async function CarsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';
  const city = resolvedSearchParams?.city || '';

  const [{ data: initialCars, total }, facets] = await Promise.all([
    getCarsPaged({ filters: {}, sortBy: "newest", page: 1, search, city }),
    getCarFacets(),
  ]);

  return (
    <>
      <section className="bg-[#111111] text-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="w-full max-w-lg">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
              Find Your <span className="text-amber-400">Perfect Drive</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Quality used cars. Best prices. Trusted by thousands.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 mt-5 sm:mt-6">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                Verified Cars
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
                <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                Best Price
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
                <CreditCard className="w-4 h-4 text-amber-400 shrink-0" />
                Easy Finance
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                Ratha Assured
              </div>
            </div>
          </div>

          {total > 0 && (
            <div className="hidden lg:block relative w-full max-w-[420px] h-[210px] shrink-0">
              <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl" />
              <Image
                src="/car_top.webp"
                alt="Featured car on Ratha – used car marketplace"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 0 32px rgba(251,191,36,0.25))",
                }}
                priority
              />
            </div>
          )}
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <CarsListing initialCars={initialCars} total={total} facets={facets} initialSearch={search} initialCity={city} />
      </div>
    </>
  );
}
