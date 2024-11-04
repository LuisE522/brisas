"use client";

import Image from "next/image";
import React, { useState } from "react";
import Galeria from "../Galeria/Galeria";
import trs from "@/public/locales/translate.json";
import { useLanguage } from "@/context/LanguageProvider";

export interface EventosCulturales {
  id: number;
  image: string;
}

export default function EventosCulturales({
  imagenes,
}: {
  imagenes: EventosCulturales[];
}) {
  const { language } = useLanguage();
  const translations = trs as any;

  const links = imagenes.map((imagen) => imagen.image);

  return (
    <>
      <div className="h-[250px] sm:h-[350px] md:h-screen w-full absolute top-0 z-0">
        <div className="bg-gradient-to-l from-black/80 to-transparent w-full h-full absolute top-0"></div>
        <Image
          src="/assets/images/eventos-culturales/fondo.jpg"
          alt="alt"
          width={1920}
          height={1080}
          quality={100}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full h-[250px] sm:h-[350px] md:h-screen relative flex justify-end">
        <div className="max-w-[100%] w-[300px] md:w-[500px] 2xl:w-[900px] flex justify-end lg:justify-start h-full !relative pr-3 lg:p-0">
          <div className="h-full w-[70%] sm:w-full md:w-[90%] 2xl:w-[70%] flex flex-col gap-1 md:gap-3 lg:gap-5 items-start justify-center text-white">
            <span
              className="text-sm md:text-base lg:text-3xl 2xl:text-5xl font-bold"
              dangerouslySetInnerHTML={{
                __html: translations[language].cultural_titulo,
              }}
            ></span>
          </div>
        </div>
      </div>

      <div className="w-full h-auto relative">
        <Image
          unoptimized
          src="/assets/images/elenco/mancha-1.png"
          alt="alt"
          width={0}
          height={0}
          className="w-[700px] h-auto absolute top-0 right-0"
        />

        <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto relative flex flex-col gap-10 md:gap-20 py-10 md:py-20">
          <div className="w-full flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-bold">
              {translations[language].pasion_y_compromiso}
            </h1>
            <p className="text-xs sm:text-sm md:text-xl 2xl:text-3xl">
              {translations[language].pasion_y_compromiso_subtitulo}
            </p>
          </div>

          <div className="w-full h-auto">
            <iframe
              className="w-full aspect-video self-stretch"
              src={`https://www.youtube.com/embed/utJGgiaFhzo`}
              title="Product Overview Video"
              aria-hidden="true"
            />
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-bold text-center">
          {translations[language].cultural_galeria_titulo}
          </h1>

          <Galeria links={links} />
        </div>
      </div>
    </>
  );
}
