
"use client";

import React from "react";
import {
  ShieldCheck,
  Clock,
  Users,
  ArrowRight,
  MapPin,
  Heart,
  Droplets,
} from "lucide-react";

import {
  FaHospital,
  FaTint,
  FaEye,
  FaRibbon,
  FaAmbulance,
  FaHandHoldingHeart,
} from "react-icons/fa";

const BRAND = "BloodLink";

interface WorkItem {
  id: number;
  title: string;
  channels: string[];
  image: string;
  href: string;
  icon: React.ReactNode;
  card: string;
  button: string;
}

const HOSPITALS = [
  {
    name: "Dhaka Medical College Hospital",
    location: "Dhaka",
    domain: "dmch.gov.bd",
  },
  {
    name: "Square Hospital",
    location: "Dhaka",
    domain: "squarehospital.com",
  },
  {
    name: "Evercare Hospital",
    location: "Dhaka",
    domain: "evercarebd.com",
  },
  {
    name: "United Hospital",
    location: "Dhaka",
    domain: "uhlbd.com",
  },
  {
    name: "Ibn Sina Hospital",
    location: "Dhaka",
    domain: "ibnsinatrust.com",
  },
  {
    name: "Chittagong Medical College",
    location: "Chittagong",
    domain: "cmc.gov.bd",
  },
];

const DONATION_CAMPAIGNS = [
  {
    id: 1,
    place: "Dhaka",
    title: "Blood Donation Campaign",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=900&q=85",
  },
  {
    id: 2,
    place: "Chattogram",
    title: "Community Blood Donation",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85",
  },
  {
    id: 3,
    place: "Rajshahi",
    title: "Voluntary Blood Donation",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=85",
  },
  {
    id: 4,
    place: "Sylhet",
    title: "Blood Awareness Program",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=85",
  },
  {
    id: 5,
    place: "Khulna",
    title: "Save Life Campaign",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=85",
  },
  {
    id: 6,
    place: "Bogura",
    title: "Volunteer Blood Donation",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=900&q=85",
  },
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

const OUR_WORKS: WorkItem[] = [
  {
    id: 1,
    title: "Blood Donation Program",
    channels: [
      "Website",
      "Facebook Group",
      "Excel Database",
      "Call Center",
    ],
    image: "/img/blooddonationprogram11.jpg",
    href: "/bloodrequest",
    icon: (
      <FaTint className="h-10 w-10 text-rose-600 dark:text-rose-400" />
    ),
    card:
      "from-white via-rose-50/60 to-rose-100 dark:from-stone-900 dark:via-rose-950/40 dark:to-rose-950/70",
    button:
      "bg-rose-700 hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-500",
  },
  {
    id: 2,
    title: "Eye Donation Program",
    channels: ["Website", "Facebook Group"],
    image: "/img/fgkl.jpg",
    href: "/eye-donation",
    icon: (
      <FaEye className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
    ),
    card:
      "from-white via-emerald-50/60 to-emerald-100 dark:from-stone-900 dark:via-emerald-950/40 dark:to-emerald-950/70",
    button:
      "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
  },
  {
    id: 3,
    title: "Cancer Awareness",
    channels: ["Website", "Awareness Campaign"],
    image: "/img/fgkl.jpg",
    href: "/cancer-awareness",
    icon: (
      <FaRibbon className="h-10 w-10 text-sky-600 dark:text-sky-400" />
    ),
    card:
      "from-white via-sky-50/60 to-sky-100 dark:from-stone-900 dark:via-sky-950/40 dark:to-sky-950/70",
    button:
      "bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500",
  },
  {
    id: 4,
    title: "Emergency Blood Support",
    channels: [
      "Website",
      "Emergency Helpline",
      "Donor Network",
    ],
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=85",
    href: "/emergency-services",
    icon: (
      <FaHospital className="h-10 w-10 text-red-600 dark:text-red-400" />
    ),
    card:
      "from-white via-red-50/60 to-red-100 dark:from-stone-900 dark:via-red-950/40 dark:to-red-950/70",
    button:
      "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500",
  },
  {
    id: 5,
    title: "Blood Awareness Campaign",
    channels: [
      "Website",
      "Social Media",
      "Community Events",
    ],
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&q=85",
    href: "/about",
    icon: (
      <FaHandHoldingHeart className="h-10 w-10 text-rose-600 dark:text-rose-400" />
    ),
    card:
      "from-white via-rose-50/60 to-rose-100 dark:from-stone-900 dark:via-rose-950/40 dark:to-rose-950/70",
    button:
      "bg-rose-700 hover:bg-rose-800 dark:bg-rose-600 dark:hover:bg-rose-500",
  },
  {
    id: 6,
    title: "Free Blood Group Testing",
    channels: [
      "Medical Camps",
      "Volunteers",
      "Community Support",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85",
    href: "/emergency-services",
    icon: (
      <FaHospital className="h-10 w-10 text-sky-600 dark:text-sky-400" />
    ),
    card:
      "from-white via-sky-50/60 to-sky-100 dark:from-stone-900 dark:via-sky-950/40 dark:to-sky-950/70",
    button:
      "bg-sky-700 hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-16 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:py-20">

      <div className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6 lg:px-8">

        {/* =========================
            1. ABOUT SECTION
        ========================== */}

        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

          {/* Image */}
          <div className="relative lg:col-span-6">

            <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/40">

              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop"
                alt="Blood donation camp"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/70 via-transparent to-transparent p-6">

                <p className="text-lg font-semibold text-white">
                  Every drop counts, every donor is a hero.
                </p>

              </div>

            </div>

            {/* Donor Counter */}
            <div className="absolute -bottom-6 right-6 hidden items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-lg dark:border-stone-700 dark:bg-stone-900 dark:shadow-black/40 sm:flex">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xl font-bold leading-none">
                  10,000+
                </p>

                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Active donors nationwide
                </p>
              </div>

            </div>

          </div>

          {/* About Content */}
          <div className="space-y-6 lg:col-span-6">

            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Heart className="h-4 w-4" />
              About {BRAND}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Bridging the gap between donors and patients
            </h1>

            <div className="max-w-prose space-y-4 text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">

              <p>
                {BRAND} was launched on January 24, 2013,
                with a simple motto: "Donate blood: save people
                and be saved." Its main goal is to maintain a
                database of blood donors, so that anyone can
                contact a donor directly when a critically ill
                patient needs blood.
              </p>

              <p>
                Donors register on the site, and people in need
                search the platform to find a match. Blood cannot
                be manufactured; only another human being can
                give it. Yet many people still lose their lives
                every year for lack of blood in an emergency.
                With awareness among adults, that demand can be met.
              </p>

              <p>
                If you are willing to donate, please register.
                Patients who need blood urgently will be able
                to find you.
              </p>

            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >

                  <div className="mt-0.5 shrink-0 rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                      {feature.text}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">

              <a
                href="/FindDonor"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-rose-700 hover:shadow-lg dark:hover:bg-rose-500"
              >
                Find Donors
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/contact"
                className="inline-flex cursor-pointer items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                Contact Us
              </a>

            </div>

          </div>

        </section>


        {/* =========================
            2. PARTNER HOSPITALS
        ========================== */}

        <section aria-labelledby="partners-heading">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Our Healthcare Partners
            </span>

            <h2
              id="partners-heading"
              className="mt-3 text-2xl font-bold sm:text-3xl"
            >
              Trusted Partner Hospitals
            </h2>

            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
              Connecting with healthcare institutions to support
              blood donation and emergency services.
            </p>

          </div>

          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">

            <div className="flex w-max animate-marquee items-center gap-5">

              {HOSPITALS.concat(HOSPITALS).map((hospital, i) => (
                <a
                  key={`${hospital.name}-${i}`}
                  href={`https://${hospital.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-[250px] cursor-pointer items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg dark:border-stone-800 dark:bg-stone-900"
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-stone-100 bg-white p-2 dark:border-stone-700">

                    <img
                      src={`https://www.google.com/s2/favicons?domain=${hospital.domain}&sz=128`}
                      alt={`${hospital.name} logo`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-bold leading-snug text-stone-800 transition-colors group-hover:text-rose-600 dark:text-white">
                      {hospital.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                      <MapPin className="h-3 w-3" />
                      {hospital.location}
                    </p>

                  </div>

                </a>
              ))}

            </div>

          </div>

        </section>


        {/* =========================
            3. BLOOD DONATION CAMPAIGNS
        ========================== */}

        <section aria-labelledby="campaign-heading">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <Droplets className="h-4 w-4" />
              Our Activities
            </span>

            <h2
              id="campaign-heading"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Blood Donation Campaigns
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Explore our blood donation activities and awareness
              campaigns across different places.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {DONATION_CAMPAIGNS.map((campaign) => (
              <a
                key={campaign.id}
                href={campaign.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900"
              >

                <div className="relative aspect-[4/3] overflow-hidden">

                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-5">

                    <span className="mb-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      Blood Donation
                    </span>

                    <h3 className="text-xl font-bold text-white">
                      {campaign.place}
                    </h3>

                    <p className="mt-1 text-sm text-white/80">
                      {campaign.title}
                    </p>

                  </div>

                </div>

              </a>
            ))}

          </div>

        </section>


        {/* =========================
            4. OUR WORK
        ========================== */}

        <section aria-labelledby="work-heading">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <FaHandHoldingHeart />
              What We Do
            </span>

            <h2
              id="work-heading"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Our Work
            </h2>

            <p className="mt-3 text-stone-600 dark:text-stone-300">
              The programs we run to support communities and make
              emergency care easier to reach.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {OUR_WORKS.map((work) => (
              <article
                key={work.id}
                className={`group flex cursor-pointer flex-col rounded-3xl border border-white bg-gradient-to-b ${work.card} p-5 shadow-sm ring-1 ring-stone-200/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-stone-800 dark:ring-stone-800`}
              >

                {/* Work Image */}
                <div className="aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border-2 border-white bg-stone-100 shadow-sm dark:border-stone-700 dark:bg-stone-800">

                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                </div>

                {/* Work Content */}
                <div className="flex flex-1 items-start gap-4 px-2 pb-2 pt-6">

                  <div className="shrink-0" aria-hidden="true">
                    {work.icon}
                  </div>

                  <div className="flex min-h-full flex-1 flex-col">

                    <h3 className="text-lg font-semibold leading-snug">
                      {work.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                      {work.channels.join(" | ")}
                    </p>

                    <a
                      href={work.href}
                      className={`mt-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${work.button}`}
                    >
                      Read More

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

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
