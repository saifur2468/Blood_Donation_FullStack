'use client'
import React, { useEffect, useState } from 'react';
import { showToast } from "@/components/ui/toast";

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

const FindDonorsPage = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [debouncedLocation, setDebouncedLocation] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 


  useEffect(() => {
    const t = setTimeout(() => setDebouncedLocation(location.trim()), 500);
    return () => clearTimeout(t);
  }, [location]);

  useEffect(() => {
    setCurrentPage(1);
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

  // Pagination Calculations
  const totalPages = Math.ceil(donors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonors = donors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">All Available Donors</h2>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Blood Group Filter */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
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

        {/* Location Filter */}
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Location / City</label>
          <input
            type="text"
            placeholder="e.g. Dhaka, Gazipur"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-4 mb-4 text-red-600 font-medium bg-red-50 rounded-lg">{error}</div>
      )}

      {/* Donors Grid */}
      {loading ? (
        <div className="text-center py-10 text-lg font-semibold">Loading donors...</div>
      ) : !error && donors.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-semibold">
          No donors found matching your criteria.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDonors.map((donor, index) => (
              <div
                key={donor.id ?? donor._id ?? index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{donor.fullName}</h3>
                    <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm">
                      {BLOOD_LABELS[donor.bloodGroup ?? ''] || donor.bloodGroup || 'N/A'}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-600 text-sm">
                    <p>
                      <span className="font-semibold">Email:</span> {donor.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {donor.phoneNumber || 'Not Provided'}
                    </p>
                    <p>
                      <span className="font-semibold">City/Location:</span> {donor.city || 'Not Provided'}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{' '}
                      <span
                        className={donor.isAvailable ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}
                      >
                        {donor.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!donor.phoneNumber}
                    onClick={() => {
                      if (donor.phoneNumber) {
                        showToast(`Calling donor at: ${donor.phoneNumber}`, 'success');
                      } else {
                        showToast('Phone number not available!', 'error');
                      }
                    }}
                  >
                    Contact Donor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-100'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FindDonorsPage;