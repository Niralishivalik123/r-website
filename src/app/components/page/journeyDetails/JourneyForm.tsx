"use client"
import React, { useState } from 'react';
import { JourneyFormProps } from '../../../types/pageTypes/journeyFormTypes';

const JourneyForm: React.FC<JourneyFormProps> = ({ content, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First Row - First Name and Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Second Row - Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Third Row - Phone with Country Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="px-4 py-3 bg-white border border-gray-200 rounded-lg flex items-center">
          <span className="text-gray-600 font-medium">+91</span>
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Mobile"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Disclaimer */}
      <p className="text-gray-500 text-sm">
        {content.disclaimer}
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
      >
        {content.buttonText}
      </button>
    </form>
  );
};

export default JourneyForm;
