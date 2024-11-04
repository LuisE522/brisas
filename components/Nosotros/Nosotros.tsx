"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import React from "react";
import trs from "@/public/locales/translate.json";

export default function Nosotros() {
  const { language } = useLanguage();

  const translations = trs as any;

  return (
    <>
      <div className="h-[250px] sm:h-[350px] md:h-screen w-full absolute top-0 z-0">
        <div className="bg-gradient-to-l from-black/80 to-transparent w-full h-full absolute top-0"></div>
        {/* Imagen de fondo */}
        <Image
          unoptimized
          src="/assets/images/nosotros/fondo.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        {/* Imagen de fondo */}
      </div>

      <div className="w-full h-[250px] sm:h-[350px] md:h-screen relative flex justify-end">
        <div className="max-w-[100%] w-[300px] md:w-[500px] 2xl:w-[900px] flex justify-end lg:justify-start h-full !relative pr-3 lg:p-0">
          <div className="h-full w-[70%] sm:w-full md:w-[90%] 2xl:w-[70%] flex flex-col gap-1 md:gap-3 lg:gap-5 items-start justify-center text-white">
            <span className="text-sm md:text-base lg:text-3xl 2xl:text-5xl md:ml-2 2xl:ml-4 font-bold">
              {translations[language].nosotros_titulo}
            </span>
            <p className="text-[8px] sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">
              {translations[language].nosotros_subtitulo}
            </p>
            {/* <span className="text-[10px] sm:text-sm md:text-base 2xl:text-xl">
                Lo mejor de la gastronompia altiplánica bajo el cielo de Lima
                </span> */}
          </div>
        </div>
      </div>

      <div className="w-full h-auto py-7 sm:py-14 lg:py-24 2xl:py-36 flex flex-col gap-10">
        <div className="grid grid-cols-[55%_40%] justify-between">
          <div className="w-full pl-5 sm:pl-10 md:pl-20 lg:pl-36 xl:pl-52 flex flex-col gap-3 md:gap-5 justify-center relative">
            <Image
              unoptimized
              src="/assets/images/nosotros/mancha-1.png"
              alt="alt"
              width={0}
              height={0}
              className="w-full h-auto absolute top-0"
            />
            <h1 className="font-bold text-base sm:text-2xl md:text-5xl 2xl:text-7xl">
              {translations[language].nsotros_nuestra_institucion}
            </h1>
            <div className="w-full flex flex-col gap-2 md:gap-5 text-xs sm:text-sm md:text-xl 2xl:text-2xl">
              <p>
              {translations[language].nsotros_nuestra_institucion_p1}
              </p>
              <p>
              {translations[language].nsotros_nuestra_institucion_p2}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Image
              unoptimized
              src="/assets/images/nosotros/institucion.png"
              alt="alt"
              width={0}
              height={0}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-[40%_55%] justify-between" id="mision">
          <div className="w-full flex justify-center">
            <Image
              unoptimized
              src="/assets/images/nosotros/mision.png"
              alt="alt"
              width={0}
              height={0}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full pr-5 sm:pr-10 md:pr-20 lg:pr-36 xl:pr-52 flex flex-col gap-3 md:gap-5 justify-center relative">
            <Image
              unoptimized
              src="/assets/images/nosotros/mancha-2.png"
              alt="alt"
              width={0}
              height={0}
              className="w-full h-auto absolute top-0 scale-x-[-1] right-36"
            />
            <h1 className="font-bold text-base sm:text-2xl md:text-5xl 2xl:text-7xl">
            {translations[language].nsotros_mision}
            </h1>
            <div className="w-full flex flex-col gap-2 md:gap-5 text-xs sm:text-sm md:text-xl 2xl:text-2xl">
              <p>
              {translations[language].nsotros_mision_p1}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[55%_40%] justify-between relative">
          <Image
            unoptimized
            src="/assets/images/nosotros/mancha-3.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto h-[250px] sm:h-[300px] md:h-[450px] lg:h-[600px] 2xl:h-[800px] absolute top-0 scale-x-[-1]"
          />
          <div className="w-full pl-5 sm:pl-10 md:pl-20 lg:pl-36 xl:pl-52 flex flex-col gap-3 md:gap-5 justify-center relative">
            <h1 className="font-bold text-base sm:text-2xl md:text-5xl 2xl:text-7xl">
            {translations[language].nsotros_vision}
            </h1>
            <div className="w-full flex flex-col gap-2 md:gap-5 text-xs sm:text-sm md:text-xl 2xl:text-2xl">
              <p>
              {translations[language].nsotros_vision_p1}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Image
              unoptimized
              src="/assets/images/nosotros/vision.png"
              alt="alt"
              width={0}
              height={0}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
