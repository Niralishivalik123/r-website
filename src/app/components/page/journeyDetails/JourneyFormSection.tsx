import React from "react";
import { useRouter } from "next/navigation";
import { JourneyFormSectionProps } from "../../../types/pageTypes/journeyFormTypes";
import { JOURNEY_FORM_DATA } from "../../../utils/constant/pageConstant/journeyFormConstant";
import JourneyForm, { JourneyFormData } from "./JourneyForm";

const JourneyFormSection: React.FC<Partial<JourneyFormSectionProps>> = ({
  content = JOURNEY_FORM_DATA.content,
}) => {
  const router = useRouter();

  const handleSubmit = (data: JourneyFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    router.push("/");
  };

  return <JourneyForm content={content} onSubmit={handleSubmit} />;
};

export default JourneyFormSection;
