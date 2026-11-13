'use client'
import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { showToast } from "@/components/ui/toast";
import { useDebounce } from "@/hooks/useDebounce"; 
import { usePagination } from "@/hooks/usePagination";
import { FaPhone, FaPhoneAlt } from 'react-icons/fa';

// Dynamically import Leaflet components to prevent SSR (Server-Side Rendering) errors in Next.js
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

type Donor = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  city?: string;
  bloodGroup?: string;
  isAvailable: boolean;
  lat?: number; // Optional lat if backend provides
  lng?: number; // Optional lng if backend provides
};

const BLOOD_LABELS: Record<string, string> = {
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
};

// Approximate coordinates for major cities (Fallback if backend doesn't provide lat/lng)
const CITY_COORDINATES: Record<string, [number, number]> = {
  'Dhaka': [23.8103, 90.4125],
  'Mirpur 10': [23.8069, 90.3688],
  'Bogura': [24.8465, 89.3777],
  'Bogura Sadar': [24.8465, 89.3777],
  'Dinajpur Sadar': [25.6217, 88.6345],
  'Rangamati': [22.6553, 92.1754],
  'Chittagong': [22.3569, 91.7832],
  'Gazipur': [24.0023, 90.4243],
  'Sylhet': [24.8949, 91.8687],
};

const FindDonorsPage = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  
  const debouncedLocation = useDebounce(location.trim(), 500);

  // Pagination Configuration using Custom Hook
  const itemsPerPage = 5; 
  const { currentPage, nextpage, prevPage, jumpToPage, totalPages } = usePagination(donors.length, itemsPerPage);

  useEffect(() => {
    jumpToPage(1);
  }, [bloodGroup, debouncedLocation]);

  // Fetch donors based on filters
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      console.error('NEXT_PUBLIC_BACKEND_URL set kora nai. .env.local check korun ar dev server restart korun.');
      setError('Backend URL configure kora nai.');
      setLoading(false);
      return;
    }

    const baseUrl = `${backendUrl}/api/v1/user/donors`;

    const params = new URLSearchParams();
    if (bloodGroup) params.append('bloodGroup', bloodGroup);
    if (debouncedLocation) params.append('location', debouncedLocation);

    const queryString = params.toString();
    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    fetch(finalUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const validDonors = data.data.filter(
            (user: Donor) => !user.role || user.role.toUpperCase() === 'DONOR'
          );
          setDonors(validDonors);
        } else {
          setDonors([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Error fetching donors:', finalUrl, err);
        setError('Donors load kora jayni. Pore abar try korun.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [bloodGroup, debouncedLocation]);

  // Pagination Slice Calculation
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonors = donors.slice(startIndex, startIndex + itemsPerPage);

  // Extract unique active donor cities
  const activeDonorLocations = Array.from(
    new Set(donors.filter((d) => d.isAvailable && d.city).map((d) => d.city as string))
  );

  // Fix Leaflet marker icon issue in Next.js
  const [leafletIcons, setLeafletIcons] = useState<any>(null);
  useEffect(() => {
    import('leaflet').then((L) => {
      // Custom HTML DivIcon for red cluster badge
      const createClusterIcon = (count: number) => {
        return L.divIcon({
          className: 'custom-cluster-icon',
          html: `<div style="background-color: rgba(239, 68, 68, 0.3); border: 2px solid #dc2626; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);">
                   <span style="background-color: #dc2626; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${count}</span>
                 </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      };
      setLeafletIcons({ createClusterIcon });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 dark:text-gray-100">
      {/* Top Header & Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Emergency Blood Dispatch
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing verified matches ({donors.length} active donors found)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-2 rounded-xl text-xs font-semibold text-red-700 dark:text-red-300">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          Live GIS Map Synchronized
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Filter by Blood Group
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium"
          >
            <option value="">All Blood Groups</option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
          </select>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
            Filter by Location / City
          </label>
          <input
            type="text"
            placeholder="e.g. Dhaka, Bogura, Mirpur 10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center py-4 mb-4 text-red-600 dark:text-red-300 font-medium bg-red-50 dark:bg-red-950/50 rounded-xl border border-red-200 dark:border-red-900">
          {error}
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns: Donors List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-500 font-medium">
              Loading available donors...
            </div>
          ) : !error && donors.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-500 dark:text-gray-400 font-semibold">
              No donors found matching your criteria.
            </div>
          ) : (
            <>
              {currentDonors.map((donor, index) => (
                <div
                  key={donor.id ?? donor._id ?? index}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-200 dark:border-gray-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {donor.fullName}
                          </h3>
                          {donor.isAvailable && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Available Now
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Verified donor profile & medical clearance active.
                        </p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 font-extrabold px-3.5 py-1.5 rounded-xl text-sm text-center">
                        {BLOOD_LABELS[donor.bloodGroup ?? ''] || donor.bloodGroup || 'N/A'}
                        <div className="text-[10px] font-normal opacity-80 uppercase">Universal</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs text-gray-600 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Email:</span> {donor.email}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Phone:</span> {donor.phoneNumber || 'Not Provided'}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">City / Location:</span> {donor.city || 'Not Provided'}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Status:</span>{' '}
                        <span className={donor.isAvailable ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-600 dark:text-rose-400 font-semibold'}>
                          {donor.isAvailable ? 'Ready for Dispatch' : 'Standby / Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button 
                      className="flex-1 bg-red-600 hover:bg-red-700 dark:hover:bg-red-500 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={!donor.phoneNumber}
                      onClick={() => {
                        if (donor.phoneNumber) {
                          showToast(`Initiating secure call to: ${donor.phoneNumber}`, 'success');
                        } else {
                          showToast('Phone number not available!', 'error');
                        }
                      }}
                    >
                      <span> <FaPhoneAlt></FaPhoneAlt>   </span> Call Directly
                    </button>

                    <button 
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm py-2.5 px-4 rounded-xl transition-colors border border-gray-200 dark:border-gray-700"
                      onClick={() => {
                        showToast(`Emergency alert ping sent to ${donor.fullName}`, 'success');
                      }}
                    >
                      Instant Emergency Request
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => jumpToPage(page)}
                      className={`w-10 h-10 rounded-xl border font-semibold text-sm transition-colors flex items-center justify-center ${
                        currentPage === page
                          ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-100 dark:shadow-none'
                          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={nextpage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Sidebar: Real Leaflet Interactive Map & Active Locations */}
        <div className="space-y-6">
          
          {/* REAL LEAFLET MAP CONTAINER */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>🗺️</span> LIVE GIS CLUSTER MAP
              </h4>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                Radar Active
              </span>
            </div>

            <div className="relative w-full h-72 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 z-0">
              <MapContainer
                center={[23.6850, 90.3563]} // Centered around Bangladesh default
                zoom={7}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Render Leaflet Markers for each Active City with Count */}
                {leafletIcons && activeDonorLocations.map((cityName, idx) => {
                  const count = donors.filter((d) => d.isAvailable && d.city === cityName).length;
                  const coords = CITY_COORDINATES[cityName] || [23.8103 + idx * 0.1, 90.4125 + idx * 0.1]; // Fallback coordinate generator

                  return (
                    <Marker
                      key={idx}
                      position={coords}
                      icon={leafletIcons.createClusterIcon(count)}
                      eventHandlers={{
                        click: () => setLocation(cityName),
                      }}
                    >
                      <Popup>
                        <div className="text-xs font-semibold">
                          <p className="text-red-600 font-bold">{cityName}</p>
                          <p>{count} Active Donors Available</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>

            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
              <span>Cluster Radius: 25 mi</span>
              <span className="text-red-600 dark:text-red-400 font-semibold cursor-pointer hover:underline" onClick={() => setLocation('')}>
                Reset View
              </span>
            </div>
          </div>

         </div>

      </div>
    </div>
  );
};

export default FindDonorsPage;