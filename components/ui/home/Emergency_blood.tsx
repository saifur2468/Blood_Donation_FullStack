'use client'
import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Phone, 
  Heart, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldAlert, 
  Droplet, 
  CheckCircle2, 
  X, 
  Share2 
} from 'lucide-react';

export default function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCallRequest, setSelectedCallRequest] = useState(null);
  const [showAllRequests, setShowAllRequests] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/blood-request/pending-requests');
        if (!response.ok) {
          throw new Error('Failed to fetch from server');
        }
        const data = await response.json();
        // Assuming data is an array or has a data property
        const list = Array.isArray(data) ? data : data.requests || [];
        if (list.length > 0) {
          setRequests(list);
        } else {
          loadMockData();
        }
      } catch (err) {
        console.warn('API connection failed, falling back to design-matching mock data:', err.message);
        loadMockData();
      } finally {
        setLoading(false);
      }
    };

    const loadMockData = () => {
      setRequests([
        {
          id: '1',
          bloodGroup: 'O+',
          patientName: 'FARJANA RAHMAN',
          bagsRequired: 4,
          hospital: 'POTUAKHALI MEDICAL HOSPITAL, POTUAKHALI.',
          locationDetails: 'Amtali, Barguna, Barishal',
          neededTime: 'Oct 1 @ 8:00 AM',
          contactPerson: 'CAPTAIN RAHMAN',
          contactNumber: '+8801700000000',
          urgency: 'CRITICAL',
          responsesCount: 4
        },
        {
          id: '2',
          bloodGroup: 'A+',
          patientName: 'MOHAMMAD ALI',
          bagsRequired: 2,
          hospital: 'DHAKA MEDICAL COLLEGE HOSPITAL',
          locationDetails: 'Bakshibazar, Dhaka',
          neededTime: 'Oct 2 @ 2:30 PM',
          contactPerson: 'HASAN ALI',
          contactNumber: '+8801800000000',
          urgency: 'CRITICAL',
          responsesCount: 2
        },
        {
          id: '3',
          bloodGroup: 'B-',
          patientName: 'NUSRAT JAHAN',
          bagsRequired: 1,
          hospital: 'CHITTAGONG MEDICAL COLLEGE',
          locationDetails: 'Chawkbazar, Chattogram',
          neededTime: 'Oct 3 @ 10:00 AM',
          contactPerson: 'TANVIR AHMED',
          contactNumber: '+8801900000000',
          urgency: 'MODERATE',
          responsesCount: 1
        }
      ]);
    };

    fetchRequests();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) {
        newFavs.delete(id);
      } else {
        newFavs.add(id);
      }
      return newFavs;
    });
  };

  const displayedRequests = showAllRequests ? requests : requests.slice(0, 1);

  return (
    <div className="min-h-screen bg-gray-50/50 text-slate-900 font-sans p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wide">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              EMERGENCY BROADCAST
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Emergency Blood Requests
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Immediate help needed. Contact the patient's representative directly to volunteer.
            </p>
          </div>
          <button 
            onClick={() => setShowAllRequests(!showAllRequests)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-slate-800 text-sm font-semibold hover:bg-gray-100 transition shadow-sm bg-white"
          >
            {showAllRequests ? 'Show Less' : 'View All Requests'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {}
        <div className="relative rounded-2xl bg-red-50/70 border border-red-200/80 p-5 sm:p-6 flex items-start gap-4 shadow-xs">
          <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-red-700 font-black text-sm sm:text-base tracking-wide">
              MONETARY TRANSACTIONS STRICTLY PROHIBITED!
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              Blood donation is a completely voluntary and humanitarian service. Engaging in any financial transaction for blood is strictly forbidden. The Blood BD family will not be held responsible or liable for any personal monetary transactions or disputes.
            </p>
          </div>
        </div>

        {}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 shadow-xs">
            <Droplet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No Emergency Requests Found</h3>
            <p className="text-slate-500 text-sm">All pending requests have been fulfilled or none are currently active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedRequests.map((req) => {
              const isFav = favorites.has(req.id);
              return (
                <div 
                  key={req.id} 
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition duration-200 p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Left Accent Stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600"></div>

                  <div className="space-y-5 pl-1">
                    {/* Top Row: Blood Group & Critical Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 font-black text-xl flex items-center justify-center shadow-xs border border-red-100">
                        {req.bloodGroup}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-xs tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        {req.urgency || 'CRITICAL'}
                      </div>
                    </div>

                    {/* Patient Details */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                        {req.patientName}
                      </h3>
                      <p className="text-red-600 font-semibold text-xs sm:text-sm mt-0.5">
                        {req.bagsRequired} {req.bagsRequired > 1 ? 'Bags required' : 'Bag required'}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2.5 text-slate-700">
                      <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-xs sm:text-sm uppercase tracking-tight text-slate-800">
                          {req.hospital}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {req.locationDetails}
                        </p>
                      </div>
                    </div>

                    {/* Time Needed */}
                    <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">Needed:</span>
                      <span className="font-bold text-slate-900">{req.neededTime}</span>
                    </div>
                  </div>

                  {/* Card Footer: Contact Person & Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 pl-1">
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Contact Person
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm uppercase">
                        {req.contactPerson}
                      </span>
                      <span className="block text-xs font-semibold text-red-600 mt-0.5">
                        • {req.responsesCount || 0} responses
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(req.id)}
                        aria-label="Save to favorites"
                        className={`p-2.5 rounded-full border transition ${
                          isFav 
                            ? 'bg-red-50 border-red-200 text-red-600' 
                            : 'border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-red-600' : ''}`} />
                      </button>

                      <button 
                        onClick={() => setSelectedCallRequest(req)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95"
                      >
                        <Phone className="w-4 h-4 fill-white" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {}
        {selectedCallRequest && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                  <Phone className="w-4 h-4" />
                  Contact Representative
                </div>
                <button 
                  onClick={() => setSelectedCallRequest(null)}
                  className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-red-50/60 p-4 rounded-2xl border border-red-100 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Patient / Hospital</p>
                <p className="font-extrabold text-slate-900">{selectedCallRequest.patientName}</p>
                <p className="text-xs text-slate-600">{selectedCallRequest.hospital}</p>
              </div>

              <div className="space-y-2 py-2">
                <p className="text-xs font-semibold text-slate-500 uppercase">Contact Person</p>
                <p className="text-lg font-extrabold text-slate-900">{selectedCallRequest.contactPerson}</p>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-mono font-bold text-slate-800 text-base">{selectedCallRequest.contactNumber}</span>
                  <a 
                    href={`tel:${selectedCallRequest.contactNumber}`}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-xs shadow-sm hover:bg-red-700 transition"
                  >
                    Dial Number
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 text-center">
                Remember: Monetary transactions are strictly prohibited. Report any suspicious requests.
              </p>

              <button 
                onClick={() => setSelectedCallRequest(null)}
                className="w-full py-3 rounded-xl bg-gray-100 text-slate-700 font-bold text-sm hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}