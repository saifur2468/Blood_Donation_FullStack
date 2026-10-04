'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Local storage ba cookie-te token save korun
      localStorage.setItem('accessToken', token);

      // Tarpor dashboard ba home page-e pathiye din
      router.push('/dashboard'); 
    }
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium text-gray-600">Google login successful! Redirecting...</p>
    </div>
  );
}