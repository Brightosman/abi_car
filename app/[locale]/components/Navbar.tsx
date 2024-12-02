"use client";

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll'; // React-scroll link for smooth scrolling
import Link from 'next/link'; // Next.js link for routing
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { SearchContext } from '../context/search';
import { useTranslations } from 'next-intl';
import PromotionBar from './PromotionBar';
import LocaleSwitcher from './LocaleSwitcher';

import { SignOutButton, UserButton, useUser } from '@clerk/nextjs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from '@/components/ui/button';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const { setSearchActive } = useContext(SearchContext) || {};
  const [header, setHeader] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  const { user, isSignedIn } = useUser();
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
            <Link href="/" className="cursor-pointer">
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
            {/* Map through navigation items */}
            {[
              { id: 'home', label: t('Home') },
              { id: 'cars', label: t('Cars') },
              { id: 'about', label: t('About') },
              { id: 'why', label: t('WhyUs') },
              { id: 'testimonial', label: t('Testimonials') },
              { id: 'contact', label: t('Contact') },
            ].map((link) => (
              <ScrollLink
                key={link.id}
                className="cursor-pointer"
                to={link.id}
                smooth={desktopMode}
                spy={true}
              >
                {link.label}
              </ScrollLink>
            ))}
            {/* CTA (Optional) */}
            <Link href="/cars" className="xl:hidden btn btn-primary btn-sm max-w-[164px] mx-auto">
              See all cars
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <LocaleSwitcher />

            <Link
              href="/login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Get started
            </Link>

            {/* User Dropdown */}
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={user?.imageUrl || '/default-profile.png'}
                    width={35}
                    height={35}
                    alt="User profile"
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/user">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Listing</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>Logout</SignOutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
