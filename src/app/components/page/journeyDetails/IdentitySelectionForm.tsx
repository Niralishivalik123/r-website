"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoChevronDown } from "react-icons/io5";

interface IdentitySelectionData {
  identity: string;
  workingProfessionalRole?: string;
}

interface IdentitySelectionFormProps {
  onSubmit: (data: IdentitySelectionData) => void;
  isSubmitting: boolean;
}

const IdentitySelectionForm: React.FC<IdentitySelectionFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [isIdentityDropdownOpen, setIsIdentityDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IdentitySelectionData>({
    defaultValues: {
      identity: "",
      workingProfessionalRole: "",
    },
  });

  const selectedIdentity = watch("identity");

  const identityOptions = [
    "Land Owner",
    "Real Estate Developer",
    "Architect / Design Consultant",
    "Civil / MEP Contractor",
    "Project Management Consultant (PMC)",
    "Government Liaison Consultant",
    "Legal / RERA Consultant",
    "CA / Financial Advisor",
    "Channel Partner / Broker",
    "Digital Marketing Agency",
    "Interior Designer",
    "Investor / Investment Firm",
    "Technology Provider",
    "Material / Product Supplier",
    "Facility Management / Property Ops",
    "New Entrants/ Explorer",
    "Working Professionals (Job in Real Estate)",
  ];

  const workingProfessionalRoles = [
    "Land Acquisition",
    "Design / Project Planning",
    "Legal / Compliance",
    "Sales",
    "Marketing / Branding",
    "CRM / Customer Experience",
    "Finance & Accounts",
    "Strategy & Investments",
    "Site Execution",
    "Liaisoning",
    "IT / Automation",
    "HR / Admin",
    "Leasing & Asset Management",
    "Investor Relations",
  ];

  const handleIdentitySelect = (identity: string, onChange: (value: string) => void) => {
    onChange(identity);
    setIsIdentityDropdownOpen(false);
    if (identity !== "Working Professionals (Job in Real Estate)") {
      setValue("workingProfessionalRole", "");
    }
  };

  const handleRoleSelect = (role: string, onChange: (value: string) => void) => {
    onChange(role);
    setIsRoleDropdownOpen(false);
  };

  return (
    <div className="p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center">
        {/* Left Column - Content */}
        <h2 className="text-black text-xl lg:text-[26px] font-normal lg:mx-auto">
          Who are you?
        </h2>

        {/* Right Column - Identity Selection Form */}
        <div className="lg:px-8 px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Identity Selection */}
            <Controller
              name="identity"
              control={control}
              rules={{ required: "Please select your identity" }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select the identity that best describes you.
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsIdentityDropdownOpen(!isIdentityDropdownOpen)
                      }
                      className={`w-full px-2 py-3 text-left bg-white border-b-2 rounded-t-lg transition-all duration-300 outline-none font-light text-gray-700 flex items-center justify-between ${
                        value
                          ? "border-black bg-white"
                          : "border-gray-300 hover:bg-gray-50"
                      } ${errors.identity ? "border-red-500" : ""}`}
                    >
                      <span
                        className={
                          value ? "text-gray-900" : "text-gray-500"
                        }
                      >
                        {value || "Select your identity"}
                      </span>
                      <IoChevronDown
                        size={20}
                        className={`text-gray-500 transition-transform duration-300 ${
                          isIdentityDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Identity Dropdown */}
                    {isIdentityDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
                        {identityOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleIdentitySelect(option, onChange)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.identity && (
                    <p className="mt-3 text-sm text-red-600 font-semibold bg-red-50 px-3 py-2 rounded-md border border-red-200">
                      {errors.identity.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Working Professional Role (Conditional) */}
            {selectedIdentity ===
              "Working Professionals (Job in Real Estate)" && (
              <Controller
                name="workingProfessionalRole"
                control={control}
                rules={{ required: "Please select your role" }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What is your role?
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                        className={`w-full px-2 py-3 text-left bg-white border-b-2 rounded-t-lg transition-all duration-300 outline-none font-light text-gray-700 flex items-center justify-between ${
                          value
                            ? "border-black bg-white"
                            : "border-gray-300 hover:bg-gray-50"
                        } ${
                          errors.workingProfessionalRole ? "border-red-500" : ""
                        }`}
                      >
                        <span
                          className={
                            value ? "text-gray-900" : "text-gray-500"
                          }
                        >
                          {value || "Select your role"}
                        </span>
                        <IoChevronDown
                          size={20}
                          className={`text-gray-500 transition-transform duration-300 ${
                            isRoleDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Role Dropdown */}
                      {isRoleDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
                          {workingProfessionalRoles.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleRoleSelect(role, onChange)}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                                         {errors.workingProfessionalRole && (
                       <p className="mt-3 text-sm text-red-600 font-semibold bg-red-50 px-3 py-2 rounded-md border border-red-200">
                         {errors.workingProfessionalRole.message}
                       </p>
                       )}
                  </div>
                )}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !selectedIdentity ||
                (selectedIdentity ===
                  "Working Professionals (Job in Real Estate)" &&
                  !watch("workingProfessionalRole"))
              }
              className="bg-black lg:text-base text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-2.5 rounded-full transition-colors duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "Proceed"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IdentitySelectionForm;
