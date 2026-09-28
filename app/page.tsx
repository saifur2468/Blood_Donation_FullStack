import BloodGroupSection from '@/components/ui/home/bloodgroup';
import Emergency_blood from '@/components/ui/home/Emergency_blood';
import FAQSection from '@/components/ui/home/faq';
import Hero from '@/components/ui/home/Hero';
import BloodDonationSection from '@/components/ui/home/how_It_Work';


import TestimonialSection from '@/components/ui/home/testimorals';
import WhyChooseBloodLink from '@/components/ui/home/why_donate_blood';
import React from 'react';

const page = () => {
  return (
    <div>
      <Hero></Hero>
      <BloodGroupSection></BloodGroupSection>
      <Emergency_blood></Emergency_blood>
      <WhyChooseBloodLink></WhyChooseBloodLink>
   <BloodDonationSection></BloodDonationSection>
      <FAQSection></FAQSection>
      <TestimonialSection></TestimonialSection>
    </div>
  );
};

export default page;