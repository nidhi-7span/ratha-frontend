import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Phone,
  Share2,
  Heart,
  GitCompare,
  Calendar,
  Gauge,
  Zap,
  RefreshCw,
  Fuel,
  Settings2,
  Users,
  Droplets,
  CheckCircle,
  User,
  Milestone,
  Building2,
  Palette,
  Car,
} from "lucide-react";
import { getCarById } from "@/services/carService";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/cars/ShareButton";

function SpecItem({ Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default async function CarDetailPage({ params }) {
  const { id } = await params;
  const car = await getCarById(id);

  const brandName = car.brand?.name ?? car.model.split(" ")[0];
  const discountPct = Math.round(
    ((car.original_price - car.discounted_price) / car.original_price) * 100,
  );
  const emi = parseInt(car.emi_per_month);
  const insuranceDate = car.insurance_expiry_date
    ? new Date(car.insurance_expiry_date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-350 mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <Link href="/cars" className="hover:text-gray-700">
            Used Cars
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span>{brandName}</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-900 font-medium">{car.model}</span>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 items-start">
         
         
          <div className="space-y-6">
            <Image
              src={`https://directus-8b8q.onrender.com/assets/${car.image}`}
              alt={car.model}
              width={600}
              height={400}
              className="w-full h-auto rounded-xl object-contain bg-gray-100"
            />

            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <SpecItem
                  Icon={Gauge}
                  label="Engine"
                  value={car.engine_cc ? `${car.engine_cc} cc` : null}
                />
                <SpecItem
                  Icon={Zap}
                  label="Power"
                  value={car.power_bhp ? `${car.power_bhp} bhp` : null}
                />
                <SpecItem
                  Icon={RefreshCw}
                  label="Torque"
                  value={car.torque_bhp ? `${car.torque_bhp} Nm` : null}
                />
                <SpecItem Icon={Fuel} label="Fuel Type" value={car.fuel_type} />
                <SpecItem
                  Icon={Gauge}
                  label="Mileage"
                  value={car.mileage ? `${car.mileage} kmpl` : null}
                />
                <SpecItem
                  Icon={Settings2}
                  label="Transmission"
                  value={car.transmission}
                />
                <SpecItem Icon={Car} label="Body Type" value={car.body_type} />
                <SpecItem
                  Icon={Users}
                  label="Seating Capacity"
                  value={
                    car.seating_capacity
                      ? `${car.seating_capacity} Seater`
                      : null
                  }
                />
                <SpecItem
                  Icon={Droplets}
                  label="Fuel Tank"
                  value={
                    car.fuel_tank_capacity
                      ? `${car.fuel_tank_capacity} L`
                      : null
                  }
                />
                <SpecItem
                  Icon={Calendar}
                  label="Registration Year"
                  value={car.registration_year?.toString()}
                />
                <SpecItem
                  Icon={CheckCircle}
                  label="Insurance Status"
                  value={car.insurance_status}
                />
                <SpecItem
                  Icon={Shield}
                  label="Insurance Expiry"
                  value={insuranceDate}
                />
                <SpecItem Icon={User} label="Ownership" value={car.ownership} />
                <SpecItem
                  Icon={Milestone}
                  label="KMs Driven"
                  value={`${car.km_driven.toLocaleString()} km`}
                />
                <SpecItem Icon={Building2} label="City" value={car.city} />
                <SpecItem Icon={Palette} label="Colour" value={car.colour} />
              </div>

              {car.description && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    About this car
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {car.description}
                  </p>
                </div>
              )}
            </div>
          </div>


          <div className="sticky top-6 self-start">
            <div className="border border-gray-200 rounded-xl p-6 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-amber-100 text-amber-600 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>

                <span className="text-lg font-extrabold tracking-wider text-blue-700 uppercase">
                  {brandName}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                {brandName} {car.model}
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                {car.registration_year} • {car.fuel_type} • {car.transmission} •{" "}
                {car.km_driven.toLocaleString()} km
              </p>

              <p className="text-gray-500 text-sm">{car.ownership}</p>

              <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{car.discounted_price.toLocaleString()}
                </span>

                <span className="text-base text-gray-400 line-through">
                  ₹{car.original_price.toLocaleString()}
                </span>

                <span className="text-green-600 font-bold">
                  {discountPct}% OFF
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
                EMI starts at
                <span className="font-semibold text-gray-800">
                  ₹{emi.toLocaleString()}/mo
                </span>
              </p>

              <div className="mt-4 border border-amber-200 bg-amber-50 rounded-xl px-4 py-3 flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-500 shrink-0" />

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Ratha Assured
                  </p>

                  <p className="text-xs text-gray-500">
                    167 Point Inspection • No Accident History • RC Verified
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Button className="w-full bg-gray-900 text-white py-6 rounded-xl font-semibold hover:bg-gray-700 text-lg">
                  <Phone className="w-4 h-4" />
                  Book Test Drive
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <Button variant="outline">
                  <GitCompare className="w-4 h-4" />
                  Compare
                </Button>

                <ShareButton />

                <Button variant="outline">
                  <Heart className="w-4 h-4" />
                  Save
                </Button>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 space-y-4 mt-6">
                <h3 className="font-bold text-gray-900">Need Help?</h3>

                <p className="text-gray-500 text-xs">
                  Our experts are here to help you
                </p>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />

                  <span className="font-bold text-lg text-gray-900">
                    +91 98765 43210
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  Mon - Sat (9:00 AM - 8:00 PM)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
