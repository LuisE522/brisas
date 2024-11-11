"use client";

import Image from "next/image";
import NavTransparent from "../Home/NavTransparent";
import InfiniteImageGrid from "@/components/GridInfinito/GridInfinito";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";
import VideoPlayer from "./Video";
import { IoIosCloseCircle } from "react-icons/io";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Danzas() {
  const { language } = useLanguage();

  const translations = trs as any;

  const [isMute, setIsMute] = useState(true);

  const danceVideoLink = [
    {
      danza: "caporales",
      link: "ngd_3tQTdPU",
    },
    {
      danza: "morenada",
      link: "bQ6pLcGOL7Y",
    },
    {
      danza: "diablada",
      link: "6tnxOubynQ0",
    },
    {
      danza: "arapa",
      link: "SzdY_QbBmcg",
    },
    {
      danza: "kullawa",
      link: "UJd1CMz2wFI",
    },
    {
      danza: "huaylarsh",
      link: "eN89xfLrrl4",
    },
    {
      danza: "contradanza",
      link: "w-OTOZMBfp8",
    },
    {
      danza: "waka",
      link: "aVq8EINxjlo",
    },
    {
      danza: "yakumama",
      link: "7Q7UTTEBt6A",
    },
    {
      danza: "llamerada",
      link: "CfTXEUDJTKQ"
    }
  ];

  const [showModalVideoDance, setShowModalVideoDance] = useState<string | null>(null);

  const showVideoDance = (danza: string) => {
    console.log(danza);

    const getLink = danceVideoLink.find((video) => video.danza === danza)?.link;

    setShowModalVideoDance(getLink ? getLink : null);
  };

  useEffect(() => {
    document.body.style.overflow =
      showModalVideoDance != null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
    };
  }, [showModalVideoDance]);

  return (
    <>
      {/* <div className="w-full absolute top-0 z-50">
        <NavTransparent />
      </div> */}

      <div className="h-[250px] sm:h-[350px] md:h-screen w-full absolute top-0 z-0">
        <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 lg:bottom-20 lg:left-10 z-50">
          <div className="bg-white rounded-full aspect-square h-[30px] lg:h-[50px] w-[30px] lg:w-[50px] 2xl:mt-7 flex justify-center items-center">
            {isMute ? (
              <FaVolumeMute
                color="black"
                className="cursor-pointer text-base md:text-lg lg:text-2xl"
                onClick={() => setIsMute(!isMute)}
              />
            ) : (
              <FaVolumeUp
                color="black"
                className="cursor-pointer text-base md:text-lg lg:text-2xl "
                onClick={() => setIsMute(!isMute)}
              />
            )}
          </div>
        </div>
        <div className="bg-black/70 w-full h-full absolute top-0"></div>
        {/* Imagen de fondo */}
        <VideoPlayer onMute={isMute} />
        {/* <Image
          unoptimized
          src="/assets/images/danzas/fondo.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        /> */}
        {/* Imagen de fondo */}

        {/* Humo */}
        <div className="w-full h-full absolute top-0 flex flex-row justify-between">
          <Image
            unoptimized
            src="/assets/images/danzas/i_humo.png"
            alt="alt"
            width={0}
            height={0}
            className="h-full w-auto absolute top-0 left-0"
          />
          <Image
            unoptimized
            src="/assets/images/danzas/d_humo.png"
            alt="alt"
            width={0}
            height={0}
            className="h-full w-auto absolute top-0 right-0"
          />
        </div>
        {/* Humo */}

        {/* Imagenes del centro */}
        <div className="h-full w-full absolute top-0 flex justify-center items-center">
          <div className="max-w-[95%] w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl grid grid-cols-2 gap-5 !relative">
            <div className="w-full h-full flex justify-start">
              <Image
                unoptimized
                src="/assets/images/danzas/izquierda.png"
                alt="alt"
                width={0}
                height={0}
                className="h-[120px] sm:h-[220px] md:h-[250px] lg:h-[400px] 2xl:h-[600px] w-auto"
              />
            </div>
            <div className="w-full h-full flex justify-end">
              <Image
                unoptimized
                src="/assets/images/danzas/derecha.png"
                alt="alt"
                width={0}
                height={0}
                className="h-[120px] sm:h-[220px] md:h-[250px] lg:h-[400px] 2xl:h-[600px] w-auto"
              />
            </div>
          </div>
        </div>
        {/* Imagenes del centro */}
      </div>

      {/* Texto del centro */}
      <div className="w-full h-[250px] sm:h-[350px] md:h-screen bg-black">
        <div className="mx-auto w-[300px] md:w-[600px] 2xl:w-[900px] h-full !relative">
          <div className="h-full w-full flex flex-col gap-1 items-center justify-center text-white text-center 2xl:-mt-7">
            <span
              className="text-[10px] sm:text-sm md:text-base 2xl:text-xl"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
            >
              {translations[language].danza_subtitulo}
            </span>
            <h1
              className="text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl font-bold"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
            >
              {translations[language].danza_titulo}
            </h1>
            <span
              className="text-[10px] sm:text-sm md:text-base 2xl:text-xl max-w-[95%] mx-auto w-[500px]"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
            >
              {translations[language].danza_descripcion}
            </span>
          </div>
        </div>
      </div>
      {/* Texto del centro */}

      <div className="min-h-screen w-full relative py-14">
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

        <div className="h-full w-full mt-10 flex flex-col gap-20 md:gap-32  justify-center items-center">
          {/* Titulo ante de las danzas */}
          <div className="max-w-[95%] mx-auto w-[800px] 2xl:w-full 2xl:max-w-screen-2xl">
            <h1 className="bebas-neue text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl text-center leading-tight">
              {translations[language].danza_titulo2}
            </h1>
          </div>
          {/* Titulo ante de las danzas */}

          {/* comienzo de las danzas mas importantes */}
          <div className="w-full flex flex-col gap-20 md:gap-32">
            <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto  h-[130px] min-[400px]:h-[190px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center gap-3 danzasFade">
              <Image
                src="/assets/images/danzas/personaje9.png"
                alt="alt"
                width={550}
                height={530}
                className="h-full w-auto"
              />
              <div className="h-full top-0 left-0 w-full md:w-[40%] flex justify-end flex-col gap-1 md:gap-3 z-50 relative">
                <Image
                  unoptimized
                  src="/assets/images/danzas/macha_diablada.png"
                  alt="alt"
                  width={0}
                  height={0}
                  className="w-full h-full absolute top-0 left-0"
                />
                <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                  <h1 className="bebas-neue text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none ">
                    {translations[language].danza_diablada_destacado_titulo}
                  </h1>
                  <span
                    className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                    onClick={() => showVideoDance("diablada")}
                  >
                    {translations[language].ver_danza}
                  </span>
                </div>
                <p className="text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_diablada_destacado_descripcion}
                </p>
              </div>
            </div>

            <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto  h-[130px] min-[400px]:h-[190px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center flex-row-reverse gap-3 danzasFade">
              <Image
                src="/assets/images/danzas/personaje1.png"
                alt="alt"
                width={550}
                height={530}
                className="h-full w-auto z-50"
              />
              <div className="h-full  top-0 left-0 w-full md:w-[40%] flex justify-end flex-col gap-1 md:gap-3 relative">
                <Image
                  unoptimized
                  src="/assets/images/danzas/mancha_caporales.png"
                  alt="alt"
                  width={0}
                  height={0}
                  className="w-full scale-150 h-full absolute top-0 left-24 md:left-36 -z-10"
                />
                <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                  <h1 className="bebas-neue text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none">
                    {translations[language].danza_caporales_titulo}
                  </h1>
                  <span
                    className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                    onClick={() => showVideoDance("caporales")}
                  >
                    {translations[language].ver_danza}
                  </span>
                </div>
                <p className="text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_caporales_descripcion}
                </p>
              </div>
            </div>

            <div className="w-full h-auto relative">
              <Image
                unoptimized
                src="/assets/images/danzas/mancha_morenada.png"
                alt="alt"
                width={0}
                height={0}
                className="w-[150px] md:w-[220px] lg:w-[400px] h-auto absolute top-0 right-0"
              />
              <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto  h-[130px] min-[400px]:h-[190px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center gap-3 danzasFade">
                <Image
                  src="/assets/images/danzas/personaje3.png"
                  alt="alt"
                  width={550}
                  height={530}
                  className="h-full w-auto"
                />
                <div className="h-full top-0 left-0 w-full md:w-[40%] flex justify-end flex-col gap-1 md:gap-3 z-50 relative">
                  <div className="w-full absolute flex justify-center -top-10 md:top-0">
                    <Image
                      src="/assets/images/danzas/planta2.png"
                      alt="alt"
                      width={300}
                      height={300}
                      className="w-[80px] sm:w-[110px] md:w-[150px] lg:w-[250px] xl:w-[300px] h-auto"
                    />
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                    <h1 className="bebas-neue text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none">
                      {translations[language].danza_morenada_titulo}
                    </h1>
                    <span
                      className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                      onClick={() => showVideoDance("morenada")}
                    >
                      {translations[language].ver_danza}
                    </span>
                  </div>
                  <p className="text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                    {translations[language].danza_morenada_descripcion}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] min-[400px]:h-[190px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center flex-row-reverse gap-3 danzasFade">
              <Image
                src="/assets/images/danzas/personaje2.png"
                alt="alt"
                width={550}
                height={530}
                className="h-full w-auto"
              />
              <div className="h-full  top-0 left-0 w-full md:w-[40%] flex justify-end flex-col gap-1 md:gap-3 z-50 relative">
                <div className="w-full absolute flex justify-center -top-14 md:top-0">
                  <Image
                    src="/assets/images/danzas/planta3.png"
                    alt="alt"
                    width={300}
                    height={300}
                    className="w-[100px] sm:w-[130px] md:w-[150px] lg:w-[250px] xl:w-[300px] h-auto"
                  />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                  <h1 className="bebas-neue text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none">
                    {translations[language].danza_sikuris_titulo}
                  </h1>
                  {/* <span className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer" onClick={() => showVideoDance("morenada")}>
                    {translations[language].ver_danza}
                  </span> */}
                </div>
                <p className="text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_sikuris_descripcion}
                </p>
              </div>
            </div>

            <div className="w-full h-auto relative">
              <Image
                unoptimized
                src="/assets/images/danzas/mancha_kullawa.png"
                alt="alt"
                width={0}
                height={0}
                className="w-[130px] md:w-[200px] lg:w-[400px] h-auto absolute top-0"
              />
              <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] min-[400px]:h-[190px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center gap-3 danzasFade">
                <Image
                  src="/assets/images/danzas/personaje4.png"
                  alt="alt"
                  width={550}
                  height={530}
                  className="h-full w-auto"
                />
                <div className="h-full  top-0 left-0 w-full md:w-[40%] flex justify-end flex-col gap-1 md:gap-3 z-50 relative">
                  <div className="w-full absolute flex justify-center -top-10 md:top-0">
                    <Image
                      src="/assets/images/danzas/planta4.png"
                      alt="alt"
                      width={300}
                      height={300}
                      className="w-[100px] sm:w-[120px] md:w-[150px] lg:w-[250px] xl:w-[300px] h-auto"
                    />
                  </div>
                  <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                    <h1 className="bebas-neue text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none">
                      {translations[language].danza_kullawa_titulo}
                    </h1>
                    <span
                      className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                      onClick={() => showVideoDance("kullawa")}
                    >
                      {translations[language].ver_danza}
                    </span>
                  </div>
                  <p className="text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                    {translations[language].danza_kullawa_descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Fin de las danzas mas importantes */}
        </div>
      </div>

      {/* Separacion con degradado*/}
      <div className="h-[300px] w-full bg-gradient-to-t from-[#121212] to-white"></div>
      {/* Separacion con degradado*/}

      <div className="min-h-screen w-full bg-[#121212] flex flex-col">
        <div className="-mt-36 flex flex-col gap-20 md:gap-32">
          <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex justify-center gap-3 danzasFade">
            <div className="h-full  top-0 left-0 w-full md:w-[40%] flex justify-center flex-col md:gap-3 z-50">
              <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                <h1
                  className="bebas-neue text-white text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                >
                  {translations[language].danza_llamerada_titulo}
                </h1>
                <span
                  className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                  onClick={() => showVideoDance("llamerada")}
                >
                  {translations[language].ver_danza}
                </span>
              </div>
              <p className="text-white text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                {translations[language].danza_llamerada_descripcion}
              </p>
            </div>
            <Image
              src="/assets/images/danzas/personaje5.png"
              alt="alt"
              width={700}
              height={500}
              className="h-full w-auto md:max-w-[70%]"
            />
          </div>

          <div className="w-full h-auto relative flex flex-col gap-20 md:gap-32">
            <Image
              src="/assets/images/danzas/mancha5.png"
              alt="alt"
              width={700}
              height={500}
              className="absolute w-full h-auto"
            />

            <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex flex-row-reverse gap-3 justify-center danzasFade">
              <div className="h-full top-0 right-0 w-[50%] md:w-[40%] flex justify-center flex-col gap-1 md:gap-3 z-50">
                <div className="w-full flex flex-col md:flex-row gap-1 md:gap-5 lg:gap-10 md:items-center">
                  <h1
                    className="bebas-neue text-white text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                  >
                    {translations[language].danza_carnaval_de_arapa_titulo}
                  </h1>
                  <span
                    className="uppercase z-10 w-fit bg-[#FF9900] text-white text-[6px] 2xl:text-base py-px px-1 md:p-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl flex justify-center items-center cursor-pointer"
                    onClick={() => showVideoDance("arapa")}
                  >
                    {translations[language].ver_danza}
                  </span>
                </div>
                <p className="text-white text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_carnaval_de_arapa_descripcion}
                </p>
              </div>
              <Image
                src="/assets/images/danzas/personaje6.png"
                alt="alt"
                width={700}
                height={500}
                className="h-full w-auto"
              />
            </div>

            <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex gap-3 justify-center danzasFade">
              <div className="h-full  top-0 left-0 w-[50%] md:w-[40%] flex justify-center flex-col md:gap-3 z-50">
                <h1
                  className="bebas-neue text-white text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                >
                  {translations[language].danza_tucumanos_titulo}
                </h1>
                <p className="text-white text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_tucumanos_descripcion}
                </p>
              </div>
              <Image
                src="/assets/images/danzas/personaje7.png"
                alt="alt"
                width={700}
                height={500}
                className="h-full w-auto"
              />
            </div>

            <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-[130px] sm:h-[220px] md:h-[250px] lg:h-[430px] xl:h-[500px] 2xl:h-[550px] relative flex flex-row-reverse gap-3 justify-center danzasFade">
              <div className="h-full top-0 right-0 w-[50%] md:w-[40%] flex justify-center flex-col md:gap-3 z-50">
                <h1
                  className="bebas-neue text-white text-xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl z-50   leading-none"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                >
                  {translations[language].danza_pandilla_punenia_titulo}
                </h1>
                <p className="text-white text-[8px] min-[400px]:text-[9px] sm:text-[11px] xl:text-base 2xl:text-xl">
                  {translations[language].danza_pandilla_punenia_descripcion}
                </p>
              </div>
              <Image
                src="/assets/images/danzas/personaje8.png"
                alt="alt"
                width={700}
                height={500}
                className="h-full w-auto"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-28">
            <div className="max-w-[95%] mx-auto w-[800px] 2xl:w-full 2xl:max-w-screen-2xl">
              <h1 className="bebas-neue text-2xl md:text-4xl lg:text-6xl 2xl:text-8xl text-center text-white">
                {translations[language].danza_otras_danzas}
              </h1>
            </div>
            <div className="w-full h-screen relative">
              <div className="w-full h-16 absolute top-0 bg-gradient-to-b from-[#121212] to-transparent z-50"></div>
              <div className="w-full h-16 absolute bottom-0 bg-gradient-to-t from-[#121212] to-transparent z-50"></div>
              <InfiniteImageGrid />
            </div>
          </div>

          <div></div>
        </div>
      </div>

      {showModalVideoDance && (
        <div className="fixed top-0 w-full h-screen z-50">
          <div
            className="w-full h-full bg-black opacity-75 "
            onClick={() => setShowModalVideoDance(null)}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center md:p-10">
            <iframe
              className="w-full aspect-video self-stretch"
              src={`https://www.youtube.com/embed/${showModalVideoDance}?autoplay=1&mute=1&controls=2`}
              title="Product Overview Video"
              aria-hidden="true"
            />
            {/* Aquí va el contenido del modal */}
            <button
              onClick={() => setShowModalVideoDance(null)}
              className="text-white absolute top-4 right-4 text-lg md:text-xl lg:text-2xl 2xl:text-5xl"
            >
              <IoIosCloseCircle />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
