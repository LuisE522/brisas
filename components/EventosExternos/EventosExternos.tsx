"use client";

import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import trs from "@/public/locales/translate.json";
import CaroucelEvetos from "../Evento/CaroucelEvetos";
import ContactanosExternos from "./ContactanosExternos";

export default function EventosExternos() {
  const { language } = useLanguage();
  const translations = trs as any;

  return (
    <>
      <div className="h-[250px] sm:h-[350px] md:h-screen w-full absolute top-0 z-0">
        <div className="bg-gradient-to-l from-black/80 to-transparent w-full h-full absolute top-0"></div>
        {/* Imagen de fondo */}
        <Image
          src="/assets/images/eventos-externos/fondo.png"
          alt="alt"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        {/* Imagen de fondo */}
      </div>

      <div className="w-full h-[250px] sm:h-[350px] md:h-screen relative flex justify-end">
        <div className="max-w-[100%] w-[300px] md:w-[500px] 2xl:w-[900px] flex justify-end lg:justify-start h-full !relative pr-3 lg:p-0">
          <div className="h-full w-[70%] sm:w-full md:w-[90%] 2xl:w-[70%] flex flex-col items-start justify-center text-white">
            <span className="text-sm md:text-base lg:text-3xl 2xl:text-5xl leading-tight font-bold">
              {translations[language].externos_titulo}
            </span>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-lg 2xl:text-2xl">
              {translations[language].externos_subtitulo}
            </p>
            {/* <span className="text-[10px] sm:text-sm md:text-base 2xl:text-xl">
                Lo mejor de la gastronompia altiplánica bajo el cielo de Lima
                </span> */}
          </div>
        </div>
      </div>

      <div className="w-full h-auto relative">
        {/* Plantas en los laterales */}
        <div className="w-full absolute -top-2 sm:-top-4 md:-top-8 flex justify-between">
          <Image
            unoptimized
            src="/assets/images/danzas/planta1.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto sm:w-[150px] md:w-[300px] h-[30px] sm:h-auto"
          />
          <Image
            unoptimized
            src="/assets/images/danzas/planta1.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto sm:w-[150px] md:w-[300px] h-[30px] sm:h-auto scale-x-[-1]"
          />
        </div>
        {/* Plantas en los laterales */}

        <div className="w-full flex justify-center absolute -top-3 md:-top-3 lg:-top-5">
          <Link
            href={"#consultar"}
            className="w-fit px-2 lg:px-4 py-1 lg:py-2 text-xs md:text-sm lg:text-base 2xl:text-xl text-center bg-white font-bold rounded-full drop-shadow-lg"
          >
            {translations[language].contactanos}
          </Link>
        </div>

        <Image
          unoptimized
          src="/assets/images/eventos-externos/fondo_2_degradado.png"
          alt="alt"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
        <div className="w-full h-full mt-20 sm:mt-32 flex flex-col gap-10 absolute top-0 text-white">
          <div className="w-[300px] sm:w-[500px] 2xl:w-[650px] max-w-[95%] mx-auto flex flex-col gap-5">
            <Image
              src={`/assets/images/eventos-externos/${language == 'es' ? 'alquila_con_nosotros.png' : 'alquila_con_nosotros_en.png'}`}
              alt="alt"
              unoptimized
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>

          <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px]  mx-auto flex flex-col gap-10 md:gap-14 lg:gap-20">
            <div className="grid grid-cols-2 gap-5 md:gap-10">
              <div className="w-full flex flex-col justify-center gap-3 md:gap-5">
                <div className="w-full flex flex-col">
                  <h1 className="font-bold text-sm md:text-base lg:text-3xl 2xl:text-5xl leading-tight uppercase">
                    {translations[language].externos_amplio_salon}
                  </h1>
                  <span className="text-[8px] sm:text-xs md:text-sm lg:text-xl">
                    {translations[language].externos_amplio_salon_capacidad}
                  </span>
                </div>
                <p className="text-[8px] sm:text-xs md:text-sm lg:text-xl">
                  {translations[language].externos_amplio_salon_descripcion}
                </p>
              </div>
              <div className="w-full">
                <Image
                  unoptimized
                  src="/assets/images/eventos-externos/amplio_salon_de_eventos.png"
                  alt="alt"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 md:gap-10">
              <div className="w-full">
                <Image
                  unoptimized
                  src="/assets/images/eventos-externos/espectaculo_de_musica_y_danzas_peruanas.png"
                  alt="alt"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-full flex flex-col justify-center gap-3 md:gap-5">
                <div className="w-full flex flex-col">
                  <h1 className="font-bold text-sm md:text-base lg:text-3xl 2xl:text-5xl leading-tight uppercase">
                    {translations[language].externos_espectaculo}
                  </h1>
                </div>
                <p className="text-[8px] sm:text-xs md:text-sm lg:text-xl">
                  {translations[language].externos_espectaculo_descripcion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-black pt-20 md:pt-40 lg:pt-64">
        <Image
          unoptimized
          src="/assets/images/eventos-externos/banner_2.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full max-w-[95%] mx-auto h-auto object-cover"
        />
      </div>

      <div className="w-full h-auto relative">
        <Image
          unoptimized
          src="/assets/images/eventos-externos/fondo_3_degradado.png"
          alt="alt"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
        <div className="w-full h-full mt-20 sm:mt-40 lg:mt-64 flex flex-col gap-10 absolute top-0 text-white">
          <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px]  mx-auto flex flex-col gap-10 md:gap-14 lg:gap-20">
            <div className="grid grid-cols-2 gap-5 md:gap-10">
              <div className="w-full flex flex-col justify-center gap-3 md:gap-5">
                <div className="w-full flex flex-col">
                  <h1 className="font-bold text-sm md:text-base lg:text-3xl 2xl:text-5xl leading-tight uppercase">
                    {translations[language].externos_mejor_carta}
                  </h1>
                </div>
                <p className="text-[8px] sm:text-xs md:text-sm lg:text-xl">
                  {translations[language].externos_mejor_carta_descripcion}
                </p>
              </div>
              <div className="w-full">
                <Image
                  unoptimized
                  src="/assets/images/eventos-externos/la_mejor_carta_gastronomica_y_cocteleria.png"
                  alt="alt"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 md:gap-10">
              <div className="w-full flex flex-col">
                <Image
                  unoptimized
                  src="/assets/images/eventos-externos/atencion_personalizada.png"
                  alt="alt"
                  width={500}
                  height={500}
                />
              </div>

              <div className="w-full flex flex-col justify-center gap-3 md:gap-5">
                <h1 className="font-bold text-sm md:text-base lg:text-3xl 2xl:text-5xl leading-tight uppercase">
                  {translations[language].externos_atencion}
                </h1>
                <p className="text-[8px] sm:text-xs md:text-sm lg:text-xl">
                  {translations[language].externos_atencion_descripcion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-black relative">
        {/* Plantas en los laterales */}
        <div className="w-full absolute -top-2 sm:-top-4 md:-top-8 flex justify-between">
          <Image
            unoptimized
            src="/assets/images/danzas/planta1.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto sm:w-[150px] md:w-[300px] h-[30px] sm:h-auto"
          />
          <Image
            unoptimized
            src="/assets/images/danzas/planta1.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto sm:w-[150px] md:w-[300px] h-[30px] sm:h-auto scale-x-[-1]"
          />
        </div>
        {/* Plantas en los laterales */}
        <div className="w-[700px] max-w-[95%] mx-auto pt-14 pb-5 flex flex-col gap-5">
          <Image
            src="/assets/images/eventos-externos/brisas_in_house.png"
            alt="alt"
            unoptimized
            width={0}
            height={0}
            className="w-full h-auto"
          />
          <h1 className="text-sm md:text-base lg:text-xl w-full text-center font-bold text-[#ED7A15]">
            {translations[language].externos_nusetro_elenco}
          </h1>
        </div>

        <div className="w-full h-auto relative">
          <Image
            unoptimized
            src="/assets/images/eventos-externos/mancha_1.png"
            alt="alt"
            width={0}
            height={0}
            className="h-full w-auto absolute top-0"
          />
          <div className="w-full h-auto pb-20 lg:py-20 flex flex-col gap-10 text-white">
            <div className="grid grid-cols-[40%_55%] justify-between">
              <div className="w-full pl-5 sm:pl-10 md:pl-20 lg:pl-36 xl:pl-52 flex flex-col gap-3 md:gap-5 justify-center">
                <div className="w-full flex flex-col gap-2 md:gap-5">
                  <p className="text-[8px] sm:text-xs md:text-sm lg:text-xl 2xl:text-2xl">
                    {translations[language].externos_nusetro_elenco_descripcion}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Image
                  unoptimized
                  src="/assets/images/eventos-externos/personaje_2.png"
                  alt="alt"
                  width={0}
                  height={0}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative bg-black">
          <Image
            src={`/assets/images/eventos-externos/${language == 'es' ? 'personaje1' : 'personaje1_en'}.png`}
            alt="alt"
            unoptimized
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="w-full bg-[#121212]">
        <div className="max-w-[95%] w-[500px] md:w-[800px] 2xl:w-[1080px]  mx-auto relative py-10 ">
          <CaroucelEvetos />
        </div>
      </div>

      <ContactanosExternos />
    </>
  );
}
