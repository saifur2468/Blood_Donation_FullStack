'use client';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: "Who is eligible to donate blood?",
        answer: "Generally, anyone who is between 18 and 60 years old, weighs at least 50 kg, and is in good general health can donate blood. A basic health screening will be conducted before donation.",
    },
    {
        question: "How often can I donate blood?",
        answer: "Whole blood donation can typically be made every 12 weeks (3 months) for men and 16 weeks (4 months) for women to ensure your body recovers iron levels safely.",
    },
    {
        question: "Do I need to pay to request blood or find a donor?",
        answer: "No. Our platform is 100% voluntary and free. We connect patients in urgent need with generous blood donors directly without any service charges.",
    },
    {
        question: "How can I request blood in an emergency?",
        answer: "You can easily create an urgent blood request by registering or logging into your patient dashboard, filling out the required blood group, hospital location, and contact details.",
    },
    {
        question: "Is my personal information secure?",
        answer: "Yes. Your privacy and data security are our top priorities. Your contact details are only shared with verified volunteers or medical personnel when necessary.",
    },
    {
        question: "What should I do before donating blood?",
        answer: "Make sure you get a good night's sleep, eat a healthy meal, and drink plenty of water before coming to the donation center. Avoid fatty foods and alcohol.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Side: Images & Experience Box Grid */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">

                    {/* Tall Image Card (Left) */}
                    <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 sm:translate-y-6">
                        <img
                            src="/img/blood.jpg"
                            alt="Blood Donation"
                            className="w-full h-full object-cover min-h-[380px]"
                        />
                    </div>

                    {/* Right Column (Top Image & Bottom Experience Badge) */}
                    <div className="flex flex-col gap-6">
                        {/* Top Image */}
                        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 h-[220px]">
                            <img
                                src="/img/images.jpg"
                                alt="Medical Support"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Experience Badge */}
                        <div className="bg-[#0c1b18] dark:bg-slate-900 dark:border dark:border-slate-800 text-white rounded-3xl p-6 flex items-center gap-5 shadow-xl">
                            <div className="bg-red-600 text-white font-black text-2xl px-4 py-3 rounded-2xl flex flex-col items-center justify-center tracking-tight">
                                <span>100%</span>
                                <span className="text-[10px] font-medium tracking-normal uppercase">Trusted</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-base leading-snug">Verified Blood Donors & Requests</h4>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side: FAQs Content */}
                <div className="lg:col-span-6">

                    {/* Badge */}
                    <div className="inline-block border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-red-50/50 dark:bg-red-950/30">
                        General FAQs
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight mb-10 leading-[1.15]">
                        Everything you need to know about blood donation.
                    </h2>

                    {/* Accordion List */}
                    <div className="divide-y divide-gray-200 dark:divide-slate-800 border-t border-b border-gray-200 dark:border-slate-800">
                        {faqData.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="py-5 transition-all duration-200">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center justify-between text-left font-bold text-gray-900 dark:text-slate-100 text-lg hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    >
                                        <span>{item.question}</span>
                                        <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center shrink-0 ml-4 text-gray-700 dark:text-slate-300">
                                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-3 pr-12 text-gray-600 dark:text-slate-400 text-sm md:text-base leading-relaxed animate-fadeIn">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}