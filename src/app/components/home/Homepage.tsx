import React from 'react';
import HomeBannerSection from './HomeBannerSection';
import HomeJourneySection from './HomeJourneySection';
import HomeFeatureSection from './HomeFeatureSection';
import HomeWorldBuildingSection from './HomeWorldBuildingSection';
import HomeStatsSection from './HomeStatsSection';
import HomeOnboardingSection from './HomeOnboardingSection';

const HomePage: React.FC = () => {
  return (
    <div>     
      <HomeBannerSection />
      <HomeJourneySection />
      <HomeFeatureSection />
      <HomeWorldBuildingSection />
      <HomeStatsSection />
      <HomeOnboardingSection />
    </div>
  );
};

export default HomePage;
