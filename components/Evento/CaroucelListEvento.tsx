"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";

import "swiper/css";
import Image from "next/image";
import { API_URL } from "@/const";
import Link from "next/link";

import { format } from "date-fns";
import { formateDate } from "@/lib/utils";

interface Eventos {
  idUser: number;
  id: number;
  nombre: string;
  descripcion: string;
  image: string;
  fecha_creacion: string;
  fecha_edicion: Date;
  precio: number;
  slug: string;
}

export default function CaroucelListEvento() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Eventos[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(`${API_URL}/eventos/listevents`, {
        method: "GET",
      });

      const res = await response.json();
      setData(res);
      /* console.log(res); */
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-6xl text-white text-center bebas-neue">
          Eventos destacados
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-end">
              <div className="w-full h-[250px] bg-slate-400 !relative rounded-lg overflow-hidden animate-pulse"></div>
            </div>
            <div className="w-full relative text-white -mt-10 z-10 flex flex-col gap-2">
              <h2
                className="text-5xl bebas-neue ml-3 w-full"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
              >
                S/. 99999
              </h2>
              <div className="w-full flex justify-end">
                <p className="text-xs w-full h-4 rounded-full bg-slate-400 animate-pulse"></p>
              </div>
            </div>
          </div>
          <div className="w-full hidden md:flex flex-col gap-3">
            <div className="w-full flex justify-end">
              <div className="w-full h-[250px] bg-slate-400 !relative rounded-lg overflow-hidden animate-pulse"></div>
            </div>
            <div className="w-full relative text-white -mt-10 z-10 flex flex-col gap-2">
              <h2
                className="text-5xl bebas-neue ml-3 w-full"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
              >
                S/. 99999
              </h2>
              <div className="w-full flex justify-end">
                <p className="text-xs w-full h-4 rounded-full bg-slate-400 animate-pulse"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-6xl text-white text-center bebas-neue">
        Eventos destacados
      </h1>
      <div className="w-full">
        <div className="w-full relative">
          <div className="w-auto h-full absolute top-0 left-0 z-50">
            {/* <div className="bg-gradient-to-r from-black to-transparent w-[50px] h-full"></div> */}
          </div>
          <Swiper
            navigation={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 2000 }}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {data != null && (
              <>
                {data.map((evento: Eventos, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="w-full flex flex-col gap-3">
                      <Link href={`/evento/${evento.slug}`} className="w-full flex justify-end">
                        <div className="w-full h-[250px] bg-slate-400 !relative rounded-lg overflow-hidden">
                          {evento.image && (
                            <Image
                              /* unoptimized */
                              src={evento.image}
                              alt="alt"
                              width={300}
                              height={250}
                              className="w-full h-full object-cover"
                            />
                          )}

                          <div className="absolute bottom-1 right-1 flex flex-row gap-1 z-20">
                            {/* <Link
                              href={"#"}
                              className="px-3 py-1 text-xs text-white bg-black/50 rounded-lg"
                            >
                              fecha
                            </Link> */}
                            <span className="px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                              {formateDate(evento.fecha_creacion)}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="w-full relative text-white -mt-10 z-10 flex flex-col gap-2">
                        <div className="w-full px-3 flex flex-row justify-between">
                          <h2
                            className="text-5xl bebas-neue ml-3 w-full"
                            style={{
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 2)",
                            }}
                          >
                            S/. {evento.precio}
                          </h2>
                          {/* <Link href="#" className="p-3 bg-white/40 text-black rounded-lg">Comprar</Link> */}
                        </div>
                        <h1 className="font-semibold">{evento.nombre}</h1>
                        <div className="w-full flex justify-end">
                          <p className="text-xs w-full ">
                            {evento.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
