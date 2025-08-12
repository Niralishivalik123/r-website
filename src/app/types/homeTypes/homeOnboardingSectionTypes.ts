export interface OnboardingContent {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export interface HomeOnboardingSectionProps {
  content: OnboardingContent;
}

export interface OnboardingSectionData {
  content: OnboardingContent;
}
