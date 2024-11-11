"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Galeria from "../Galeria/Galeria";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";
import { TalleresCategoria_I } from "../Panel/Talleres/T_Categorias";

export interface Talleres {
  id: number;
  image: string;
}
interface Props {
  listCategorias: TalleresCategoria_I[]
}

export default function Elenco({ listCategorias }: Props) {
  /* const links = imagenes.map((imagen) => imagen.image); */
  const { language } = useLanguage();

  const translations = trs as any;

  return (
    <>
      <div className="h-[250px] sm:h-[350px] md:h-screen w-full absolute top-0 z-0">
        <div className="bg-gradient-to-l from-black/80 to-transparent w-full h-full absolute top-0"></div>
        {/* Imagen de fondo */}
        <Image
          src="/assets/images/elenco/fondo.png"
          alt="alt"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        {/* Imagen de fondo */}
      </div>

      <div className="w-full h-[250px] sm:h-[350px] md:h-screen relative flex justify-end">
        <div className="max-w-[100%] w-[300px] md:w-[500px] 2xl:w-[900px] flex justify-end lg:justify-start h-full !relative pr-3 lg:p-0">
          <div className="h-full w-[70%] sm:w-full md:w-[90%] 2xl:w-[70%] flex flex-col gap-1 md:gap-3 lg:gap-5 items-start justify-center text-white">
            <div className="flex flex-col gap-1">
              <span
                className="text-sm md:text-base lg:text-3xl 2xl:text-5xl font-bold"
                dangerouslySetInnerHTML={{
                  __html: translations[language].talleres_titulo,
                }}
              ></span>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">
                {translations[language].talleres_titulo_subtitulo}
              </p>
            </div>
            <Link
              href="https://sistemas.brisasdeltiticaca.com/"
              target="_blank"
              className="w-fit px-2 md:px-4 py-1 md:py-2 rounded-2xl bg-[#FF9900] text-white text-[8px] sm:text-xs md:text-sm"
            >
              {translations[language].talleres_boton}
            </Link>
            {/* <span className="text-[10px] sm:text-sm md:text-base 2xl:text-xl">
                Lo mejor de la gastronompia altiplánica bajo el cielo de Lima
                </span> */}
          </div>
        </div>
      </div>

      <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto relative flex flex-col gap-10 md:gap-20 py-10 md:py-20">
        <div className="w-full flex flex-col gap-3 justify-center items-center text-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-bold">
            {translations[language].pasion_y_compromiso}
          </h1>
          <p className="text-xs sm:text-sm md:text-xl 2xl:text-3xl">
            {translations[language].pasion_y_compromiso_subtitulo}
          </p>
        </div>

        <div className="w-full flex flex-col gap-5">
          {listCategorias.map((categoria, index) => (
            <div className="w-full flex flex-col gap-3 relative" key={index}>
              <h1 className="text-4xl font-bold">{categoria.categoria}</h1>
              <Galeria taller={categoria.talleres} />
            </div>
          ))}
        </div>

      </div>

      <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-auto pt-5">
        <iframe
          className="w-full aspect-video self-stretch"
          src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/cfabrisas/videos/878235471178724?locale=es_LA`}
          title="Product Overview Video"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
