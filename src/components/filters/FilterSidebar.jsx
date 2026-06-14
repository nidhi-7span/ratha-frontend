"use client";
import { useState } from "react";
import { ChevronUp, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";

function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-3 border-t border-gray-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full"
      >
        <span className="font-semibold text-gray-800 text-sm">{title}</span>
        <ChevronUp
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${!open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ facets, filters, onFiltersChange, asDrawer = false }) {
  const [brandSearch, setBrandSearch] = useState("");

  const getBrand = (car) => car.brand?.name ?? car.model?.split(" ")[0];

  const brands = [...new Set(facets.map(getBrand).filter(Boolean))].sort();
  const fuelTypes = [...new Set(facets.map((c) => c.fuel_type))].sort();
  const transmissions = [...new Set(facets.map((c) => c.transmission))].sort();
  const bodyTypes = [...new Set(facets.map((c) => c.body_type))].sort();
  const ownership = [...new Set(facets.map((c) => c.ownership))].sort();
  
  // const registrationYears = [...new Set(facets.map((c) => c.registration_year))].sort((a, b) => b - a);
   const minRegistrationYear = facets.length > 0 ? Math.min(...facets.map((c) => c.registration_year)) : 2000;
   const maxRegistrationYear = facets.length > 0 ? Math.max(...facets.map((c) => c.registration_year)) : new Date().getFullYear();
   const currentYearRange = filters.registrationYears ?? [minRegistrationYear, maxRegistrationYear];

  // const kmDriven = [...new Set(facets.map((c) => c.km_driven))].sort((a, b) => a - b);
  const minKmDriven = facets.length > 0 ? Math.min(...facets.map((c) => c.km_driven)) : 0;
  const maxKmDriven = facets.length > 0 ? Math.max(...facets.map((c) => c.km_driven)) : 100000;
  const currentKmRange = filters.kmDriven ?? [minKmDriven, maxKmDriven];

  const minPrice = facets.length > 0 ? Math.min(...facets.map((c) => c.discounted_price)) : 0;
  const maxPrice = facets.length > 0 ? Math.max(...facets.map((c) => c.discounted_price)) : 1000000;
  const currentPriceRange = filters.priceRange ?? [minPrice, maxPrice];

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const count = (arr, pred) => arr.filter(pred).length;

  const toggle = (key, value) => {
    const curr = filters[key] ?? [];
    onFiltersChange({
      ...filters,
      [key]: curr.includes(value)
        ? curr.filter((v) => v !== value)
        : [...curr, value],
    });
  };

  const clearAll = () =>
    onFiltersChange({
      priceRange: null,
      brands: [],
      fuelTypes: [],
      transmissions: [],
      bodyTypes: [],
      ownerTypes: [],
      registrationYears: null,
      kmDriven: null,
    });

  const content = (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-gray-900 text-base">Filters</h2>
          <button
            onClick={clearAll}
            className="text-amber-500 text-sm font-medium hover:text-amber-600 transition-colors"
          >
            Clear all
          </button>
        </div>

        <Section title="Price Range (₹)">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{currentPriceRange[0].toLocaleString()}</span>
              <span>₹{currentPriceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              min={minPrice}
              max={maxPrice}
              value={currentPriceRange}
              onValueChange={(val) =>
                onFiltersChange({ ...filters, priceRange: val })
              }
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>₹{Math.round(minPrice / 100000)}L</span>
              <span>₹{Math.round(maxPrice / 100000)}L</span>
            </div>
          </div>
        </Section>

        <Section title="Brands">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search brand"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="space-y-2.5">
            {filteredBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(filters.brands ?? []).includes(brand)}
                  onChange={() => toggle("brands", brand)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {brand}{" "}
                  <span className="text-gray-400">
                    ({count(facets, (c) => getBrand(c) === brand)})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Fuel Type">
          <div className="space-y-2.5">
            {fuelTypes.map((fuel) => (
              <label
                key={fuel}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(filters.fuelTypes ?? []).includes(fuel)}
                  onChange={() => toggle("fuelTypes", fuel)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {fuel}{" "}
                  <span className="text-gray-400">
                    ({count(facets, (c) => c.fuel_type === fuel)})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Transmission">
          <div className="space-y-2.5">
            {transmissions.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(filters.transmissions ?? []).includes(t)}
                  onChange={() => toggle("transmissions", t)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {t}{" "}
                  <span className="text-gray-400">
                    ({count(facets, (c) => c.transmission === t)})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Body Type">
          <div className="space-y-2.5">
            {bodyTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(filters.bodyTypes ?? []).includes(type)}
                  onChange={() => toggle("bodyTypes", type)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {type}{" "}
                  <span className="text-gray-400">
                    ({count(facets, (c) => c.body_type === type)})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Ownership">
          <div className="space-y-2.5">
            {ownership.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={(filters.ownerTypes ?? []).includes(type)}
                  onChange={() => toggle("ownerTypes", type)}
                  className="w-4 h-4 accent-amber-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {type}{" "}
                  <span className="text-gray-400">
                    ({count(facets, (c) => c.ownership === type)})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </Section>

        
        <Section title="Registration Year">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentYearRange[0]}</span>
              <span>{currentYearRange[1]}</span>
            </div>
            <Slider
              min={minRegistrationYear}
              max={maxRegistrationYear}
              value={currentYearRange}
              onValueChange={(val) =>
                onFiltersChange({ ...filters, registrationYears: val })
              }
            />
          </div>
        </Section>


        <Section title="Kilometers Driven">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentKmRange[0]} km</span>
              <span>{currentKmRange[1]} km</span>
            </div>
            <Slider
              min={minKmDriven}
              max={maxKmDriven}
              value={currentKmRange}
              onValueChange={(val) =>
                onFiltersChange({ ...filters, kmDriven : val })
              }
            />
          </div>  
          </Section>
      </div>
  )

  if (asDrawer) return content

  return (
    <aside className="hidden md:block w-60 shrink-0 self-start sticky top-4 max-h-[calc(100vh-1rem)] overflow-y-auto scrollbar-thin">
      {content}
    </aside>
  )
}
