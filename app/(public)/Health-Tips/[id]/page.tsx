"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

const blogTopicsData: Record<string, any> = {
  "1": {
    title: "Importance of Regular Blood Donation",
    fullContent: [
      "Regular blood donation is one of the simplest ways to make a meaningful difference in someone's life. Every day, hospitals need blood for patients undergoing surgery, accident and trauma treatment, childbirth complications, cancer treatment, severe anemia, and many other medical conditions. Since blood cannot be manufactured artificially, donated blood from healthy volunteers remains an essential part of modern healthcare.",
      "When you donate blood, your contribution can potentially help more than one patient because donated blood is often separated into different components such as red blood cells, plasma, and platelets. Each component can be used for different medical needs. This means a single donation can become a valuable resource for multiple patients.",
      "Why Is Regular Blood Donation Important?",
      "Blood is needed continuously, not only during major disasters or emergencies. Hospitals and blood banks need a stable supply throughout the year. Regular voluntary donors help maintain this supply and reduce the possibility of shortages.",
      "Accidents, emergency surgeries, childbirth-related complications, cancer treatments, blood disorders, and chronic illnesses can require blood or blood components. In emergency situations, having a reliable blood supply can make a critical difference.",
      "Benefits of Blood Donation",
      "The biggest benefit of donating blood is helping patients who depend on transfusions. However, the donation process also provides an opportunity for donors to receive a basic health screening before donation. This may include checking blood pressure, pulse, hemoglobin level, and other eligibility factors depending on the blood donation center.",
      "For some donors, regular blood donation may also help prevent excessive iron accumulation. However, blood donation should never be considered a treatment for a medical condition, and people should always follow the eligibility requirements and advice of qualified healthcare professionals.",
      "What Happens During a Blood Donation?",
      "The process is generally straightforward. First, the donor completes a health questionnaire and eligibility screening. A trained professional checks basic health information and determines whether the person is suitable to donate.",
      "After eligibility is confirmed, blood is collected using sterile, single-use equipment. The actual collection usually takes only a few minutes, although the entire visit may take longer because of registration, screening, donation, and recovery.",
      "After donating, donors are normally advised to rest for a short period and have refreshments. Drinking enough fluids and following the instructions provided by the donation center can help support recovery.",
      "Who Should Donate Blood?",
      "Healthy people who meet the age, weight, health, and other eligibility requirements can consider becoming blood donors. Requirements can vary depending on the country, blood service, donation type, and individual circumstances.",
      "People should not donate simply because they feel pressured to do so. If you are feeling unwell, have certain medical conditions, are taking particular medications, have recently undergone a procedure, or have other circumstances that may affect eligibility, consult the blood donation service before donating.",
      "How Often Can You Donate?",
      "The recommended interval between donations depends on the type of donation and the rules of the blood service in your country. Whole blood donations generally require a longer recovery interval than some other types of donations. Always follow the schedule recommended by your local blood donation organization rather than assuming a fixed interval.",
      "Small Actions Can Save Lives",
      "Blood donation does not require extraordinary effort. A healthy person may spend only a short amount of time at a donation center, but the donated blood can become an important part of another person's medical treatment.",
      "If you are eligible to donate, consider becoming a regular voluntary blood donor. Your donation can help hospitals maintain their supply and give patients and their families hope when they need it most."
    ],
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop",
    date: "October 02, 2026",
  },

  "2": {
    title: "Who Can Become a Safe Donor?",
    fullContent: [
      "Blood donation is generally safe for healthy and eligible people, but not everyone is able to donate at every moment. Blood donation organizations use eligibility guidelines to protect both donors and patients receiving blood.",
      "Before donating, every potential donor goes through a screening process. The purpose of this screening is to make sure that donating blood is safe for the donor and that the donated blood is suitable for transfusion.",
      "Basic Donor Eligibility",
      "Eligibility requirements can vary by country and blood donation organization. Common requirements may include meeting a minimum age, meeting a minimum body weight, being in generally good health, and passing the required health screening.",
      "The exact requirements should always be confirmed with your local blood donation center because rules can change and may be different for whole blood, plasma, and platelet donations.",
      "Health Screening Before Donation",
      "Before blood collection, donors are normally asked questions about their health, medications, recent illnesses, travel history, previous medical procedures, and other factors that may affect eligibility.",
      "Basic measurements may also be taken, such as blood pressure, pulse, temperature, and hemoglobin level. These checks help the donation staff determine whether it is appropriate for the person to donate that day.",
      "When You Should Wait Before Donating",
      "There are situations where a person may need to temporarily postpone donation. For example, if someone is currently feeling sick, has recently had certain medical procedures, is recovering from an infection, or is taking certain medications, the donation center may recommend waiting.",
      "Pregnancy and certain recent medical or surgical procedures can also affect eligibility. The rules depend on the individual's circumstances and the policies of the blood service.",
      "Medications and Blood Donation",
      "Taking medication does not automatically mean that someone cannot donate blood. However, some medications or medical conditions may require a temporary or permanent deferral.",
      "Never stop taking prescribed medication just to donate blood. Instead, tell the donation staff what medication you are taking and follow their guidance.",
      "What Makes Someone a Responsible Donor?",
      "A responsible donor should answer all screening questions honestly. Even if a question seems personal, the information is collected to protect both the donor and the patient.",
      "Donors should also get enough rest, eat an appropriate meal when advised by the donation center, stay hydrated, and follow all post-donation instructions.",
      "The most important thing is not simply being willing to donate. A safe donor is someone who meets the eligibility requirements and provides accurate health information.",
      "Before You Donate",
      "If you are interested in becoming a donor, contact a recognized blood donation center or hospital blood bank and ask about their current eligibility requirements. Requirements can vary by location, so professional guidance is always the safest option.",
      "By donating responsibly and following the screening process, healthy eligible individuals can become an important part of their community's blood supply."
    ],
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
    date: "September 28, 2026",
  },

  "3": {
    title: "Myths and Facts About Donating Blood",
    fullContent: [
      "Blood donation is surrounded by many myths and misunderstandings. Some people are afraid that donating blood will cause permanent weakness, while others believe that they can become infected through the donation process. In reality, blood donation is performed under controlled conditions using sterile, single-use equipment.",
      "Understanding the facts can help people make informed decisions about blood donation.",
      "Myth 1: Blood Donation Causes Permanent Weakness",
      "Fact: Most eligible donors tolerate blood donation well. After donating, some people may feel temporarily tired, dizzy, or lightheaded. This is one reason donors are asked to rest and have refreshments after the procedure.",
      "The body naturally replaces the donated blood components over time. If you experience unusual or prolonged symptoms after donation, you should contact a healthcare professional.",
      "Myth 2: You Can Catch an Infection From Donating Blood",
      "Fact: Blood donation centers use sterile, single-use needles and collection equipment. The needle used for one donor is not reused for another donor.",
      "Proper infection-control procedures are followed to protect donors during the collection process.",
      "Myth 3: Donating Blood Takes a Very Long Time",
      "Fact: The entire visit may take some time because it includes registration, health screening, preparation, donation, and recovery. However, the actual blood collection itself is usually relatively short.",
      "The exact time can vary depending on the donation center and the type of donation.",
      "Myth 4: Only People With Rare Blood Groups Are Needed",
      "Fact: Every blood group is important. Hospitals need different blood groups to treat different patients, and common blood groups are needed in large numbers because many patients have them.",
      "If you know your blood group, it can be helpful when responding to a compatible blood request, but all eligible donors can contribute to maintaining the blood supply.",
      "Myth 5: You Cannot Donate If You Have a Tattoo",
      "Fact: A tattoo does not necessarily mean that you can never donate blood. However, depending on where and how the tattoo was performed and the rules of the local blood service, there may be a temporary waiting period.",
      "Always check the current requirements of your local blood donation organization.",
      "Myth 6: Donating Blood Removes Too Much Blood From the Body",
      "Fact: Blood donation centers collect a controlled amount of blood based on established safety procedures. Before donation, the donor is screened to determine whether they are eligible.",
      "The body continuously produces new blood cells and replaces the donated components over time.",
      "Myth 7: You Can Donate Whenever You Want",
      "Fact: Blood donation has eligibility requirements and recommended intervals between donations. The appropriate interval depends on the donation type and the rules of the blood service.",
      "Donors should never donate more frequently than recommended.",
      "Why Facts Matter",
      "Misinformation can prevent healthy people from donating or encourage people to donate when they should actually wait. Learning accurate information helps donors make safer decisions.",
      "If you have questions about eligibility, medications, medical conditions, recent travel, or previous procedures, speak directly with a qualified blood donation professional before donating.",
      "The best way to become a safe donor is to follow official guidance, answer screening questions honestly, and listen to the instructions provided by the donation center."
    ],
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop",
    date: "September 20, 2026",
  },

  "4": {
    title: "Recovery Tips After Donating Blood",
    fullContent: [
      "Taking care of yourself after blood donation is important. Most healthy donors recover without major problems, but it is normal for some people to feel tired, lightheaded, or slightly weak for a short period after donating.",
      "Following the instructions provided by the donation center can make the recovery process easier.",
      "1. Rest After Donation",
      "After donating, remain in the recovery area for the amount of time recommended by the donation staff. Sit down, relax, and avoid standing up too quickly.",
      "If you feel dizzy or uncomfortable, tell a staff member immediately instead of trying to walk away on your own.",
      "2. Drink Plenty of Fluids",
      "Hydration is important after blood donation. Drink water and other suitable non-alcoholic fluids according to the advice of your donation center.",
      "Replacing fluids helps your body recover from the fluid volume that was donated.",
      "3. Eat a Healthy Snack or Meal",
      "Donation centers commonly provide refreshments after donation. Having a snack can help you feel better, especially if you have not eaten recently.",
      "After leaving the donation center, continue with your normal balanced meals unless a healthcare professional has advised you otherwise.",
      "4. Avoid Heavy Physical Activity",
      "It is generally a good idea to avoid strenuous exercise, heavy lifting, or demanding physical activity for the period recommended by the donation center.",
      "Give your body time to recover before returning to intense workouts or physically demanding work.",
      "5. Take Care of the Donation Site",
      "Keep the bandage or dressing on for the period recommended by the donation staff. If bleeding starts again, apply gentle pressure to the area according to the instructions you were given.",
      "If you notice unusual swelling, persistent bleeding, severe pain, or signs of infection, seek medical advice.",
      "6. Avoid Alcohol Immediately After Donation",
      "Alcohol can contribute to dehydration and may make some people feel more dizzy after donating. Follow the blood service's advice regarding alcohol and other activities after donation.",
      "7. Listen to Your Body",
      "People respond differently to blood donation. Some donors feel completely normal shortly afterward, while others need more rest.",
      "If you feel tired or lightheaded, sit or lie down until you feel better. Do not drive or perform risky activities if you are feeling dizzy.",
      "When Should You Seek Medical Help?",
      "Most post-donation symptoms are mild and temporary. However, if you experience severe or persistent dizziness, fainting, significant bleeding, chest pain, difficulty breathing, severe weakness, or another concerning symptom, seek appropriate medical attention.",
      "Your local blood donation center can also provide specific aftercare instructions based on your donation.",
      "Recovery Is Part of Responsible Donation",
      "Being a good blood donor does not end when the blood collection is complete. Taking care of yourself afterward helps ensure that you can recover comfortably and, if eligible in the future, continue contributing to the blood supply.",
      "Rest, stay hydrated, follow the instructions of the donation staff, and give your body enough time to recover."
    ],
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop",
    date: "September 15, 2026",
  },
};

export default function BlogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const blog = blogTopicsData[id];

  if (!blog) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Blog not found!</h2>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/40 px-4 py-2 rounded-xl transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blogs
      </button>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4 text-red-600" /> {blog.date}
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          {blog.title}
        </h1>
      </div>

      {/* Featured Image */}
      <div className="w-full h-80 rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Blog Content Section */}
      <div className="bg-white dark:bg-[#121212] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm space-y-5 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
        {blog.fullContent.map((paragraph: string, index: number) => {
     
          const isHeading = paragraph.length < 65 && (paragraph.endsWith("?") || paragraph.includes(":") || !paragraph.includes("."));
          
          if (isHeading) {
            return (
              <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                {paragraph}
              </h3>
            );
          }
          
          return (
            <p key={index} className="text-slate-600 dark:text-slate-300">
              {paragraph}
            </p>
          );
        })}

        <div className="pt-4 border-t border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-400">
          Blood donation is a noble act that connects humanity. By sharing awareness and educating people through these articles, we can build a stronger and healthier community together.
        </div>
      </div>
    </div>
  );
}