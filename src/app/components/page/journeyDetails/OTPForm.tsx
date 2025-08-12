"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { JourneyFormData } from "./JourneyForm";

interface OTPFormData {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
}

interface OTPFormProps {
  formData: JourneyFormData | null;
  otpTimer: number;
  isSubmitting: boolean;
  onOTPSubmit: (otpData: OTPFormData) => Promise<void>;
  onEditNumber: () => void;
  onResendOTP: () => void;
  canResend: boolean;
}

const OTPForm: React.FC<OTPFormProps> = ({
  otpTimer,
  isSubmitting,
  onOTPSubmit,
  onResendOTP,
  canResend,
}) => {
  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: otpErrors },
  } = useForm<OTPFormData>();

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  // };

  return (
    <div>
      <h1 className="mb-4 text-base font-normal text-left lg:text-lg text-black">
        Verify Your Mobile
      </h1>

      {/* <p className="mb-4 text-base text-left text-gray-600 lg:text-base">
        We&apos;ve sent a secure verification code to{" "}
        {formData?.countryCode}{" "}
        {formData?.phoneNumber
          ? `****${formData.phoneNumber.slice(-4)}`
          : ""}
        .
      </p> */}

      {/* <div className="mb-6 text-left">
        <p className="text-sm text-gray-600">
          OTP expires in:{" "}
          <span
            className={`font-medium ${
              otpTimer <= 10 ? "text-red-500" : "text-black"
            }`}
          >
            {formatTime(otpTimer)}
          </span>
        </p>
      </div> */}

      <div className="">
        <form onSubmit={handleSubmitOTP(onOTPSubmit)} className="space-y-6">
          <div>
            <div className="flex justify-between space-x-1 md:space-x-4 md:justify-start lg:justify-start lg:space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  {...registerOTP(`otp${index}` as keyof OTPFormData, {
                    required: "OTP is required",
                    pattern: {
                      value: /^[0-9]$/,
                      message: "Please enter a digit",
                    },
                    onChange: (e) => {
                      const value = e.target.value;
                      if (value && index < 3) {
                        const inputs =
                          e.target.parentElement?.querySelectorAll("input");
                        if (inputs && inputs[index + 1]) {
                          (inputs[index + 1] as HTMLInputElement).focus();
                        }
                      }
                    },
                  })}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      e.key === "Backspace" &&
                      !e.currentTarget.value &&
                      index > 0
                    ) {
                      const inputs = (
                        e.target as HTMLInputElement
                      ).parentElement?.querySelectorAll("input");
                      if (inputs && inputs[index - 1]) {
                        const prevInput = inputs[index - 1] as HTMLInputElement;
                        prevInput.focus();
                        prevInput.value = "";
                      }
                    }
                  }}
                  className={`w-8 h-8 lg:w-12 lg:h-12 md:w-10 md:h-10 bg-white rounded-lg font-ligh focus:ring-0 text-neutral-900 text-center text-base sm:text-xl outline-none ${
                    otpErrors[`otp${index}` as keyof OTPFormData]
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="*"
                />
              ))}
            </div>
            {(otpErrors.otp0 ||
              otpErrors.otp1 ||
              otpErrors.otp2 ||
              otpErrors.otp3) && (
              <p className="mt-0.5 text-sm font-light text-red-500">
                Please enter a complete 4-digit OTP
              </p>
            )}
          </div>

          <div className="mt-4 text-left">
            <p className="text-sm text-black">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                disabled={!canResend}
                className={`underline hover:no-underline ${
                  !canResend ? "text-gray-400 cursor-not-allowed" : "text-red-700"
                }`}
                onClick={onResendOTP}
              >
                {!canResend ? `Resend in ${otpTimer}s` : "Resend OTP"}
              </button>
            </p>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row justify-start lg:items-center items-start lg:gap-4 md:gap-3 gap-2.5 lg:mt-8 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-black lg:text-base text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-2.5 rounded-full transition-colors duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
