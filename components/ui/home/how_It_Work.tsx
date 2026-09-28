
import Image from "next/image";
import Link from "next/link";

type TextCard = {
  kind: "text";
  title: string;
  points: string[];
  href: string;
  variant: "red" | "dark";
};

type ImageCard = {
  kind: "image";
  src: string;
  alt: string;
};

const items: (TextCard | ImageCard)[] = [
  {
    kind: "text",
    title: "Why should you donate blood?",
    points: [
      "Your donated blood can save a life and make a meaningful difference.",
      "Someone in your community may need blood when you least expect it.",
      "Regular donation can be a healthy and rewarding habit for eligible donors.",
    ],
    href: "/why-donate",
    variant: "red",
  },
  {
    kind: "image",
    src: "/img/6efafc1f-e5a2-4606-9b2b-1cd3cf66540a.jpg",
    alt: "A blood donor giving blood with a nurse assisting",
  },
  {
    kind: "text",
    title: "Who can donate blood?",
    points: [
      "Healthy adults who meet the required age and eligibility criteria.",
      "You should be physically fit and feeling well on the day of donation.",
      "Weight and other eligibility requirements may apply.",
      "Donation frequency depends on local blood donation guidelines.",
    ],
    href: "/who-can-donate",
    variant: "red",
  },
  {
    kind: "image",
    src: "/img/TheWell_blood-donation_AS_567403348.jpg",
    alt: "Blood donation equipment and medical supplies",
  },
  {
    kind: "text",
    title: "Common blood donation myths",
    points: [
      "The donation process usually involves only a brief needle prick.",
      "Your body naturally replaces the donated blood over time.",
      "Eligibility for people with certain conditions depends on medical guidance.",
    ],
    href: "/myths",
    variant: "dark",
  },
  {
    kind: "image",
    src: "/img/mohila.jpg",
    alt: "Blood bags prepared for donation",
  },
];

const btnVariants = {
  red: "bg-[#e0294f] hover:bg-[#c91f42] border-[#f7a1b3]",
  dark: "bg-[#171717] hover:bg-black border-[#555]",
};

export default function BloodDonationSection() {
  return (
    <section
      aria-label="Blood donation information"
      className="px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
         

          <h2 className="text-3xl font-bold tracking-tight text-[#15182b] sm:text-4xl">
            Learn More About{" "}
            <span className="text-[#e0294f]">Blood Donation</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-neutral-500 sm:text-base">
            Learn why blood donation matters, who can donate, and the facts
            behind some common blood donation myths.
          </p>
        </div>

        {/* Cards */}
        <div className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) =>
            item.kind === "image" ? (
              <div
                key={index}
                className="group relative min-h-[260px] overflow-hidden sm:min-h-[300px] lg:min-h-[330px]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

                <div className="absolute bottom-5 left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm text-[#e0294f] shadow-md">
                  🩸
                </div>
              </div>
            ) : (
              <article
                key={index}
                className="group relative flex min-h-[330px] flex-col justify-between overflow-hidden bg-white p-7 transition duration-300 hover:bg-red-50/30"
              >
                {/* Decorative Circle */}
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-10 ${
                    item.variant === "red"
                      ? "bg-[#e0294f]"
                      : "bg-black"
                  }`}
                />

                <div className="relative z-10">
                  {/* Number */}
                  <span
                    className={`mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${
                      item.variant === "red"
                        ? "bg-[#e0294f]"
                        : "bg-[#171717]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="max-w-xs text-xl font-bold leading-tight text-[#171b35]">
                    {item.title}
                  </h3>

                  <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-600">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e0294f]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Read More */}
                <Link
                  href={item.href}
                  className={`relative z-10 mt-7 inline-flex w-fit items-center gap-3 border-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0294f] ${
                    btnVariants[item.variant]
                  }`}
                >
                  Read More
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-[#171717]"
                  >
                    →
                  </span>
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}

