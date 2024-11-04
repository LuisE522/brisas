'use client'

import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import React from "react";
import trs from '@/public/locales/translate.json';

export default function Info() {
  const { language } = useLanguage();
  const translations = trs as any;
  return (
    <>
      <div className="w-full h-[350px] sm:h-[450px] md:h-[350px] lg:h-screen relative">
        <div className="w-full h-full flex bg-black text-white">
          <div className="max-w-[40%] w-full h-full overflow-hidden">
            <Image
              src="/assets/images/pquina/senio_papa.png"
              unoptimized
              alt="alt"
              width={0}
              height={0}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-full grid grid-cols-3 grid-rows-2">
            <div className="max-w-[90%] w-full mx-auto flex flex-col justify-center items-center text-center gap-1 md:gap-3">
              <h1 className="font-bold text-[10px] sm:text-sm md:text-base lg:text-xl 2xl:text-3xl">
                TRIO AREQUIPEÑO
              </h1>
              <p className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm 2xl:text-base">
              {translations[language].puquina_trio_arequipeño_descripcion}
              </p>
            </div>
            <div className="w-full">
              <Image
                src="/assets/images/pquina/info_chairo.jpg"
                unoptimized
                alt="alt"
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[90%] w-full mx-auto flex flex-col justify-center items-center text-center gap-1 md:gap-3">
              <h1 className="font-bold text-[10px] sm:text-sm md:text-base lg:text-xl 2xl:text-3xl">
                Chairo
              </h1>
              <p className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm 2xl:text-base">
              {translations[language].puquina_chairo_descripcion}
              </p>
            </div>
            <div className="w-full">
              <Image
                src="/assets/images/pquina/info_chancho.png"
                unoptimized
                alt="alt"
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-[90%] w-full mx-auto flex flex-col justify-center items-center text-center gap-1 md:gap-3">
              <h1 className="font-bold text-[10px] sm:text-sm md:text-base lg:text-xl 2xl:text-3xl">
                Pisco sour
              </h1>
              <p className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm 2xl:text-base">
              {translations[language].puquina_pisco_sour}
              </p>
            </div>
            <div className="w-full">
              <Image
                src="/assets/images/pquina/info_bebida.png"
                unoptimized
                alt="alt"
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
