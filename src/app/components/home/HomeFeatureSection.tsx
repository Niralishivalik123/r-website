import Image from 'next/image';
import { HomeFeatureSectionProps } from '../../types/homeTypes/homeFeatureSectionTypes';
import { HOME_FEATURE_SECTION_DATA } from '../../utils/constant/homeConstant/homeFeatureSectionConstant';

const HomeFeatureSection: React.FC<Partial<HomeFeatureSectionProps>> = ({
  cards = HOME_FEATURE_SECTION_DATA.cards,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="lg:max-w-6xl max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="bg-white lg:p-14 p-8 border border-[#CACACA] rounded-[28px] lg:space-y-16 space-y-10">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="relative w-full h-24">
                  <Image
                    src={card.icon}
                    alt={`Feature ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text */}
              <p className="text-center text-black font-light tracking-wide lg:text-xl text-base leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureSection;
