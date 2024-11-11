"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrLanguage } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { IoIosCloseCircle, IoMdMenu } from "react-icons/io";
//import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import trs from "@/public/locales/translate.json";
import { useEffect, useState } from "react";

export default function NavTransparent() {
  const { language, changeLanguage } = useLanguage();
  const translations = trs as any;

  const [isSliderVisible, setSliderVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAnimating, setAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleSlider = () => {
    if (!isSliderVisible) {
      setSliderVisible(true);
      setTimeout(() => setAnimating(true), 0); // Iniciar la animación después de mostrar
    } else {
      setAnimating(false);
      setTimeout(() => setSliderVisible(false), 300); // Esperar a que la animación termine antes de ocultar
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 70) {
      // Desplazándose hacia abajo
      setAnimating(true);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      // Desplazándose hacia arriba
      setIsVisible(true);
      setAnimating(false);
    }

    setLastScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 70);
  };

  const onChangeLanguage = () => {
    if (language == "es") changeLanguage("en");
    else changeLanguage("es");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [showSubMenu, setShowSubMenu] = useState("");

  return (
    <>
      <div
        className={`w-full mx-auto ${isVisible ? "fixed" : "hidden"}
  ${isScrolled ? "fixed bg-black" : "bg-black/70"}
  z-50 transition-all duration-300`}
      >
        <div className="w-full hidden lg:grid md:grid-cols-[auto_40%_auto] gap-3 md:gap-0 justify-between h-auto p-3 md:px-10 md:h-[124px] 2xl:h-[150px] items-center text-base">
          <div className="w-full hover:h-full items-center text-white flex justify-start gap-5 text-sm xl:text-base 2xl:text-2xl">
            <a href="/danzas">{translations[language].inicio}</a>
            <div className="h-full relative group cursor-pointer">
              <div className="flex items-center h-full">
                {translations[language].eventos}
              </div>
              <div className="absolute left-0 w-[200px] 2xl:w-[300px] hidden group-hover:block bg-black text-white -mt-7 rounded-lg shadow-lg">
                <Link
                  href="/eventos/culturales"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Eventos culturales
                </Link>
                <Link
                  href="/eventos/externos"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Eventos externos
                </Link>
              </div>
            </div>
            <Link href="/nosotros">{translations[language].nosotros}</Link>
            <a href="/historia">{translations[language].historia}</a>
            <Link
              href="https://sistemas.brisasdeltiticaca.com/intranet"
              target="_blank"
            >
              {translations[language].asociados}
            </Link>
          </div>
          <Link href="/" className="w-full flex justify-center items-center">
            <Image
              unoptimized
              src={`/assets/images/nav_logo.png`}
              width={0}
              height={0}
              alt="Logo"
              className="h-[60px] 2xl:h-[90px] w-auto"
            />
          </Link>
          <div className="hidden text-white w-full md:flex flex-row justify-end gap-10 items-center">
            <div className="w-full flex justify-end gap-8 items-center">
              <a href={"/puquina-qocha"}>
                <Image
                  unoptimized
                  src={"/assets/images/logo nav_Puquina_Qocha.png"}
                  height={0}
                  width={0}
                  alt="Puquina Q´ocha"
                  className="w-auto h-[60px] 2xl:h-[90px]"
                />
              </a>
              <Link href="/talleres">
                <Image
                  unoptimized
                  src={"/assets/images/logo_CFA_Brisas_Vertical.png"}
                  height={0}
                  width={0}
                  alt="Puquina Q´ocha"
                  className="w-auto h-[60px] 2xl:h-[90px]"
                />
              </Link>
            </div>
            <div className="h-full items-center justify-end gap-3 flex cursor-pointer">
              <div
                className="flex flex-row gap-1 font-bold z-[99999] text-sm xl:text-base 2xl:text-2xl select-none"
                onClick={onChangeLanguage}
              >
                <span
                  className={`cursor-pointer ${
                    language === "es" ? "text-muted-foreground" : ""
                  }`}
                >
                  ESP
                </span>
                <span>|</span>
                <span
                  className={`cursor-pointer ${
                    language === "en" ? "text-muted-foreground" : ""
                  }`}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 md:grid-cols-[auto_50%_auto] gap-1 items-center justify-between px-3 sm:px-5 py-3 md:px-10 text-base z-[9999] lg:hidden">
          <div className="w-full flex flex-row gap-3 items-center">
            <a href={"/puquina-qocha"}>
              <Image
                unoptimized
                src={"/assets/images/logo nav_Puquina_Qocha.png"}
                height={0}
                width={0}
                alt="Puquina Q´ocha"
                className="w-auto h-[20px] min-[450px]:h-[30px] sm:h-[40px] md:h-[60px]"
              />
            </a>
            <Link href="/talleres">
              <Image
                unoptimized
                src={"/assets/images/logo_CFA_Brisas_Vertical.png"}
                height={0}
                width={0}
                alt="Puquina Q´ocha"
                className="w-auto h-[20px] min-[450px]:h-[30px] sm:h-[40px] md:h-[60px]"
              />
            </Link>
          </div>
          <Link href="/" className="w-full flex justify-center">
            <Image
              unoptimized
              src={`/assets/images/nav_logo.png`}
              width={0}
              height={0}
              alt="Logo"
              className=" h-[20px] min-[450px]:h-[30px] sm:h-[40px] md:h-[60px] w-auto "
            />
          </Link>
          <div className="w-full md:w-[85px] flex flex-row gap-2 justify-end items-center">
            <div
              className="flex flex-row gap-1 font-bold text-[10px] sm:text-xs md:text-sm select-none"
              onClick={onChangeLanguage}
            >
              <span
                className={`cursor-pointer ${
                  language == "es" ? "text-muted-foreground" : "text-white"
                }`}
              >
                ESP
              </span>
              <span className="text-white">|</span>
              <span
                className={`cursor-pointer ${
                  language == "en" ? "text-muted-foreground" : "text-white"
                }`}
              >
                EN
              </span>
            </div>
            <IoMdMenu
              color="white"
              className="text-xs sm:text-sm md:text-xl cursor-pointer"
              onClick={toggleSlider}
            />
          </div>
        </div>
      </div>
      {isSliderVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-start z-50 select-none">
          <div
            className={`bg-[#121212] w-full transition-transform duration-300 transform relative ${
              isAnimating ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <IoIosCloseCircle
              color="white"
              className="absolute top-5 right-5 z-50 text-3xl cursor-pointer"
              onClick={toggleSlider}
            />
            <div className="px-7 py-7 flex flex-col gap-5 text-white">
              <a
                className={`hover:text-[#23B3F0] ${
                  pathname == "/danzas" ? "text-[#23b3f0]" : ""
                }`}
                href="/danzas"
                onClick={toggleSlider}
              >
                {translations[language].inicio}
              </a>
              <div
                className={`relative ${
                  pathname == "/danzasqw" ? "text-[#23b3f0]" : ""
                }`}
              >
                <div
                  className="cursor-pointer hover:text-[#23B3F0]"
                  onClick={() =>
                    setShowSubMenu(showSubMenu == "" ? "evento" : "")
                  }
                >
                  {translations[language].eventos}
                </div>
                <div
                  className={`transition-all duration-300 ${
                    showSubMenu == "evento" ? "block" : "hidden"
                  }`}
                >
                  <Link
                    href="/eventos/culturales"
                    className="block px-4 py-2 hover:text-[#23B3F0]"
                    onClick={() => {
                      setShowSubMenu("");
                      toggleSlider();
                    }}
                  >
                    Eventos culturales
                  </Link>
                  <Link
                    href="/eventos/externos"
                    className="block px-4 py-2 hover:text-[#23B3F0]"
                    onClick={() => {
                      setShowSubMenu("");
                      toggleSlider();
                    }}
                  >
                    Eventos externos
                  </Link>
                </div>
              </div>
              <Link
                className={`hover:text-[#23B3F0] ${
                  pathname == "/danzasqwe" ? "text-[#23b3f0]" : ""
                }`}
                href="/nosotros"
                onClick={toggleSlider}
              >
                {translations[language].nosotros}
              </Link>
              <a
                className={`hover:text-[#23B3F0] ${
                  pathname == "/historia" ? "text-[#23b3f0]" : ""
                }`}
                href="/historia"
                onClick={toggleSlider}
              >
                {translations[language].historia}
              </a>
              <Link
                className="hover:text-[#23B3F0] "
                href="https://sistemas.brisasdeltiticaca.com/intranet"
                target="_blank"
              >
                {translations[language].asociados}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
