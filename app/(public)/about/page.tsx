import React from "react";
import { ShieldCheck, Clock, Users, ArrowRight } from "lucide-react";
import { FaHospital, FaTint, FaEye, FaRibbon } from "react-icons/fa";

const BRAND = "BloodLink";

/* ---------- Data ---------- */

interface WorkItem {
  id: number;
  title: string;
  channels: string[];
  image: string; // put your own images in /public/images/
  href: string;
  icon: React.ReactNode;
  card: string; // card background gradient
  button: string; // button colors
}

const OUR_WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Blood Donation Program",
    channels: ["Website", "Facebook Group", "Excel Database", "Call Center"],
    image: "/img/blooddonationprogram11.jpg",

    icon: <FaTint className="h-10 w-10 text-rose-600 dark:text-rose-400" />,
    card: "from-white via-rose-50/60 to-rose-100 dark:from-stone-900 dark:via-rose-950/40 dark:to-rose-950/70",
    button:
      "bg-rose-700 hover:bg-rose-800 focus-visible:outline-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 dark:focus-visible:outline-rose-400",
  },
  {
    id: 2,
    title: "Eye Donation Program",
    channels: ["Website", "Facebook Group"],
    image: "/img/fgkl.jpg",

    icon: <FaEye className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
    card: "from-white via-emerald-50/60 to-emerald-100 dark:from-stone-900 dark:via-emerald-950/40 dark:to-emerald-950/70",
    button:
      "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:outline-emerald-400",
  },
  {
    id: 3,
    title: "Cancer Awareness",
    channels: ["Website"],
    image: "/img/fgkl.jpg",

    icon: <FaRibbon className="h-10 w-10 text-sky-600 dark:text-sky-400" />,
    card: "from-white via-sky-50/60 to-sky-100 dark:from-stone-900 dark:via-sky-950/40 dark:to-sky-950/70",
    button:
      "bg-sky-700 hover:bg-sky-800 focus-visible:outline-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 dark:focus-visible:outline-sky-400",
  },
];

const HOSPITALS = [
  { name: "Dhaka Medical College Hospital", location: "Dhaka" },
  { name: "Square Hospital", location: "Dhaka" },
  { name: "Apollo Hospitals Dhaka", location: "Dhaka" },
  { name: "United Hospital", location: "Dhaka" },
  { name: "Evercare Hospital", location: "Dhaka" },
  { name: "Ibn Sina Hospital", location: "Dhaka" },
  { name: "Chittagong Medical College", location: "Chittagong" },
];

const FEATURES = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Verified donors",
    text: "Every donor profile is checked before it goes live.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "24/7 support",
    text: "Emergency requests are broadcast to donors instantly.",
  },
];

/* ---------- Page ---------- */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-16 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6 lg:px-8">
        {/* ===== 1. About ===== */}
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Image */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/40">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop"
                alt="Blood donation camp"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/70 via-transparent to-transparent p-6">
                <p className="text-lg font-semibold text-white">
                  Every drop counts, every donor is a hero.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 right-6 hidden items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/40 sm:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xl font-bold leading-none">10,000+</p>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Active donors nationwide
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 lg:col-span-6">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Bridging the gap between donors and patients
            </h1>

            <div className="max-w-prose space-y-4 text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">
              <p>
                {BRAND} was launched on January 24, 2013, with a simple motto: “Donate blood:
                save people and be saved.” Its main goal is to maintain a database of blood
                donors, so that anyone can contact a donor directly when a critically ill patient
                needs blood.
              </p>
              <p>
                Donors register on the site, and people in need search the platform to find a
                match. Blood cannot be manufactured; only another human being can give it. Yet
                many people still lose their lives every year for lack of blood in an emergency.
                With awareness among adults, that demand can be met.
              </p>
              <p>
                If you are willing to donate, please register. Patients who need blood urgently
                will be able to find you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="mt-0.5 shrink-0 rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{f.title}</h3>
                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/FindDonor"
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 dark:hover:bg-rose-500 dark:focus-visible:outline-rose-400"
              >
                Find donors
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800 dark:focus-visible:outline-stone-400"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>

        {/* ===== 2. Partner hospitals ===== */}
        <section aria-labelledby="partners-heading">
          <h2
            id="partners-heading"
            className="mb-6 text-center text-2xl font-medium text-red-600 dark:text-red-400"
          >
            Trusted partner hospitals
          </h2>
          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex animate-marquee items-center gap-4">
              {HOSPITALS.concat(HOSPITALS).map((h, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-3 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                    <FaHospital className="text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{h.name}</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500">{h.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. Our work ===== */}
        <section aria-labelledby="work-heading">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              id="work-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Our work
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-300">
              The programs we run to support communities and make emergency care easier to
              reach.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {OUR_WORKS.map((work) => (
              <article
                key={work.id}
                className={`flex flex-col rounded-3xl border border-white bg-gradient-to-b ${work.card} p-5 shadow-sm ring-1 ring-stone-200/60 dark:border-stone-800 dark:ring-stone-800`}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-white bg-stone-100 shadow-sm dark:border-stone-700 dark:bg-stone-800">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 items-start gap-4 px-2 pb-2 pt-6">
                  <div className="shrink-0" aria-hidden="true">
                    {work.icon}
                  </div>
                  <div className="flex min-h-full flex-1 flex-col">
                    <h3 className="text-lg font-semibold leading-snug">{work.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {work.channels.join(" | ")}
                    </p>
                    <a

                      className={`mt-4 inline-flex w-fit items-center rounded-md px-5 py-2 text-sm font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${work.button}`}
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}