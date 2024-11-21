import Image from "next/image";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Hero from "./components/Hero";
import About from "./components/About";
import Cars from "./components/Cars";
import Why from "./components/Why";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <>
      <Hero />
      <Cars />
      <About />
      <Why />
    </>
  );
}
