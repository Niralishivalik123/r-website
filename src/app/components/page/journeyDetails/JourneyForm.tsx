"use client";
import React, { useState, useEffect } from "react";
import { JourneyFormProps } from "../../../types/pageTypes/journeyFormTypes";
import { useForm } from "react-hook-form";
import FloatingInput from "./FloatingInput";
import PhoneInputWithCountry from "./PhoneInputWithCountry";
import OTPForm from "./OTPForm";
import FormContent from "./FormContent";
import IdentitySelectionForm from "./IdentitySelectionForm";
import TerritorySelectionForm from "./TerritorySelectionForm";

export type JourneyFormData = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  comments?: string;
};

interface OTPFormData {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
}

interface IdentitySelectionData {
  identity: string;
  workingProfessionalRole?: string;
}

interface TerritorySelectionData {
  pincode: string;
  selectedArea: string;
}

const JourneyForm: React.FC<JourneyFormProps> = ({ content, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showIdentitySelection, setShowIdentitySelection] = useState(false);
  const [showTerritorySelection, setShowTerritorySelection] = useState(false);
  const [formData, setFormData] = useState<JourneyFormData | null>(null);
  const [identityData, setIdentityData] = useState<IdentitySelectionData | null>(null);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<JourneyFormData>({
    defaultValues: {
      countryCode: "+91",
      phoneNumber: "",
    },
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, otpTimer]);

  const handleResendOTP = () => {
    if (otpTimer > 0 || !formData) return;
    setOtpTimer(60);
    setIsTimerRunning(true);
  };

  const onFormSubmit = async (data: JourneyFormData) => {
    setIsSubmitting(true);
    setFormData(data);
    setShowOTP(true);
    setOtpTimer(60);
    setIsTimerRunning(true);
    setIsSubmitting(false);
  };

  const onOTPSubmit = async (otpData: OTPFormData) => {
    setIsSubmitting(true);
    try {
      const otpDigits = `${otpData.otp0}${otpData.otp1}${otpData.otp2}${otpData.otp3}`;
      if (otpDigits.length !== 4) {
        throw new Error("Please enter a complete 4-digit OTP");
      }
      // Handle OTP verification here
      console.log("OTP submitted:", otpDigits);
      setIsSubmitting(false);
      setShowOTP(false);
      setShowIdentitySelection(true);
    } catch (error) {
      console.error("OTP verification error:", error);
      setIsSubmitting(false);
    }
  };

  const handleEditNumber = () => {
    setShowOTP(false);
  };

  const onIdentitySubmit = async (data: IdentitySelectionData) => {
    setIsSubmitting(true);
    try {
      // Handle identity selection submission
      console.log("Identity selection:", data);
      setIdentityData(data);
      setIsSubmitting(false);
      setShowIdentitySelection(false);
      setShowTerritorySelection(true);
    } catch (error) {
      console.error("Identity submission error:", error);
      setIsSubmitting(false);
    }
  };

  const onTerritorySubmit = async (data: TerritorySelectionData) => {
    setIsSubmitting(true);
    try {
      // Handle territory selection submission
      console.log("Territory selection:", data);
      console.log("Complete form data:", { 
        ...formData, 
        ...identityData, 
        ...data 
      });
      
      // Call the parent onSubmit with complete data
      if (onSubmit && formData && identityData) {
        await onSubmit({ 
          ...formData, 
          ...identityData, 
          ...data 
        });
      }
      
      setIsSubmitting(false);
    } catch (error) {
      console.error("Territory submission error:", error);
      setIsSubmitting(false);
    }
  };

  // Show Territory Selection Form
  if (showTerritorySelection) {
    return (
      <TerritorySelectionForm
        onSubmit={onTerritorySubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Show Identity Selection Form
  if (showIdentitySelection) {
    return (
      <IdentitySelectionForm
        onSubmit={onIdentitySubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Show OTP Form
  if (showOTP) {
    return (
      <div className="p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center">
          {/* Left Column - Content */}
          <FormContent content={content} formData={formData} />

          {/* Right Column - OTP Form */}
          <OTPForm
            formData={formData}
            otpTimer={otpTimer}
            isSubmitting={isSubmitting}
            onOTPSubmit={onOTPSubmit}
            onEditNumber={handleEditNumber}
            onResendOTP={handleResendOTP}
            canResend={otpTimer === 0}
          />
        </div>
      </div>
    );
  }

  // Show Main Form
  return (
    <>
      <div className="p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
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
            <p className="text-[#B0B0B0] text-base">{content.description}</p>
          </div>

          {/* Right Column - Form */}
          <div className="lg:px-8 px-0">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* First Row - First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput
                  name="firstName"
                  placeholder="First Name"
                  validation={{
                    required: "First Name is required",
                  }}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FloatingInput
                  name="lastName"
                  placeholder="Last Name"
                  validation={{
                    required: "Last Name is required",
                  }}
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              {/* Second Row - Email */}
              <FloatingInput
                name="email"
                type="email"
                placeholder="Enter your email"
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              {/* Third Row - Phone with Country Code */}
              <PhoneInputWithCountry
                name="phoneNumber"
                placeholder="Enter Mobile"
                validation={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                }}
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              {/* Disclaimer */}
              <p className="text-gray-500 text-sm">{content.disclaimer}</p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black lg:text-base text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-2.5 rounded-full transition-colors duration-200"
              >
                {isSubmitting ? "Sending OTP..." : content.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneyForm;
