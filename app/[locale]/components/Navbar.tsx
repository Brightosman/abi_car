'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { SearchContext } from '../context/search';
import { useTranslations } from 'next-intl';
import PromotionBar from './PromotionBar';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const { setSearchActive } = useContext(SearchContext) || {};
  const [header, setHeader] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  const [language, setLanguage] = useState<'en' | 'fr'>('en'); // State for language toggle

  const desktopMode = useMediaQuery({
    query: '(min-width: 1300px)',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setHeader(true);
      else setHeader(false);

      if (window.scrollY > 800) setSearchActive?.(true);
      else setSearchActive?.(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setSearchActive]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <>
      {/* Promotion Bar */}
      <PromotionBar />

      {/* Navbar */}
      <header
        className={`${
          header ? 'bg-white shadow-md py-2' : 'bg-transparent shadow-none py-4'
        } fixed top-[48px] w-full z-20 transition-all duration-300`}
      >
        <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="flex justify-between items-center px-4">
            {/* Logo */}
            <Link
              to="home"
              smooth={desktopMode}
              spy={true}
              className="cursor-pointer"
            >
              <Image src={'/logo.png'} width={100} height={32} alt="Logo" />
            </Link>

            {/* Mobile Nav Toggle */}
            <div onClick={() => setNav(!nav)} className="cursor-pointer xl:hidden">
              {nav ? <BiX className="text-4xl" /> : <BiMenuAltRight className="text-4xl" />}
            </div>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              nav ? 'max-h-max py-8 px-4' : 'max-h-0'
            } flex flex-col bg-white gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:gap-x-8 xl:bg-transparent uppercase text-sm xl:text-[15px] xl:normal-case transition-all duration-150 xl:py-0 xl:px-0 xl:max-h-full`}
          >
            {[
              { id: 'home', label: t('Home') },
              { id: 'cars', label: t('Cars') },
              { id: 'about', label: t('About') },
              { id: 'why', label: t('WhyUs') },
              { id: 'testimonial', label: t('Testimonials') },
              { id: 'contact', label: t('Contact') },
            ].map((link) => (
              <Link
                key={link.id}
                className="cursor-pointer"
                to={link.id}
                activeClass="active"
                smooth={desktopMode}
                spy={true}
              >
                {link.label}
              </Link>
            ))}
            {/* CTA (Optional) */}
            <Link
              className="xl:hidden btn btn-primary btn-sm max-w-[164px] mx-auto"
              to="/"
              smooth={desktopMode}
            >
              See all cars
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-800 hover:text-teal-600 focus:outline-none"
            >
              {language === 'en' ? (
                <>
                  <Image
                    src="/fr-flag.png"
                    alt="French"
                    width={24}
                    height={16}
                    className="rounded"
                  />
                  <span>Français</span>
                </>
              ) : (
                <>
                  <Image
                    src="/en-flag.png"
                    alt="English"
                    width={24}
                    height={16}
                    className="rounded"
                  />
                  <span>English</span>
                </>
              )}
            </button>

            <a
              href="#"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </a>
            <a
              href="#"
              className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Get started
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
