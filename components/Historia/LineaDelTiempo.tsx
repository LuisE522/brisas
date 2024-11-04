"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { API_URL } from "@/const";
import { PastPresident_I } from "../Panel/PastPresident/PastPresident";
import { IoIosCloseCircle } from "react-icons/io";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";

interface Fundadores_I {
  fecha: string;
  descripcion: string;
  imagen: string;
}

export default function LineaDelTiempo() {
  const { language } = useLanguage();
  const translations = trs as any;

  const [presidentes, setPresidentes] = useState<PastPresident_I[]>();
  const [juntaDirectiva, setJuntaDirectiva] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${API_URL}/presidentes/list`, {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      setPresidentes(data);
    };

    getData();
  }, []);

  const showJuntaDirectiva = (index: number) => {
    const info = presidentes ? presidentes[index] : null;

    if (info) {
      setJuntaDirectiva(info.imageJunta);
    } else {
      console.error("Info no disponible para el índice:", index);
      setJuntaDirectiva(null);
    }
  };

  useEffect(() => {
    // Controlar el overflow del body
    document.body.style.overflow = juntaDirectiva != null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
    };
  }, [juntaDirectiva]);

  return (
    <div className="w-full relative">
      {presidentes && (
        <>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            className="mySwiper "
            breakpoints={{
              850: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1080: {
                slidesPerView: 3,
                spaceBetween: 100,
              },
            }}
          >
            {presidentes.map((presidente: PastPresident_I, index) => (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col -z-0 cursor-grab">
                  <div className="w-full flex justify-end">
                    <div className="w-full h-[250px] md:h-[300px] lg:h-[450px] bg-slate-400 !relative rounded-lg overflow-hidden">
                      <Image
                        unoptimized
                        src={presidente.imagePresident}
                        alt="alt"
                        width={0}
                        height={0}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full text-white  z-10 flex flex-col gap-2 py-2">
                    <div className="w-full flex flex-col gap-1.5 lg:gap-3 justify-center items-center text-center">
                      <p className="text-base lg:text-2xl 2xl:text-4xl font-bold ">
                        {presidente.nombre}
                      </p>
                      {/* <p className="text-sm lg:text-base 2xl:text-2xl font-bold">
                        {presidente.fecha}
                      </p> */}
                      <div
                        className="w-fit bg-[#214BA0] px-3 sm:px-4 py-2 rounded-2xl uppercase text-[10px] sm:text-xs lg:text-sm"
                        onClick={() => showJuntaDirectiva(index)}
                      >
                        {translations[language].historia_junta_directiva}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {juntaDirectiva != null && (
        <div className="w-full h-screen fixed bg-white top-0 z-50 left-0 flex justify-center items-center lg:items-start overflow-y-auto">
          <IoIosCloseCircle
            className="absolute top-5 right-5  text-2xl lg:text-4xl cursor-pointer"
            onClick={() => setJuntaDirectiva(null)}
          />
          <Image
            unoptimized
            src={juntaDirectiva}
            alt="alt"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </div>
      )}
    </div>
  );
}
