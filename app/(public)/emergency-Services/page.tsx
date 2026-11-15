
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  Droplet,
  Ambulance,
  LifeBuoy,
} from "lucide-react";

type Category = "blood" | "ambulance" | "emergency";

const services = [
  {
    id: 1,
    name: "Quantum Foundation Blood Lab",
    category: "blood" as Category,
    description:
      "One of Bangladesh's largest voluntary blood banks, providing 24-hour blood testing and component separation services.",
    location: "11/1 Shantinagar, Dhaka",
    phone: "+88029351000",
  },
  {
    id: 2,
    name: "Red Crescent Blood Center",
    category: "blood" as Category,
    description:
      "Operated by the Bangladesh Red Crescent Society, providing voluntary blood collection, testing, and supply services.",
    location: "7/5 Aurangzeb Road, Mohammadpur, Dhaka",
    phone: "+88029116563",
  },
  {
    id: 3,
    name: "Sandhani Central Office",
    category: "blood" as Category,
    description:
      "A leading voluntary organization operated by medical students, supporting blood donation and eye donation programs.",
    location: "Dhaka Medical College Hospital, Dhaka",
    phone: "+8801711132532",
  },
  {
    id: 4,
    name: "Anwar Khan Modern Ambulance Service",
    category: "ambulance" as Category,
    description:
      "Provides 24/7 standard and advanced ambulance services with ventilator support and trained paramedics.",
    location: "Dhanmondi, Dhaka",
    phone: "+8801713377777",
  },
  {
    id: 5,
    name: "Al-Amin Ambulance Service",
    category: "ambulance" as Category,
    description:
      "A fast-response private ambulance network offering oxygen support, freezer ambulance services, and critical patient transportation.",
    location: "Available Across Dhaka",
    phone: "+8801720448666",
  },
  {
    id: 6,
    name: "National Emergency Service (999)",
    category: "emergency" as Category,
    description:
      "A government toll-free emergency number providing quick access to ambulance, fire service, and police assistance.",
    location: "Government of Bangladesh",
    phone: "999",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Blood Banks", value: "blood" },
  { label: "Ambulance", value: "ambulance" },
  { label: "Emergency Support", value: "emergency" },
];

const categoryStyles = {
  blood: {
    label: "Blood Bank",
    icon: Droplet,
    border: "border-red-200",
    badge: "bg-red-50 text-red-600 border-red-100",
  },
  ambulance: {
    label: "Ambulance",
    icon: Ambulance,
    border: "border-amber-200",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
  },
  emergency: {
    label: "Emergency Support",
    icon: LifeBuoy,
    border: "border-blue-200",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
};

export default function EmergencyServices() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        activeFilter === "all" ||
        service.category === activeFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        service.name.toLowerCase().includes(searchText) ||
        service.description.toLowerCase().includes(searchText) ||
        service.location.toLowerCase().includes(searchText) ||
        service.phone.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <main className="min-h-screen bg-[#f6f9fc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Search & Filter Section */}
        <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.06)] sm:p-6">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by center name or address..."
                className="h-11 w-full rounded-full border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    activeFilter === filter.value
                      ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-200"
                      : "border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-500">
            Showing {filteredServices.length} services
          </p>
        </div>

        {/* Service Cards */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filteredServices.map((service) => {
              const style = categoryStyles[service.category];
              const CategoryIcon = style.icon;

              return (
                <article
                  key={service.id}
                  className={`flex flex-col rounded-2xl border ${style.border} bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]`}
                >

                  {/* Category Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${style.badge}`}
                    >
                      <CategoryIcon className="h-3.5 w-3.5" />
                      {style.label}
                    </span>
                  </div>

                  {/* Service Information */}
                  <div className="mt-3 flex-1">

                    <h2 className="text-[17px] font-bold leading-snug text-slate-900">
                      {service.name}
                    </h2>

                    <p className="mt-2 text-[13px] leading-[1.8] text-slate-500">
                      {service.description}
                    </p>

                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-slate-100" />

                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                    <p className="text-xs leading-relaxed text-slate-500">
                      {service.location}
                    </p>
                  </div>

                  {/* Phone & Hotline */}
                  <div className="mt-3 flex items-center justify-between gap-2">

                    <span className="text-xs font-medium text-slate-400">
                      Hotline
                    </span>

                    <a
                      href={`tel:${service.phone}`}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {service.phone}
                    </a>

                  </div>

                </article>
              );
            })}

          </div>
        ) : (

          /* Empty Search Result */
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <Search className="h-6 w-6 text-red-500" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No Services Found!
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different name, address, or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="mt-5 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              View All Services
            </button>

          </div>
        )}

      </div>
    </main>
  );
}
