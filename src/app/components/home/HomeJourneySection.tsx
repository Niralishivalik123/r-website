"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { HomeJourneySectionProps } from "../../types/homeTypes/homeJourneySectionTypes";
import { HOME_JOURNEY_SECTION_DATA } from "../../utils/constant/homeConstant/homeJourneySectionConstant";

const HomeJourneySection: React.FC<Partial<HomeJourneySectionProps>> = ({
  description = HOME_JOURNEY_SECTION_DATA.description,
  buttonText = HOME_JOURNEY_SECTION_DATA.buttonText,
}) => {
  const router = useRouter();

  const handleOpenForm = () => {
    router.push('/journey');
  };
  return (
    <section className="w-full lg:py-24 py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="lg:max-w-6xl max-w-full mx-auto text-center">
        <div className="lg:max-w-4xl max-w-full mx-auto">
          {/* Description Text */}
          <p className="text-lg lg:text-xl text-[#7A7A7A] leading-relaxed mb-8 text-center tracking-wide">
            {description}
          </p>

          {/* Call to Action Button */}
          <button 
            onClick={handleOpenForm}
            className="bg-black lg:text-lg text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-3 rounded-full transition-colors duration-200"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeJourneySection;
