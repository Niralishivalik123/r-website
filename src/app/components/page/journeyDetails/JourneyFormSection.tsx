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
    
    // Store form data in localStorage for personalized home page display
    try {
      localStorage.setItem('journeyFormData', JSON.stringify(data));
      console.log("Form data stored in localStorage");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
    
    // Redirect to home page
    router.push("/");
  };

  return <JourneyForm content={content} onSubmit={handleSubmit} />;
};

export default JourneyFormSection;
