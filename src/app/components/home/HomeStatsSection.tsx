import { HomeStatsSectionProps } from '../../types/homeTypes/homeStatsSectionTypes';
import { HOME_STATS_SECTION_DATA } from '../../utils/constant/homeConstant/homeStatsSectionConstant';

const HomeStatsSection: React.FC<Partial<HomeStatsSectionProps>> = ({
  stats = HOME_STATS_SECTION_DATA.stats,
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {/* Large Number/Symbol */}
              <div className="mb-2.5">
                <span className="text-black text-3xl lg:text-4xl font-normal">
                  {stat.value}
                </span>
              </div>
              
              {/* Descriptive Text */}
              <div>
                <p className="text-black text-lg lg:text-xl font-normal tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStatsSection;
