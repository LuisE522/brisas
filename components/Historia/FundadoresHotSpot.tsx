"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import CaroucelTarjetas from "./CaroucelTarjetas";
import { Fundadores_I } from "../Panel/Fundadores/ListFundadores";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";

interface HotspotProps {
  top: number;
  left: number;
  onClick: () => void;
}

const Hotspot: React.FC<HotspotProps> = ({ top, left, onClick }) => {
  return (
    <div
      className="hover:border-2 border-[#FF0000] h-24 w-20 xl:h-[155px] xl:w-32 hidden lg:block absolute cursor-pointer bg-transparent z-40"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
    />
  );
};

export default function FundadoresHotSpot({
  fundadores,
}: {
  fundadores: Fundadores_I[];
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [showInfoFundador, setShowInfoFundador] = useState(false);
  const [selectFundador, setSelectFundador] = useState<Fundadores_I | null>(
    null
  );

  const { language } = useLanguage();
  const translations = trs as any;

  const hotspots = [
    { top: 27.5, left: 9.5, info: "JORGE ROJAS GIRONDA" },
    { top: 25, left: 33.5, info: "CÉSAR ANTONIO ONTIVEROS LUNA" },
    { top: 24, left: 48.5, info: "JOSÉ MIGUEL ALFÉREZ AGUILAR" },
    { top: 21, left: 65, info: "BENJAMIN CORDERO" },
    { top: 20, left: 80.2, info: "POLICARPIO SILVESTRE MIRANDA MESTAS" },
    { top: 48.5, left: 30.5, info: "ARMANDO AZCUÑA NIÑO DE GUZMÁN" },
    { top: 48, left: 48.7, info: "TOMY FELIPE SARDÓN BACARREZA" },
    { top: 45, left: 64, info: "MANUEL CALDERÓN" },
    // Añade más hotspots aquí
  ];

  const showInfo = (info: string) => {
    //alert(info); // Aquí puedes reemplazar con un modal o tooltip

    const getFundador = fundadores.find((item: Fundadores_I) => {
      return item.nombre.includes(info);
    });

    console.log(fundadores)

    console.log(info);

    console.log(getFundador);
    setSelectFundador(getFundador ? getFundador : null);
    setShowInfoFundador(true);
  };

  return (
    <>
      <Image
        ref={imgRef}
        unoptimized
        src="/assets/images/info/historia_70.png"
        alt="alt"
        width={0}
        height={0}
        className="w-full h-auto"
      />
      <div className="absolute w-full bottom-12 z-50">
        <div className="max-w-[95%] w-[1333px] mx-auto">
          <CaroucelTarjetas />
        </div>
      </div>
      {hotspots.map((hotspot, index) => (
        <Hotspot
          key={index}
          top={hotspot.top}
          left={hotspot.left}
          onClick={() => showInfo(hotspot.info)}
        />
      ))}

      {showInfoFundador && (
        <div className="absolute top-0 w-full h-full flex items-center justify-center z-50">
          <div className="w-full h-full absolute top-0 bg-black/80"></div>
          <div className="max-w-[95%] w-[900px] xl:w-[1280px] max-h-[95%] h-[500px] xl:h-[800px] bg-black rounded-3xl !relative flex items-center justify-center">
            <div className="w-[90%] h-[80%] grid grid-cols-2 justify-center items-center box-border text-white gap-5">
              <div className="w-full h-full flex flex-col gap-5 justify-between">
                <div className="absolute top-2 left-2">
                  <IoIosCloseCircle
                    onClick={() => setShowInfoFundador(false)}
                    className="cursor-pointer text-2xl xl:text-5xl"
                  />
                </div>
                <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
                  <h1 className="text-3xl 2xl:text-5xl font-bold">
                    {selectFundador?.nombre}
                  </h1>
                  <p className="text-base 2xl:text-xl">
                    {language == "es" ? (
                      <>{selectFundador?.descripcion.es}</>
                    ) : (
                      <>{selectFundador?.descripcion.en}</>
                    )}
                  </p>
                </div>
                <div className="w-full flex flex-row gap-3 items-center">
                  {/* <AiFillSound size={30} /> */}
                  {/* <div className="w-1/2 h-1 relative">
                    <div className="w-1/3 h-full bg-gray-600 absolute top-0 left-0"></div>
                    <div className="w-full h-full bg-white"></div>
                  </div> */}
                </div>
              </div>
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center rounded-lg">
                <Image
                  unoptimized
                  src={selectFundador?.imagen ? selectFundador.imagen : ""}
                  alt="alt"
                  width={0}
                  height={0}
                  className="w-full xl:w-[500px] h-full xl:h-[500px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
