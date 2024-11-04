"use client";
import React, { useEffect, useRef, useState } from "react";
import "./pannellum.css";

import { AiFillSound } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";

export default function PannellumHistoria() {
  const pannellumRef = useRef<HTMLDivElement>(null);
  const [showInfoFundador, setShowInfoFundador] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Importar Pannellum si no está en el servidor (Next.js SSR)
      //@ts-ignore
      import("./pannellum.js").then(() => {
        if (pannellumRef.current) {
          // Inicializar Pannellum
          //@ts-ignore
          window.pannellum.viewer(pannellumRef.current, {
            type: "equirectangular",
            panorama: "/assets/images/info/historia_70.png",
            autoLoad: true,
            showControls: true,
            hotSpots: [
              {
                pitch: 40, // Posición vertical del hotspot
                yaw: 50, // Posición horizontal del hotspot
                type: "info", // Tipo de hotspot
                text: "Información del Hotspot", // Texto que aparece al hacer clic
                clickHandlerFunc: () => {
                  infoFundador();
                },
              },
            ],
          });
        }
      });
    }
  }, []);

  const infoFundador = () => {
    setShowInfoFundador(true);
  };

  return (
    <>
      <div
        ref={pannellumRef}
        className="relative"
        style={{
          width: "100%",
          height: "500px", // Puedes ajustar el tamaño según lo necesites
        }}
      >
        {showInfoFundador && (
          <div className="absolute w-full h-full flex items-center justify-center z-50">
            <div className="max-w-[95%] w-[900px] max-h-[95%] h-[500px] bg-black rounded-3xl !relative flex items-center justify-center">
              <div className="w-[90%] h-[80%] grid grid-cols-2 box-border text-white gap-5">
                <div className="w-full h-full flex flex-col gap-5 justify-between">
                  <div className="absolute top-2 left-2">
                    <IoIosCloseCircle
                      size={30}
                      onClick={() => setShowInfoFundador(false)}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">
                      POLICARPIO SILVESTRE MIRANDA MESTAS
                    </h1>
                    <p>
                      Nació en Vilquechico, provincia de Huancané, de habla
                      español aymara, fue músico por excelencia, dominaba la
                      guitarra y el charango. En 1961 junto a cinco amigos,
                      todos músicos puneños, formaron el Conjunto Musical Brisas
                      del Titikaka. Fue un iniciador de Brisas de Titikaka, el
                      lider, promotor y director institucional.
                    </p>
                  </div>
                  <div className="w-full flex flex-row gap-3 items-center">
                    <AiFillSound size={30} />
                    <div className="w-1/2 h-1 relative">
                      <div className="w-1/3 h-full bg-gray-600 absolute top-0 left-0"></div>
                      <div className="w-full h-full bg-white"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center rounded-lg">
                  <Image
                    unoptimized
                    src="/assets/images/fundadores/fundador1.png"
                    alt="alt"
                    width={0}
                    height={0}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
