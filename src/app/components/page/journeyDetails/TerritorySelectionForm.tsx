"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface TerritorySelectionData {
  pincode: string;
  selectedArea: string;
}

interface TerritorySelectionFormProps {
  onSubmit: (data: TerritorySelectionData) => void;
  isSubmitting: boolean;
}

// API response interface
interface PincodeApiResponse {
  Status: string;
  PostOffice: Array<{
    Name: string;
    Description: string;
    BranchType: string;
    DeliveryStatus: string;
    Circle: string;
    District: string;
    Division: string;
    Region: string;
    State: string;
    Country: string;
  }>;
}

// Function to fetch area suggestions from India Post API
const getAreaSuggestions = async (pincode: string): Promise<string[]> => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    console.log(response);
    const data: PincodeApiResponse[] = await response.json();
    
    if (data[0]?.Status === "Success" && data[0]?.PostOffice) {
      // Extract unique area names from post offices
      const areas = data[0].PostOffice.map(office => office.Name);
      return [...new Set(areas)]; // Remove duplicates
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching pincode data:", error);
    return [];
  }
};

const TerritorySelectionForm: React.FC<TerritorySelectionFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [areaSuggestions, setAreaSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TerritorySelectionData>({
    defaultValues: {
      pincode: "",
      selectedArea: "",
    },
  });

  const pincode = watch("pincode");
  const selectedArea = watch("selectedArea");

  // Debounced pincode search with real API
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (pincode && pincode.length === 6) {
        setIsLoading(true);
        setApiError("");
        
        try {
          const suggestions = await getAreaSuggestions(pincode);
          setAreaSuggestions(suggestions);
          setShowSuggestions(suggestions.length > 0);
          
          if (suggestions.length === 0) {
            setApiError("No areas found for this pincode. Please check the pincode.");
          }
        } catch (error) {
          console.error("API Error:", error);
          setApiError("Unable to fetch area data. Please try again.");
          setAreaSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setAreaSuggestions([]);
        setShowSuggestions(false);
        setApiError("");
      }
    }, 500); // Increased debounce time for API calls

    return () => clearTimeout(timeoutId);
  }, [pincode]);

  const handleAreaSelect = (area: string) => {
    setValue("selectedArea", area);
    setShowSuggestions(false);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setValue("pincode", value);
    setApiError(""); // Clear previous errors
  };

  return (
    <div className="p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-26 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6 lg:mx-auto">
          <div className="space-y-1">
            <h2 className="text-black text-xl lg:text-[26px] font-normal lg:mx-auto">
              Which area/territory do you belong to?
            </h2>
          </div>    
        </div>

        {/* Right Column - Territory Selection Form */}
        <div className="lg:px-8 px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Pincode Input */}
            <div>
              <div className="relative">
                <input
                  {...register("pincode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Please enter a valid 6-digit pincode",
                    },
                    onChange: handlePincodeChange,
                  })}
                  type="text"
                  placeholder={selectedArea ? `Selected: ${selectedArea}` : "Enter your pincode"}
                  className={`w-full px-2 py-3 bg-white border-b-2 rounded-t-lg transition-all duration-300 outline-none font-light text-gray-700 ${
                    pincode && pincode.length === 6
                      ? "border-black bg-white"
                      : "border-gray-300 focus:border-black hover:bg-gray-50"
                  } ${errors.pincode ? "border-red-500" : ""}`}
                  maxLength={6}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                We will suggest the area based on Pincode
              </p>
              {errors.pincode && (
                <p className="mt-2 text-sm text-red-500 font-medium">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            {/* Area Suggestions */}
            {showSuggestions && areaSuggestions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your area
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-2">
                    {areaSuggestions.map((area, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAreaSelect(area)}
                        className={`w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                          selectedArea === area
                            ? "bg-black text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
                {errors.selectedArea && (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    {errors.selectedArea.message}
                  </p>
                )}
              </div>
            )}

            {/* API Error Message */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  {apiError}
                </p>
              </div>
            )}

            {/* No suggestions message */}
            {showSuggestions && areaSuggestions.length === 0 && !isLoading && !apiError && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  No areas found for this pincode. Please check the pincode or contact support.
                </p>
              </div>
            )}

            {/* Hidden input for selectedArea validation */}
            <input
              type="hidden"
              {...register("selectedArea", {
                required: "Please select an area",
              })}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !pincode || pincode.length !== 6 || !selectedArea}
              className="bg-black lg:text-base text-base tracking-wide hover:bg-gray-800 cursor-pointer text-white font-light px-8 py-2.5 rounded-full transition-colors duration-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerritorySelectionForm;
