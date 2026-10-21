
import HomeStats from '@/components/ui/home/bloodgroup';
import EmergencyRequests from '@/components/ui/home/Emergency_blood';

import FAQSection from '@/components/ui/home/faq';
import Hero from '@/components/ui/home/Hero';
import BloodDonationGuide from '@/components/ui/home/how_It_Work';



import TestimonialSection from '@/components/ui/home/testimorals';
import WhyChooseBloodLink from '@/components/ui/home/why_donate_blood';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero></Hero>
    <HomeStats></HomeStats>
      <EmergencyRequests></EmergencyRequests>
      <WhyChooseBloodLink></WhyChooseBloodLink>
   <BloodDonationGuide></BloodDonationGuide>
      <FAQSection></FAQSection>
      <TestimonialSection></TestimonialSection>
    </div>
  );
};

export default page;