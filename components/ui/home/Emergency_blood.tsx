"use client";
import { FaPhoneAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { AlertCircle, Clock, MapPin, PhoneCall, Heart } from "lucide-react";



interface Patient {
  fullName: string;
  phoneNumber: string;
  email: string;
}

interface BloodRequest {
  id: string;
  bloodGroup: string;
  bagsNeeded: number;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  urgency: string;
  status: string;
  contactNumber: string;
  neededBy: string;
  patient: Patient;
}

export default function EmergencyRequests() {
  const [emergencyRequests, setEmergencyRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
        
        // Ekhane token thakle token sohit request pathano bhalo, nahole public endpoint hole emnitei asbe
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${baseUrl}/api/v1/blood-request/pending-requests`, {
          headers,
        });
        
        const result = await res.json();
        console.log("Homepage fetched requests:", result); // Browser console-e check korar jonno

        if (result.success && result.data) {
          // Case-insensitive check kora holo jate 'CRITICAL', 'critical' ba 'Urgent' ja-e thakuk match kore
          const filteredRequests = result.data.filter((req: BloodRequest) => {
            const urgency = req.urgency?.toUpperCase();
            return urgency === "CRITICAL" || urgency === "URGENT";
          });
          
          setEmergencyRequests(filteredRequests.slice(0, 4));
        } else {
          setError("Failed to load requests data.");
        }
      } catch (err: any) {
        console.error("Failed to fetch emergency requests:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyRequests();
  }, []);

  const formatBloodGroup = (bg: string) => {
    return bg?.replace("_POSITIVE", "+").replace("_NEGATIVE", "-");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()} @ ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-extrabold tracking-wider uppercase mb-3 border border-red-100">
            <AlertCircle className="w-3.5 h-3.5" />
            Emergency Broadcast
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Emergency Blood Requests</h2>
          <p className="path-text text-slate-500 text-sm mt-2 font-medium">
            Immediate help needed. Contact the patient's representative directly to volunteer.
          </p>
        </div>
        {/* <Link 
          href="/requests" 
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-extrabold hover:bg-slate-50 transition whitespace-nowrap"
        >
          View All Requests →
        </Link> */}
      </div>

      <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 md:p-6 mb-8 flex items-start gap-4">
        <div className="p-2 bg-red-100 text-red-600 rounded-full shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-red-700 font-extrabold text-sm mb-1 uppercase tracking-wide">Monetary Transactions Strictly Prohibited!</h4>
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Blood donation is a completely voluntary and humanitarian service. Engaging in any financial transaction for blood is strictly forbidden. The LifeDrop family will not be held responsible or liable for any personal monetary transactions or disputes.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs font-bold text-slate-500">Loading emergency requests...</div>
      ) : emergencyRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs font-semibold text-slate-500 shadow-sm">
          No critical or urgent blood requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative hover:shadow-md transition hover:border-red-200">
              
              {/* Urgency Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest">{req.urgency}</span>
              </div>

              <div className="p-5 flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-extrabold text-xl border-2 border-red-100 shrink-0">
                    {formatBloodGroup(req.bloodGroup)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 uppercase tracking-wide text-sm">{req.patient?.fullName || "Patient Name"}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{req.bagsNeeded} Bags required</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 uppercase leading-snug">{req.hospitalName}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{req.hospitalAddress}, {req.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs font-bold text-slate-700">
                      <span className="text-slate-500 font-medium">Needed:</span> {formatDate(req.neededBy)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Contact Person</p>
                  <p className="text-xs font-extrabold text-slate-900 uppercase">{req.patient?.fullName || "Representative"}</p>
                </div>
                
                
                <div className="flex items-center gap-2">
                  <FaPhoneAlt /> {req.contactNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}