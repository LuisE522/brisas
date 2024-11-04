import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Contenido_I, TomosWithContenido_I } from "../Panel/Tomos/Tomos";
import { API_URL } from "@/const";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";

export default function CaroucelTarjetas() {
  const [tomos, setTomos] = useState<TomosWithContenido_I[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();
  const translations = trs as any;

  const [showInfoTarjeta, setShowInfoTarjeta] = useState(false);
  const [infoTarjeta, setInfoTarjeta] = useState<Contenido_I[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100'");

  const [hoverTarjeta, setHoverTarjeta] = useState(0);
  const [animationShowInfo, setAnimationShowInfo] = useState(false);

  const onShowInfoTarjeta = (index: number) => {
    if (tomos != null) {
      if (tomos[index].contenidos.length > 0) {
        setInfoTarjeta(tomos[index].contenidos);
        setShowInfoTarjeta(true);
        setCurrentIndex(0);

        setTimeout(() => {
          setAnimationShowInfo(true);
        }, 0);
      }
    }
  };

  const onCloseShowInfoTarjeta = () => {
    setAnimationShowInfo(false);

    // Esperar que la animación de desvanecimiento se complete antes de ocultar
    setTimeout(() => {
      setShowInfoTarjeta(false);
    }, 500); // Este tiempo debe coincidir con la duración de la animación
  };

  const handleNext = () => {
    setFadeClass("opacity-0"); // Inicia el fade out
    setTimeout(() => {
      if (infoTarjeta) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % infoTarjeta.length); // Cambia el índice
        setFadeClass("opacity-100"); // Inicia el fade in
      }
    }, 300); // Espera un poco antes de cambiar
  };

  const handlePrevious = () => {
    setFadeClass("opacity-0"); // Inicia el fade out
    setTimeout(() => {
      if (infoTarjeta) {
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex - 1 + infoTarjeta.length) % infoTarjeta.length
        ); // Cambia el índice
        setFadeClass("opacity-100"); // Inicia el fade in
      }
    }, 300); // Espera un poco antes de cambiar
  };

  useEffect(() => {
    if (showInfoTarjeta) {
      setFadeClass("opacity-100"); // Asegúrate de que la imagen se muestre al inicio
    }
  }, [currentIndex, showInfoTarjeta]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/tomos/tomos-contenido`, {
        method: "GET",
        cache: "no-cache",
      });

      const res = await response.json();

      setTomos(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  /* console.log(infoTarjeta); */

  const onMouseHover = (index: number) => {
    console.log(index);
    setHoverTarjeta(index);
  };

  const onMouseLeave = () => {
    setHoverTarjeta(0);
  };

  useEffect(() => {
    // Controlar el overflow del body
    document.body.style.overflow = showInfoTarjeta ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
    };
  }, [showInfoTarjeta]);

  if (loading) {
    return <></>;
  }

  return (
    <>
      {tomos != null && (
        <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper">
          {tomos.map((tarjeta: TomosWithContenido_I, index: number) => (
            <SwiperSlide
              key={index}
              className="!relative  cursor-pointer w-[280px] lg:w-[320px] overflow-hidden rounded-lg"
              onClick={() => onShowInfoTarjeta(index)}
              onMouseEnter={() => onMouseHover(index + 1)}
              onMouseLeave={onMouseLeave}
            >
              <Image
                unoptimized
                src={tarjeta.image}
                alt="alt"
                width={0}
                height={0}
                className={`object-cover h-[70px] sm:h-[100px] md:h-[120px] lg:h-[160px] xl:h-[200px] w-full transition-all duration-700 ${
                  hoverTarjeta == index + 1 ? "scale-125" : ""
                }`}
              />
              <div className="absolute w-full h-full bg-[#121212]/60 top-0"></div>
              <div className="absolute w-full h-full grid grid-cols-[80%_17%] p-2 md:p-5 justify-between items-center top-0">
                <h1
                  className="text-white max-[400px]:text-[8px] max-[500px]:text-[10px] max-[600px]:text-xs max-[639px]:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl bebas-neue"
                  style={{ lineHeight: "1" }}
                >
                  {language == "es" ? tarjeta.titulo.es : tarjeta.titulo.en}
                </h1>
                <FaCirclePlus
                  color="#B32C16"
                  className="max-[500px]:text-[10px] max-[600px]:text-xs max-[639px]:text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {showInfoTarjeta && (
        <>
          {infoTarjeta != null && (
            <div
              className={`w-full h-screen left-0 top-0 fixed bg-[#E8E8E8] z-[999] transition-opacity duration-500 ${
                animationShowInfo ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`w-full h-screen grid grid-cols-1 lg:grid-cols-[70%_30%] overflow-auto lg:overflow-hidden`}
              >
                <IoIosCloseCircle
                  className="cursor-pointer absolute right-5 top-2 text-2xl lg:text-4xl z-50 lg:hidden"
                  onClick={onCloseShowInfoTarjeta}
                />
                {/* DIV izquierdo */}
                <div className="w-full h-fit lg:h-screen bg-white relative flex justify-center items-center">
                  {/* Botones siguiente y anterior */}
                  <div className="w-full h-full absolute p-3 md:p-10">
                    <div className="w-full h-full flex flex-col justify-between items-center text-white text-[8px] md:text-xl xl:text-4xl relative 2xl:text-5xl">
                      <div className=" rounded-full bg-black/20 p-1 flex justify-center items-center">
                        <IoIosArrowUp
                          className="cursor-pointer"
                          onClick={handlePrevious}
                        />
                      </div>
                      <div className=" rounded-full bg-black/20 p-1 flex justify-center items-center">
                        <IoIosArrowDown
                          className="cursor-pointer"
                          onClick={handleNext}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Botones siguiente y anterior */}
                  <Image
                    unoptimized
                    src={infoTarjeta[currentIndex].image}
                    alt="alt"
                    width={0}
                    height={0}
                    className={`w-auto h-full object-cover transition-opacity duration-300 ${fadeClass}`}
                  />
                </div>
                {/* DIV izquierdo */}
                {/* DIV derecho */}
                <div className="bg-[#E8E8E8] w-full h-fit lg:h-screen overflow-y-auto p-10 flex flex-col gap-10 !relative">
                  <IoIosCloseCircle
                    className="cursor-pointer hidden lg:block absolute right-3 top-2 text-2xl lg:text-4xl"
                    onClick={onCloseShowInfoTarjeta}
                  />
                  <div className="w-full h-auto mb-5 lg:mb-10">
                    <FaArrowLeftLong size={20} />
                    <p className="text-xs xl:text-sm">
                      {language == "es"
                        ? infoTarjeta[currentIndex].leyenda.es
                        : infoTarjeta[currentIndex].leyenda.en}
                    </p>
                  </div>
                  <div className="w-full h-auto">
                    <p
                      className={`${
                        currentIndex == 0 ? "font-capital" : ""
                      } text-xs md:text-sm xl:text-base 2xl:text-2xl`}
                    >
                      {language == "es"
                        ? infoTarjeta[currentIndex].descripcion.es
                        : infoTarjeta[currentIndex].descripcion.en}
                    </p>
                  </div>
                </div>
                {/* DIV derecho */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
