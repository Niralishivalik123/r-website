import Image from "next/image";
import { HomeBannerSectionProps } from "../../types/homeTypes/homeBannerSectionsTypes";
import { HOME_BANNER_SECTION_DATA } from "../../utils/constant/homeConstant/homeBannerSectionsConstant";

const HomeBannerSection: React.FC<Partial<HomeBannerSectionProps>> = ({
  title = HOME_BANNER_SECTION_DATA.title,
  subtitle = HOME_BANNER_SECTION_DATA.subtitle,
  description = HOME_BANNER_SECTION_DATA.description,
}) => {
  return (
    <section className="w-full lg:py-12 py-10 px-8 bg-white">
      <div className="lg:max-w-6xl max-w-full mx-auto">
        <div className="bg-[#F1F1F1] rounded-[28px] p-8 lg:p-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-0">
              <h1 className="lg:text-4xl font-normal leading-relaxed text-black">
                {title}
              </h1>
              <h2 className="lg:text-4xl font-normal leading-relaxed text-black">
                {subtitle}
              </h2>
              <h4 className="lg:text-4xl font-normal leading-relaxed text-black">
                {description}
              </h4>
            </div>

            {/* Banner Element Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full h-56">
                <Image
                  src="/banner/banner-element.png"
                  alt="Home Banner Section Graphic"
                  priority
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBannerSection;
