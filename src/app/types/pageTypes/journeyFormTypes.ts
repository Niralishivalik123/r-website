export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
}

export interface JourneyFormContent {
  heading: {
    greeting: string;
    title: string;
    subtitle: string;
  };
  description: string;
  disclaimer: string;
  buttonText: string;
  fields: FormField[];
}

export interface JourneyFormSectionProps {
  content: JourneyFormContent;
  isOpen: boolean;
  onClose: () => void;
}

export interface JourneyFormProps {
  content: JourneyFormContent;
  onSubmit: (data: any) => void;
}

export interface JourneyFormData {
  content: JourneyFormContent;
}
