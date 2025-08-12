import React from "react";
import { useRouter } from "next/navigation";
import { JourneyFormSectionProps } from "../../../types/pageTypes/journeyFormTypes";
import { JOURNEY_FORM_DATA } from "../../../utils/constant/pageConstant/journeyFormConstant";
import JourneyForm from "./JourneyForm";

const JourneyFormSection: React.FC<Partial<JourneyFormSectionProps>> = ({
  content = JOURNEY_FORM_DATA.content,
}) => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    router.push("/");
  };

  return (
    <div className="p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-black text-xl lg:text-[26px] font-normal">
              {content.heading.greeting}
            </h2>
            <h3 className="text-black text-xl lg:text-[26px] font-normal">
              {content.heading.title}
            </h3>
            <h4 className="text-black text-xl lg:text-[26px] font-normal">
              {content.heading.subtitle}
            </h4>
          </div>

          {/* Description */}
          <p className="text-[#B0B0B0] text-base">{content.description}</p>
        </div>

        {/* Right Column - Form */}
        <div className="">
          <JourneyForm content={content} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default JourneyFormSection;
