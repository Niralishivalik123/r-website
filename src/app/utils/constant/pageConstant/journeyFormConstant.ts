import { JourneyFormData } from '../../../types/pageTypes/journeyFormTypes';

export const JOURNEY_FORM_DATA: JourneyFormData = {
  content: {
    heading: {
      greeting: "Dear Fellow,",
      title: "Enter your details",
      subtitle: "To keep connected with the world."
    },
    description: "We will share the latest R update on your given email",
    disclaimer: "We may verify your credentials with respective data.",
    buttonText: "Proceed",
    fields: [
      {
        name: "firstName",
        placeholder: "First Name",
        type: "text",
        required: true
      },
      {
        name: "lastName",
        placeholder: "Last Name",
        type: "text",
        required: true
      },
      {
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        required: true
      },
      {
        name: "phone",
        placeholder: "Enter Mobile",
        type: "tel",
        required: true
      }
    ]
  }
};
