"use client";
import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import Image from "next/image";

interface PhoneInputWithCountryProps {
  name: string;
  placeholder: string;
  validation?: {
    required?: string | boolean;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}

const PhoneInputWithCountry: React.FC<PhoneInputWithCountryProps> = ({
  name,
  placeholder,
  validation,
  register,
  errors,
  watch,
  setValue,
  focusedField,
  setFocusedField,
}) => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const value = watch(name);
  const countryCode = watch("countryCode") || "+91";
  const isFocused = focusedField === name;
  const hasValue = value && value.length > 0;

  const countries = [
    { code: "+93", name: "Afghanistan", iso: "af" },
    { code: "+355", name: "Albania", iso: "al" },
    { code: "+213", name: "Algeria", iso: "dz" },
    { code: "+376", name: "Andorra", iso: "ad" },
    { code: "+244", name: "Angola", iso: "ao" },
    { code: "+1", name: "Antigua and Barbuda", iso: "ag" },
    { code: "+54", name: "Argentina", iso: "ar" },
    { code: "+374", name: "Armenia", iso: "am" },
    { code: "+61", name: "Australia", iso: "au" },
    { code: "+43", name: "Austria", iso: "at" },
    { code: "+994", name: "Azerbaijan", iso: "az" },
    { code: "+1", name: "Bahamas", iso: "bs" },
    { code: "+973", name: "Bahrain", iso: "bh" },
    { code: "+880", name: "Bangladesh", iso: "bd" },
    { code: "+1", name: "Barbados", iso: "bb" },
    { code: "+375", name: "Belarus", iso: "by" },
    { code: "+32", name: "Belgium", iso: "be" },
    { code: "+501", name: "Belize", iso: "bz" },
    { code: "+229", name: "Benin", iso: "bj" },
    { code: "+975", name: "Bhutan", iso: "bt" },
    { code: "+591", name: "Bolivia", iso: "bo" },
    { code: "+387", name: "Bosnia and Herzegovina", iso: "ba" },
    { code: "+267", name: "Botswana", iso: "bw" },
    { code: "+55", name: "Brazil", iso: "br" },
    { code: "+673", name: "Brunei", iso: "bn" },
    { code: "+359", name: "Bulgaria", iso: "bg" },
    { code: "+226", name: "Burkina Faso", iso: "bf" },
    { code: "+257", name: "Burundi", iso: "bi" },
    { code: "+855", name: "Cambodia", iso: "kh" },
    { code: "+237", name: "Cameroon", iso: "cm" },
    { code: "+1", name: "Canada", iso: "ca" },
    { code: "+238", name: "Cape Verde", iso: "cv" },
    { code: "+236", name: "Central African Republic", iso: "cf" },
    { code: "+235", name: "Chad", iso: "td" },
    { code: "+56", name: "Chile", iso: "cl" },
    { code: "+86", name: "China", iso: "cn" },
    { code: "+57", name: "Colombia", iso: "co" },
    { code: "+269", name: "Comoros", iso: "km" },
    { code: "+242", name: "Congo", iso: "cg" },
    { code: "+506", name: "Costa Rica", iso: "cr" },
    { code: "+385", name: "Croatia", iso: "hr" },
    { code: "+53", name: "Cuba", iso: "cu" },
    { code: "+357", name: "Cyprus", iso: "cy" },
    { code: "+420", name: "Czech Republic", iso: "cz" },
    { code: "+45", name: "Denmark", iso: "dk" },
    { code: "+253", name: "Djibouti", iso: "dj" },
    { code: "+1", name: "Dominica", iso: "dm" },
    { code: "+1", name: "Dominican Republic", iso: "do" },
    { code: "+670", name: "East Timor", iso: "tl" },
    { code: "+593", name: "Ecuador", iso: "ec" },
    { code: "+20", name: "Egypt", iso: "eg" },
    { code: "+503", name: "El Salvador", iso: "sv" },
    { code: "+240", name: "Equatorial Guinea", iso: "gq" },
    { code: "+291", name: "Eritrea", iso: "er" },
    { code: "+372", name: "Estonia", iso: "ee" },
    { code: "+268", name: "Eswatini", iso: "sz" },
    { code: "+251", name: "Ethiopia", iso: "et" },
    { code: "+679", name: "Fiji", iso: "fj" },
    { code: "+358", name: "Finland", iso: "fi" },
    { code: "+33", name: "France", iso: "fr" },
    { code: "+241", name: "Gabon", iso: "ga" },
    { code: "+220", name: "Gambia", iso: "gm" },
    { code: "+995", name: "Georgia", iso: "ge" },
    { code: "+49", name: "Germany", iso: "de" },
    { code: "+233", name: "Ghana", iso: "gh" },
    { code: "+30", name: "Greece", iso: "gr" },
    { code: "+1", name: "Grenada", iso: "gd" },
    { code: "+502", name: "Guatemala", iso: "gt" },
    { code: "+224", name: "Guinea", iso: "gn" },
    { code: "+245", name: "Guinea-Bissau", iso: "gw" },
    { code: "+592", name: "Guyana", iso: "gy" },
    { code: "+509", name: "Haiti", iso: "ht" },
    { code: "+504", name: "Honduras", iso: "hn" },
    { code: "+36", name: "Hungary", iso: "hu" },
    { code: "+354", name: "Iceland", iso: "is" },
    { code: "+91", name: "India", iso: "in" },
    { code: "+62", name: "Indonesia", iso: "id" },
    { code: "+98", name: "Iran", iso: "ir" },
    { code: "+964", name: "Iraq", iso: "iq" },
    { code: "+353", name: "Ireland", iso: "ie" },
    { code: "+972", name: "Israel", iso: "il" },
    { code: "+39", name: "Italy", iso: "it" },
    { code: "+1", name: "Jamaica", iso: "jm" },
    { code: "+81", name: "Japan", iso: "jp" },
    { code: "+962", name: "Jordan", iso: "jo" },
    { code: "+7", name: "Kazakhstan", iso: "kz" },
    { code: "+254", name: "Kenya", iso: "ke" },
    { code: "+686", name: "Kiribati", iso: "ki" },
    { code: "+82", name: "Korea, South", iso: "kr" },
    { code: "+965", name: "Kuwait", iso: "kw" },
    { code: "+996", name: "Kyrgyzstan", iso: "kg" },
    { code: "+856", name: "Laos", iso: "la" },
    { code: "+371", name: "Latvia", iso: "lv" },
    { code: "+961", name: "Lebanon", iso: "lb" },
    { code: "+266", name: "Lesotho", iso: "ls" },
    { code: "+231", name: "Liberia", iso: "lr" },
    { code: "+218", name: "Libya", iso: "ly" },
    { code: "+423", name: "Liechtenstein", iso: "li" },
    { code: "+370", name: "Lithuania", iso: "lt" },
    { code: "+352", name: "Luxembourg", iso: "lu" },
    { code: "+261", name: "Madagascar", iso: "mg" },
    { code: "+265", name: "Malawi", iso: "mw" },
    { code: "+60", name: "Malaysia", iso: "my" },
    { code: "+960", name: "Maldives", iso: "mv" },
    { code: "+223", name: "Mali", iso: "ml" },
    { code: "+356", name: "Malta", iso: "mt" },
    { code: "+692", name: "Marshall Islands", iso: "mh" },
    { code: "+222", name: "Mauritania", iso: "mr" },
    { code: "+230", name: "Mauritius", iso: "mu" },
    { code: "+52", name: "Mexico", iso: "mx" },
    { code: "+691", name: "Micronesia", iso: "fm" },
    { code: "+373", name: "Moldova", iso: "md" },
    { code: "+377", name: "Monaco", iso: "mc" },
    { code: "+976", name: "Mongolia", iso: "mn" },
    { code: "+382", name: "Montenegro", iso: "me" },
    { code: "+212", name: "Morocco", iso: "ma" },
    { code: "+258", name: "Mozambique", iso: "mz" },
    { code: "+95", name: "Myanmar", iso: "mm" },
    { code: "+264", name: "Namibia", iso: "na" },
    { code: "+674", name: "Nauru", iso: "nr" },
    { code: "+977", name: "Nepal", iso: "np" },
    { code: "+31", name: "Netherlands", iso: "nl" },
    { code: "+64", name: "New Zealand", iso: "nz" },
    { code: "+505", name: "Nicaragua", iso: "ni" },
    { code: "+227", name: "Niger", iso: "ne" },
    { code: "+234", name: "Nigeria", iso: "ng" },
    { code: "+47", name: "Norway", iso: "no" },
    { code: "+968", name: "Oman", iso: "om" },
    { code: "+92", name: "Pakistan", iso: "pk" },
    { code: "+680", name: "Palau", iso: "pw" },
    { code: "+507", name: "Panama", iso: "pa" },
    { code: "+675", name: "Papua New Guinea", iso: "pg" },
    { code: "+595", name: "Paraguay", iso: "py" },
    { code: "+51", name: "Peru", iso: "pe" },
    { code: "+63", name: "Philippines", iso: "ph" },
    { code: "+48", name: "Poland", iso: "pl" },
    { code: "+351", name: "Portugal", iso: "pt" },
    { code: "+974", name: "Qatar", iso: "qa" },
    { code: "+40", name: "Romania", iso: "ro" },
    { code: "+7", name: "Russia", iso: "ru" },
    { code: "+250", name: "Rwanda", iso: "rw" },
    { code: "+1", name: "Saint Kitts and Nevis", iso: "kn" },
    { code: "+1", name: "Saint Lucia", iso: "lc" },
    { code: "+1", name: "Saint Vincent and the Grenadines", iso: "vc" },
    { code: "+685", name: "Samoa", iso: "ws" },
    { code: "+378", name: "San Marino", iso: "sm" },
    { code: "+239", name: "Sao Tome and Principe", iso: "st" },
    { code: "+966", name: "Saudi Arabia", iso: "sa" },
    { code: "+221", name: "Senegal", iso: "sn" },
    { code: "+381", name: "Serbia", iso: "rs" },
    { code: "+248", name: "Seychelles", iso: "sc" },
    { code: "+232", name: "Sierra Leone", iso: "sl" },
    { code: "+65", name: "Singapore", iso: "sg" },
    { code: "+421", name: "Slovakia", iso: "sk" },
    { code: "+386", name: "Slovenia", iso: "si" },
    { code: "+677", name: "Solomon Islands", iso: "sb" },
    { code: "+252", name: "Somalia", iso: "so" },
    { code: "+27", name: "South Africa", iso: "za" },
    { code: "+34", name: "Spain", iso: "es" },
    { code: "+94", name: "Sri Lanka", iso: "lk" },
    { code: "+249", name: "Sudan", iso: "sd" },
    { code: "+597", name: "Suriname", iso: "sr" },
    { code: "+46", name: "Sweden", iso: "se" },
    { code: "+41", name: "Switzerland", iso: "ch" },
    { code: "+963", name: "Syria", iso: "sy" },
    { code: "+886", name: "Taiwan", iso: "tw" },
    { code: "+992", name: "Tajikistan", iso: "tj" },
    { code: "+255", name: "Tanzania", iso: "tz" },
    { code: "+66", name: "Thailand", iso: "th" },
    { code: "+228", name: "Togo", iso: "tg" },
    { code: "+676", name: "Tonga", iso: "to" },
    { code: "+1", name: "Trinidad and Tobago", iso: "tt" },
    { code: "+216", name: "Tunisia", iso: "tn" },
    { code: "+90", name: "Turkey", iso: "tr" },
    { code: "+993", name: "Turkmenistan", iso: "tm" },
    { code: "+688", name: "Tuvalu", iso: "tv" },
    { code: "+256", name: "Uganda", iso: "ug" },
    { code: "+380", name: "Ukraine", iso: "ua" },
    { code: "+971", name: "United Arab Emirates", iso: "ae" },
    { code: "+44", name: "United Kingdom", iso: "gb" },
    { code: "+1", name: "United States", iso: "us" },
    { code: "+598", name: "Uruguay", iso: "uy" },
    { code: "+998", name: "Uzbekistan", iso: "uz" },
    { code: "+678", name: "Vanuatu", iso: "vu" },
    { code: "+58", name: "Venezuela", iso: "ve" },
    { code: "+84", name: "Vietnam", iso: "vn" },
    { code: "+967", name: "Yemen", iso: "ye" },
    { code: "+260", name: "Zambia", iso: "zm" },
    { code: "+263", name: "Zimbabwe", iso: "zw" },
  ];

  const selectedCountry = countries.find(country => country.code === countryCode) || countries[0];

  const handleCountrySelect = (country: typeof countries[0]) => {
    setValue("countryCode", country.code);
    setIsCountryDropdownOpen(false);
  };

  const handleImageError = (iso: string) => {
    setImageError(prev => ({ ...prev, [iso]: true }));
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-dropdown-container')) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        {/* Country Code Dropdown */}
        <div className="absolute left-3 top-6 transform -translate-y-1/2 z-20 country-dropdown-container">
          <button
            type="button"
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 bg-transparent border-none outline-none cursor-pointer"
          >
            <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 relative">
              {!imageError[selectedCountry.iso] ? (
                <Image
                  src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                  alt={`${selectedCountry.name} flag`}
                  width={24}
                  height={16}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(selectedCountry.iso)}
                  unoptimized // Since we're using external images
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                  {selectedCountry.code.slice(1)}
                </div>
              )}
            </div>
            <span className="text-base font-normal text-black">{selectedCountry.code}</span>
          </button>

          {/* Country Dropdown */}
          {isCountryDropdownOpen && (
            <div className="absolute top-full -left-3 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-30 lg:min-w-80 min-w-full">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                    country.code === countryCode ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 relative">
                    {!imageError[country.iso] ? (
                      <Image
                        src={`https://flagcdn.com/w40/${country.iso}.png`}
                        alt={`${country.name} flag`}
                        width={24}
                        height={16}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(country.iso)}
                        unoptimized // Since we're using external images
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600">
                        {country.code.slice(1)}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{country.code}</span>
                  <span className="text-sm text-gray-600">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          {...register(name, validation)}
          type="tel"
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          className={`w-full pl-20 pr-3 py-3 bg-white border-b-2 text-base rounded-t-lg transition-all duration-300 outline-none font-light text-gray-700 ${
            isFocused
              ? "border-black bg-white transform shadow-sm"
              : "border-gray-300 focus:border-black hover:bg-gray-50"
          } ${errors[name] ? "border-red-500" : ""}`}
          placeholder={placeholder}
          maxLength={15}
        />

        {/* Clear Button */}
        {hasValue && (
          <button
            type="button"
            onClick={() => setValue(name, "")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Error Message */}
      {errors[name] && (
        <p className="mt-0.5 text-sm text-red-500 font-light">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default PhoneInputWithCountry;
