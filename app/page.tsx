import EmergencyRequests from '@/components/ui/home/Emergency_blood';
import FAQSection from '@/components/ui/home/faq';
import HealthBenefitsSection from '@/components/ui/home/HealthBenefitsSection';
import Hero from '@/components/ui/home/Hero';
import BloodDonationGuide from '@/components/ui/home/how_It_Work';
import ScrollAnimation from '@/components/ui/home/ScrollAnimation';
import TestimonialSection from '@/components/ui/home/testimorals';
import WhyChooseBloodLink from '@/components/ui/home/why_donate_blood';
import React from 'react';

const page = () => {
  return (
    <main className="min-h-screen space-y-6 overflow-hidden">

      <ScrollAnimation>
        <Hero />
      </ScrollAnimation>


      <ScrollAnimation delay={0.1}>
        <EmergencyRequests />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <WhyChooseBloodLink />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <BloodDonationGuide />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <HealthBenefitsSection />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <FAQSection />
      </ScrollAnimation>

      <ScrollAnimation delay={0.1}>
        <TestimonialSection />
      </ScrollAnimation>
    </main>
  );
};

export default page;