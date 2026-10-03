"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Testimonial = {
  id: number;
  title: string;
  comment: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    title: "Saved My Mother's Life!",
    comment:
      "When my mother needed O-negative blood urgently for her surgery, BloodLink connected us with a donor within an hour. I cannot thank this platform enough!",
    name: "Monica Regan",
    role: "PATIENT FAMILY",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Incredible Initiative!",
    comment:
      "Finding an urgent blood donor used to be a nightmare until I discovered this platform. The process was completely seamless and transparent from start to finish.",
    name: "James Tores",
    role: "VOLUNTEER DONOR",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Very Fast Response!",
    comment:
      "The emergency request features and quick notifications saved us so much time. We were able to arrange 2 bags of B+ blood within just a few hours!",
    name: "Katrin Forest",
    role: "MEDICAL COORDINATOR",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Hassle-Free Donating!",
    comment:
      "As a regular blood donor, registering my availability was super quick and easy. Knowing that I helped save a life brings immense joy. Highly recommended!",
    name: "David Miller",
    role: "REGULAR DONOR",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "A Lifesaver Platform!",
    comment:
      "The location filter options made it effortless to find nearby donors in our exact city during a critical midnight emergency. Outstanding support team!",
    name: "Sophia Alva",
    role: "PATIENT RELATIVE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Transparent & Safe",
    comment:
      "No hidden fees or fake requests. Every blood requirement listed on the platform is verified and genuine. Truly a reliable service.",
    name: "Liam Chen",
    role: "COMMUNITY VOLUNTEER",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TestimonialSection() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="relative overflow-hidden bg-slate-100 dark:bg-slate-900 px-4 py-20 font-sans md:px-12 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              SUCCESS STORIES & REVIEWS
            </span>

            <h2 className="font-serif text-3xl font-normal italic text-gray-900 dark:text-slate-100 md:text-5xl">
              What People Say
              <br />
              <span className="font-sans font-bold not-italic">
                About BloodLink
              </span>
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex shrink-0 gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 dark:border-slate-600 text-gray-900 dark:text-slate-200 text-xl transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-white"
            >
              ←
            </button>

            <button
              ref={nextRef}
              type="button"
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 dark:border-slate-600 text-gray-900 dark:text-slate-200 text-xl transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-white"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.5,
            },
          }}
          onInit={(swiper) => {
            const navigation = swiper.params.navigation;

            if (navigation && typeof navigation !== "boolean") {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;

              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="w-full !overflow-visible"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <article className="relative flex min-h-[300px] h-full flex-col justify-between bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">

                {/* Large Quote */}
                <div className="pointer-events-none absolute right-4 top-2 select-none font-serif text-[150px] leading-none text-red-100 dark:text-red-900/30 opacity-60">
                  “
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-serif text-2xl font-bold text-red-600 dark:text-red-400">
                      “
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mb-8 text-sm leading-relaxed text-gray-700 dark:text-slate-300 md:text-base">
                    {item.comment}
                  </p>
                </div>

                {/* User */}
                <div className="relative z-10">
                  <hr className="mb-6 border-gray-100 dark:border-slate-700" />

                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-red-200 dark:border-red-900/60">
                      <Image
                        src={item.avatar}
                        alt={`${item.name} profile`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 md:text-base">
                        {item.name}
                      </h4>

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>

              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}