import { getCarsPaged, getCarFacets } from "@/services/carService";
import CarsListing from "@/components/cars/CarsListing";

export const metadata = {
  title: 'Saved Cars – Ratha',
  description: 'View your saved and liked cars.',
}

export default async function SavedCarsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || '';
  const city = resolvedSearchParams?.city || '';
  const liked = 'liked'; // Always force 'liked' parameter

  const [{ data: initialCars, total }, facets] = await Promise.all([
    getCarsPaged({ filters: { liked }, sortBy: "newest", page: 1, search, city }),
    getCarFacets(),
  ]);

  return (
    <>
      <section className="bg-[#111111] text-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            Your <span className="text-amber-400">Saved Cars</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            All the cars you've liked and saved for later.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <CarsListing 
          initialCars={initialCars} 
          total={total} 
          facets={facets} 
          initialSearch={search} 
          initialCity={city} 
          initialLiked={liked} 
        />
      </div>
    </>
  );
}
