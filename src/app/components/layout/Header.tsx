import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-6">
          {/* Large R Logo */}
          <div className="flex items-center">
            <Image
              src="/r-logo.png"
              alt="R Logo"
              width={40}
              height={40}
              className="w-8 h-16"
            />
          </div>

          {/* Login Button - Pill Shaped */}
          {/* <button className="bg-[#B3B3B3] hover:bg-gray-400 text-white font-medium px-10 py-2.5 rounded-full transition-colors duration-200 cursor-pointer">
            Login
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
