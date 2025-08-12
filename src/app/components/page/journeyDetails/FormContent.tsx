"use client";
import React from "react";
import { JourneyFormContent } from "../../../types/pageTypes/journeyFormTypes";

interface FormContentProps {
  content: JourneyFormContent;
  formData?: { firstName?: string } | null;
}

const FormContent: React.FC<FormContentProps> = ({
  formData,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-black text-xl lg:text-[26px] font-normal">
          Hello {formData?.firstName}
        </h2>

        <h3 className="text-black text-xl lg:text-[26px] font-normal">
          You are almost there
        </h3>
        <h4 className="text-black text-xl lg:text-[26px] font-normal">
          to the introduce of R.
        </h4>
      </div>
    </div>
  );
};

export default FormContent;
