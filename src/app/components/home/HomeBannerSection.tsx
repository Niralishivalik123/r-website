"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeBannerSectionProps } from "../../types/homeTypes/homeBannerSectionsTypes";
import { HOME_BANNER_SECTION_DATA } from "../../utils/constant/homeConstant/homeBannerSectionsConstant";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  identity: string;
  workingProfessionalRole?: string;
  selectedArea: string;
  pincode: string;
}

const HomeBannerSection: React.FC<Partial<HomeBannerSectionProps>> = ({
  title = HOME_BANNER_SECTION_DATA.title,
  subtitle = HOME_BANNER_SECTION_DATA.subtitle,
  description = HOME_BANNER_SECTION_DATA.description,
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isWelcomeMode, setIsWelcomeMode] = useState(false);

  useEffect(() => {
    // Check if we have form data from localStorage
    const storedData = localStorage.getItem("journeyFormData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(parsedData);
        setIsWelcomeMode(true);
      } catch (error) {
        console.error("Error parsing stored form data:", error);
      }
    }
  }, []);

  // Get personalized content based on user identity
  const getPersonalizedContent = () => {
    if (!formData) return { title, subtitle, description };

    const { firstName, identity } = formData;

    switch (identity) {
      // case "Real Estate Developer":
      //   return {
      //     title: `Welcome, ${firstName}!`,
      //     subtitle: "Your Real Estate Development Journey Begins",
      //     description: `Ready to transform ${selectedArea} with innovative projects?`
      //   };

      // case "Land Owner":
      //   return {
      //     title: `Hello ${firstName}!`,
      //     subtitle: "Unlock Your Land's Potential",
      //     description: `Discover development opportunities in ${selectedArea}`
      //   };

      // case "Working Professionals (Job in Real Estate)":
      //   return {
      //     title: `Welcome ${firstName}!`,
      //     subtitle: "Find Your Dream Real Estate Career",
      //     description: `Explore job opportunities in ${selectedArea}`
      //   };

      // case "New Entrants/ Explorer":
      //   return {
      //     title: `Hi ${firstName}!`,
      //     subtitle: "Start Your Real Estate Journey",
      //     description: `Learn and grow in the ${selectedArea} market`
      //   };

      default:
        return {
          title: `Welcome, ${firstName}`,
          description: `You’re one step closer to Real Connections In Sindhubhavan.`,
        };
    }
  };

  const personalizedContent = getPersonalizedContent();

  return (
    <section className="w-full lg:py-12 py-10 px-8 bg-white">
      <div className="lg:max-w-6xl max-w-full mx-auto">
        <div
          className={`rounded-[28px] p-8 lg:p-24 transition-all duration-1000 ${
            isWelcomeMode ? "bg-[#F1F1F1]" : "bg-[#F1F1F1]"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="">
              <h1
                className={`lg:text-4xl font-normal leading-relaxed transition-all duration-500 ${
                  isWelcomeMode ? "text-black" : "text-black"
                }`}
              >
                {personalizedContent.title}
              </h1>

              <h2 className={`lg:text-4xl font-normal leading-relaxed transition-all duration-500 ${
                isWelcomeMode ? 'text-black' : 'text-black'
              }`}>
                {personalizedContent.subtitle}
              </h2>

              <h4
                className={`lg:text-4xl font-normal leading-relaxed transition-all duration-500 ${
                  isWelcomeMode ? "text-black lg:text-xl" : "text-black"
                }`}
              >
                {personalizedContent.description}
              </h4>
            </div>

            {/* Banner Element Image */}
            <div className="flex justify-center lg:justify-end">
              <div
                className={`relative w-full h-56 transition-all duration-1000 ${
                  isWelcomeMode ? "scale-110" : "scale-100"
                }`}
              >
                {isWelcomeMode ? (
                  <Image
                    src="/banner/banner-element-new.png"
                    alt="Home Banner Section Graphic"
                    priority
                    fill
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/banner/banner-element.png"
                    alt="Home Banner Section Graphic"
                    priority
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerSection;
