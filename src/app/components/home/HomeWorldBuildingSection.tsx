import Image from "next/image";
import { HomeWorldBuildingSectionProps } from "../../types/homeTypes/homeWorldBuildingSectionTypes";
import { HOME_WORLD_BUILDING_SECTION_DATA } from "../../utils/constant/homeConstant/homeWorldBuildingSectionConstant";

const HomeWorldBuildingSection: React.FC<
  Partial<HomeWorldBuildingSectionProps>
> = ({ content = HOME_WORLD_BUILDING_SECTION_DATA.content }) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="lg:mb-24 mb-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-black text-2xl lg:text-4xl font-normal tracking-wide">
              {content.title}
            </h2>
          </div>

          {/* Large Letter */}
          <div className="text-center w-full h-12 flex items-center justify-center">
            <Image
              src="/r-logo.png"
              alt="World Building"
              priority
              width={36}
              height={46}
            />
          </div>
        </div>
        {/* Main Content Block */}
        <div className="bg-white border border-[#CACACA] rounded-[28px] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Our Story */}
            <div className="lg:col-span-1 bg-[#F1F1F1] border-r border-[#CACACA] lg:p-20 p-10 flex items-center justify-center">
              <h3 className="text-black text-xl lg:text-4xl font-normal text-center">
                {content.leftSection.title}
              </h3>
            </div>

            {/* Right Section - Description */}
            <div className="lg:col-span-2 bg-white flex items-center lg:p-20 p-10">
              <p className="text-black text-base lg:text-xl font-light leading-relaxed tracking-wide">
                {content.rightSection.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWorldBuildingSection;
