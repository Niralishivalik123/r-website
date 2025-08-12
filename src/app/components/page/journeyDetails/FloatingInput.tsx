"use client";
import React from "react";
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { IoSearch, IoClose } from "react-icons/io5";

interface FloatingInputProps {
  name: string;
  placeholder: string;
  type?: string;
  icon?: "search" | "none";
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

const FloatingInput: React.FC<FloatingInputProps> = ({
  name,
  placeholder,
  type = "text",
  icon = "none",
  validation,
  register,
  errors,
  watch,
  setValue,
  focusedField,
  setFocusedField,
}) => {
  const value = watch(name);
  const isFocused = focusedField === name;
  const hasValue = value && value.length > 0;

  const getIcon = () => {
    switch (icon) {
      case "search":
        return <IoSearch size={18} className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        {icon !== "none" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 transition-all duration-300">
            {getIcon()}
          </div>
        )}
        <input
          {...register(name, validation)}
          type={type}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          className={`w-full px-3 py-3 bg-white border-b-2 rounded-t-lg transition-all duration-300 outline-none font-light text-gray-700 text-base ${
            icon !== "none" ? "pl-10" : ""
          } ${
            isFocused
              ? "border-black bg-white transform shadow-sm"
              : "border-gray-300 focus:border-black hover:bg-gray-50"
          } ${errors[name] ? "border-red-500" : ""}`}
          placeholder={ placeholder}
        />
        {hasValue && (
          <button
            type="button"
            onClick={() => setValue(name, "")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
          >
            <IoClose size={18} />
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="mt-0.5 text-sm text-red-500 font-light">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
