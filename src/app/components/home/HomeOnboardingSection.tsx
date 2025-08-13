"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PiPlayFill } from "react-icons/pi";
import { HomeOnboardingSectionProps } from "../../types/homeTypes/homeOnboardingSectionTypes";
import { HOME_ONBOARDING_SECTION_DATA } from "../../utils/constant/homeConstant/homeOnboardingSectionConstant";
import Image from 'next/image';

const HomeOnboardingSection: React.FC<Partial<HomeOnboardingSectionProps>> = ({
  content = HOME_ONBOARDING_SECTION_DATA.content,
}) => {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  const handleOpenForm = () => {
    router.push('/journey');
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
  };
  return (
    <section className="w-full lg:py-24 py-10 px-8 bg-[#F3F3F3]">
      <div className="lg:max-w-6xl max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Featured Tag */}
            <div className="inline-block">
              <span className="inline-block px-5 py-2.5 bg-gray-100 border border-[#CACACA] rounded-lg text-[#49454F] text-base font-medium">
                {content.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-black text-3xl lg:text-3xl font-normal leading-tight">
              {content.title}
            </h2>

            {/* Description */}
            <p className="text-[#7A7A7A] text-lg lg:text-xl leading-relaxed tracking-wide">
              {content.description}
            </p>

            {/* Button */}
            <div className="">
              <button 
                onClick={handleOpenForm}
                className="bg-black lg:text-lg text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-3 rounded-full transition-colors duration-200"
              >
                {content.buttonText}
              </button>
            </div>
          </div>

          {/* Right Column - Video with Poster */}
          <div className="relative">
            <div className="bg-[#D9D9D9] rounded-2xl aspect-video overflow-hidden">
              {showVideo ? (
                /* YouTube Video Embed */
                <iframe
                  src="https://www.youtube.com/embed/lWvXfiSkpL0?autoplay=1"
                  title="Founder Message"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                /* Poster Image */
                <div className="relative w-full h-full">
                  <Image
                    src="/onboarding-poster.png"
                    alt="Founder Message Poster"
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      onClick={handlePlayVideo}
                      className="bg-transparent border-2 border-white rounded-full p-4 shadow-lg hover:bg-white hover:bg-opacity-20 transition-all duration-200 cursor-pointer"
                    >
                      <PiPlayFill className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
   
  );
};

export default HomeOnboardingSection;
