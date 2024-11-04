"use client";

import Link from "next/link";
import React from "react";
import Reseña from "./Reseña";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";

export default function Mapa() {
  const { language } = useLanguage();
  const translations = trs as any;
  return (
    <div className="py-10 w-full h-auto relative bg-black" id="mapa">
      <div className="w-full h-full flex flex-col gap-10">
        <div className="px-5 py-14 mx-auto max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl h-full flex flex-col-reverse md:grid md:grid-cols-2 gap-10 relative">
          <div className="w-full h-full flex flex-col gap-1 md:gap-5 2xl:gap-10 text-white relative">
            <h1 className="hidden md:block text-4xl md:text-5xl 2xl:text-7xl bebas-neue">
              {translations[language].puquina_mapa_pregunta}
            </h1>
            <p className="hidden md:block text-sm sm:text-base md:text-xl 2xl:text-3xl">
              Jr. Heroes de Tarapaca 168, Lima, Peru
            </p>
            <div className="w-full flex flex-row md:flex-col mb-5 md:mb-0 gap-3 md:gap-5 2xl:gap-10">
              <div className="w-full flex flex-col gap-1">
                <h1 className="text-sm sm:text-base md:text-xl 2xl:text-3xl text-[#FF9900]">
                  {translations[language].puquina_mapa_telefono}
                </h1>
                <p className="text-sm sm:text-base md:text-xl 2xl:text-3xl">
                  (01) 7156961
                </p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <h1 className="text-sm sm:text-base md:text-xl 2xl:text-3xl text-[#FF9900]">
                {translations[language].puquina_mapa_nuestra_carta}
                </h1>
                <Link
                  href="https://bit.ly/CartaPuquina"
                  className="text-sm sm:text-base md:text-xl 2xl:text-3xl"
                >
                  https://bit.ly/CartaPuquina
                </Link>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-xl 2xl:text-3xl">
              {translations[language].puquina_mapa_redes_sociales}
            </p>
            <p className="text-sm sm:text-base md:text-xl 2xl:text-3xl text-[#FF9900]">
              @puquinaqocha
            </p>
            <Link
              href="#contactanos"
              className="w-fit px-4 md:px-6 py-2 bg-[#FF9900] rounded-xl cursor-pointer text-sm md:text-base 2xl:text-xl"
            >
              {translations[language].puquina_contactanos}
            </Link>
          </div>
          <div className="w-full h-full text-white relative flex flex-col gap-5 justify-center items-center">
            <div className="w-full h-full flex flex-col gap-3 md:gap-5 2xl:gap-10 text-white relative md:hidden">
              <h1 className="text-4xl md:text-5xl 2xl:text-7xl bebas-neue">
              {translations[language].puquina_mapa_pregunta}
              </h1>
              <p className="text-sm sm:text-base md:text-xl 2xl:text-3xl">
                Jr. Heroes de Tarapaca 168, Lima, Peru
              </p>
            </div>
            <div className="w-full overflow-hidden rounded-xl h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.7318313290625!2d-77.04430408988777!3d-12.061963142133559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c25e98b36b%3A0x3e11e4fa30a52563!2sBrisas%20del%20Titicaca%20Asociaci%C3%B3n%20Cultural!5e0!3m2!1ses!2spe!4v1729883875178!5m2!1ses!2spe"
                className="w-full h-full"
                style={{ border: "0" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <Reseña />
        <div className="px-5 py-14 mx-auto max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl h-full flex flex-col gap-3 2xl:gap-5 justify-center items-center text-white text-center">
          <h1 className="text-bold bebas-neue text-4xl md:text-5xl 2xl:text-7xl">
          {translations[language].puquina_menu_title}
          </h1>
          <div className="w-full flex flex-col gap-1">
            <p className="text-xs sm:text-sm md:text-xl 2xl:text-3xl text-center">
            {translations[language].puquina_menu_descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
