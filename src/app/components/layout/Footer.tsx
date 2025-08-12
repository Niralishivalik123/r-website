import Link from 'next/link';
import { FooterProps } from '../../types/layoutTypes/footerTypes';
import { FOOTER_DATA } from '../../utils/constant/layoutConstant/footerConstant';
import Image from 'next/image';

const Footer: React.FC<Partial<FooterProps>> = ({
  content = FOOTER_DATA.content,
}) => {
  return (
    <footer className="w-full bg-white py-8 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Upper Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 lg:p-10 p-6">
          {/* Logo */}
          <div className="mb-4 sm:mb-0">
            <Image
              src="/r-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            {content.links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-[#7A7A7A] hover:text-black transition-colors duration-200 text-sm lg:text-base"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-[#CACACA] mb-6"></div>

        {/* Lower Section - Copyright */}
        <div className="text-center lg:p-6">
          <p className="text-[#A5A5A5] text-sm">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
