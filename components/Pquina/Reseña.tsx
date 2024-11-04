import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

export default function Reseña() {
  const reseñas = [
    {
      nombre: "Gerardo Arturo Laureano",
      comentario: "Agradable la atención y el amplio ambiente",
      bg: "bg-slate-900",
    },
    {
      nombre: "Darwin Gonzales Peralta",
      comentario:
        "Variedad gastronómica para disfrutar, típica, peruana y saludable !!!",
      bg: "bg-slate-400",
    },
    {
      nombre: "Poly S Ch",
      comentario: "La buena comida y su peña",
      bg: "bg-slate-500",
    },
    {
      nombre: "Gerardo Arturo Laureano",
      comentario: "Agradable la atención y el amplio ambiente",
      bg: "bg-slate-600",
    },
    {
      nombre: "Gerardo Arturo Laureano",
      comentario: "Agradable la atención y el amplio ambiente",
      bg: "bg-slate-700",
    },
    {
      nombre: "Gerardo Arturo Laureano",
      comentario: "Agradable la atención y el amplio ambiente",
      bg: "bg-slate-800",
    },
  ];

  return (
    <>
      <div className="w-full h-[100px] sm:h-[130px] lg:h-[150px] 2xl:h-[200px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay]}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            800: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper h-full"
        >
          {reseñas.map((reseña, index) => (
            <SwiperSlide className={`h-full w-full ${reseña.bg}`}>
              <div className="max-w-[95%] mx-auto w-full h-full flex flex-row gap-3 md:gap-5 justify-center items-center">
                <div className="w-[70px] sm:w-[80px] h-[70px] sm:h-[80px] bg-black/80 aspect-square rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {reseña.nombre.charAt(0)}
                  </span>
                </div>
                <div className="h-full flex flex-col items-start justify-center">
                  <h1 className="text-base sm:text-xl 2xl:text-3xl font-bold text-white">
                    {reseña.nombre}
                  </h1>
                  <p className="text-white text-xs sm:text-sm 2xl:text-base">
                    {reseña.comentario}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
