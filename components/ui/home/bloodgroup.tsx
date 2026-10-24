

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { animate } from "framer-motion";

type Stats = {
  totalUsers: number;
  totalDonors: number;
  totalBloodRequests: number;
};

const CountUp = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [value]);

  return <>{count.toLocaleString("en-US")}+</>;
};

export default function HomeStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const backendUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL ||
          "https://l2-a6-blood-donation.vercel.app";

        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${backendUrl}/api/v1/admin/reports`,
          {
            headers: token
              ? { Authorization: `Bearer ${token}` }
              : {},
          }
        );

        const data = response.data?.data ?? response.data;

        setStats({
          totalUsers: Number(data.totalUsers ?? 0),
          totalDonors: Number(data.totalDonors ?? 0),
          totalBloodRequests: Number(
            data.totalBloodRequests ?? 0
          ),
        });
      } catch (err) {
        console.error("Failed to fetch statistics:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const items = [
    {
      label: "TOTAL USERS",
      value: stats?.totalUsers ?? 0,
    },
    {
      label: "BLOOD REQUESTS",
      value: stats?.totalBloodRequests ?? 0,
    },
    {
      label: "REGISTERED DONORS",
      value: stats?.totalDonors ?? 0,
    },
  ];

  return (
    <section className="bg-slate-100  dark:bg-slate-950 sm:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 sm:grid-cols-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full py-8 text-center text-sm text-slate-500">
            Loading statistics...
          </div>
        ) : error ? (
          <div
            className="col-span-full py-8 text-center text-sm text-slate-500"
            role="alert"
          >
            Statistics are temporarily unavailable.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center text-center"
            >
              <p
                className="text-4xl font-extrabold tracking-tight text-red-600 sm:text-5xl lg:text-6xl"
                aria-label={`${item.label}: ${item.value}`}
              >
                <CountUp value={item.value} />
              </p>

              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 sm:text-base">
                {item.label}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
