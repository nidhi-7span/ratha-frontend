import Image from "next/image";
import { ShieldCheck, Tag, CreditCard, Star } from "lucide-react";
import { getCars } from "@/services/carService";
import CarsListing from "@/components/cars/CarsListing";

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <>
      <section className="bg-[#111111] text-white">
        <div className="max-w-350 mx-auto px-6 py-10 flex items-center justify-between gap-8">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight">
              Find Your <span className="text-amber-400">Perfect Drive</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Quality used cars. Best prices. Trusted by thousands.
            </p>


            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-1.5 text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Verified Cars
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-300">
                <Tag className="w-4 h-4 text-amber-400" />
                Best Price
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-300">
                <CreditCard className="w-4 h-4 text-amber-400" />
                Easy Finance
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-300">
                <Star className="w-4 h-4 text-amber-400" />
                Ratha Assured
              </div>
            </div>
          </div>


          {cars.length > 0 && (
            <div className="hidden lg:block relative w-105 h-52.2 shrink-0">
              <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl" />
              <Image
                src="/car_top.webp"
                alt={cars[0].model}
                fill
                sizes="420px"
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
        <CarsListing cars={cars} />
      </div>
    </>
  );
}
