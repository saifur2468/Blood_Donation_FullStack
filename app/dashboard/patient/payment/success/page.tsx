'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

type PaymentDetails = {
  id: string;
  paymentStatus: string;
  receiptUrl: string | null;
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get('donation_id');
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!donationId) {
      setLoading(false);
      return;
    }

    let tries = 0;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

        const res = await fetch(`${baseUrl}/api/v1/payment/status/${donationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (cancelled) return;

        if (result.success) {
          setPaymentDetails(result.data);
          // receipt pele ba 10 bar try korle thamo
          if (result.data.receiptUrl || ++tries >= 10) {
            setLoading(false);
            return;
          }
        } else if (++tries >= 10) {
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Failed to fetch payment status', err);
        if (++tries >= 10) {
          if (!cancelled) setLoading(false);
          return;
        }
      }
      timer = setTimeout(poll, 2000);
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [donationId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
          ✓
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 text-sm mb-6">
          Apnar blood donation support payment-ti safolvabe complete hoyeche.
        </p>

        {donationId && (
          <div className="bg-gray-50 p-3 rounded-lg mb-6 text-left border border-gray-200">
            <span className="text-xs text-gray-500 block">Reference ID:</span>
            <span className="text-xs font-mono text-gray-700 break-all">
              {donationId}
            </span>
          </div>
        )}

        {/* Receipt section */}
        <div className="mb-6">
          {paymentDetails?.receiptUrl ? (
            <a
              href={paymentDetails.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full border border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-3 rounded-xl font-medium transition-all"
            >
              Download Receipt (PDF)
            </a>
          ) : loading ? (
            <p className="text-xs text-gray-500">Receipt generate hocche...</p>
          ) : (
            <p className="text-xs text-gray-500">
              Receipt ekhono ready hoy nai. Pore "My Requests" page theke dekhte paren.
            </p>
          )}
        </div>

        <button
          onClick={() => router.push('/dashboard/patient/myrequest')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition-all shadow-md shadow-emerald-200"
        >
          Back to My Requests
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}