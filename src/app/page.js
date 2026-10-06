import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { getCarsPaged } from '@/services/carService';
import CarCard from '@/components/cars/carCard';

export default async function Home() {
  const { data: cars } = await getCarsPaged({ limit: 3 });

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-400 selection:text-black font-sans">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Premium Used Cars
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6">
            Find Your Dream Car
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Without the Hassle
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-10">
            Verified, 167-point inspected used cars with transparent pricing and
            easy EMI options. Your smooth journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
            <Link
              href="/cars"
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Featured Cars
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our top picks of verified used cars. Handpicked for quality
              and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors"
            >
              View All Cars
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
// checking is ssh works now again