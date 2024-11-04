"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { API_URL } from "@/const";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";


interface Fundadores_I {
  fecha: string;
  descripcion: {
    en: string;
    es: string;
  };
  imagen: string;
  nombre: string;
}

export default function CaroucelHistoria() {
  const [fundadores, setFundadores] = useState<Fundadores_I[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();
  const translations = trs as any;

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`${API_URL}/fundadores/listfundadores`, {
        method: "GET",
        cache: "no-cache",
      });
      const res = await response.json();

      setFundadores(res);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <h1>Cargando....</h1>
      </>
    );
  }

  return (
    <div className="w-full relative">
      <div className="w-auto h-full absolute top-0 left-0 z-40">
        {/* <div className="bg-gradient-to-r from-black to-transparent w-[50px] h-full"></div> */}
      </div>
      {fundadores != null && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          /* loop={true} */
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
            /* 780: {
              slidesPerView: 4,
              spaceBetween: 30,
            }, */
          }}
        >
          {fundadores.map((fundador, index) => (
            <SwiperSlide key={index}>
              <div className="w-full flex flex-col -z-0 cursor-grab">
                <div className="w-full flex justify-end">
                  <div className="w-full h-[450px] bg-slate-400 !relative rounded-lg overflow-hidden">
                    <Image
                      unoptimized
                      src={fundador.imagen}
                      alt="alt"
                      width={0}
                      height={0}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full text-white -mt-6 z-10 flex flex-col gap-2">
                  <h2
                    className="text-5xl bebas-neue"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                  >
                    {fundador.fecha}
                  </h2>
                  <div className="w-full flex justify-end">
                    <div className="w-[90%] flex flex-col">
                      <p className="text-sm w-[90%] font-bold ">
                        {fundador.nombre}
                      </p>
                      <p className="text-xs w-[90%] ">{language == 'en' ? fundador.descripcion.en : fundador.descripcion.es}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
