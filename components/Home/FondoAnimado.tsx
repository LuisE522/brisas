"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FondoAnimado() {
  const [load, setLoad] = useState(false);
  const [loadAnimation, setLoadAnimaion] = useState(false);

  useEffect(() => {
    setLoad(true);

    setTimeout(() => {
      setLoadAnimaion(true);
    }, 1000);
  }, []);

  return (
    <>
      <div
        className="min-h-screen h-full lg:h-screen w-full bg-slate-900 overflow-hidden relative"
        id="images-container"
      >
        {/* Imágenes de fondo */}
        <div className="hidden lg:block">
          <Image
            src="/assets/images/fondo_animado/1.png"
            unoptimized
            alt="Fondo 1"
            width={0}
            height={0}
            className={`w-full h-full object-cover ${
              load === false
                ? "transition-transform duration-1000 scale-[250%]"
                : "transition-transform duration-1000 scale-[130%]"
            } absolute -top-10 md:-top-36`}
          />
          <Image
            src="/assets/images/fondo_animado/2.png"
            unoptimized
            alt="Fondo 2"
            width={0}
            height={0}
            className={`w-full object-cover ${
              load === false
                ? "transition-transform duration-1000 scale-[250%]"
                : "transition-transform duration-1000 scale-[130%]"
            } absolute -bottom-0 left-0`}
          />
          <Image
            src="/assets/images/fondo_animado/3.png"
            unoptimized
            alt="Fondo 3"
            width={0}
            height={0}
            className={`w-full object-cover ${
              load === false
                ? "transition-transform duration-1000 scale-[250%]"
                : "transition-transform duration-1000 scale-[130%]"
            } absolute -bottom-0 left-0`}
          />
          <Image
            src="/assets/images/fondo_animado/4.png"
            unoptimized
            alt="Fondo 4"
            width={0}
            height={0}
            className={`w-full object-cover ${
              load === false
                ? "transition-transform duration-1000 scale-[250%]"
                : "transition-transform duration-1000 scale-[130%]"
            } absolute -bottom-0 left-0`}
          />
          <Image
            src="/assets/images/fondo_animado/5.png"
            unoptimized
            alt="Fondo 5"
            width={0}
            height={0}
            className={`w-full object-cover ${
              load === false
                ? "transition-transform duration-1000 scale-[250%]"
                : "transition-transform duration-1000 scale-[130%]"
            } absolute -bottom-0 left-0`}
          />
        </div>

        <div className="block lg:hidden">
          <Image
            unoptimized
            src="/assets/images/fondo_home_2.png"
            alt="alt"
            width={0}
            height={0}
            className="w-full h-screen object-cover"
          />
        </div>

        {/* Fondo transparente */}
        <div className="bg-black/80 h-full w-full absolute top-0 left-0 z-0"></div>
        {/* Fondo transparente */}

        <div className="min-h-screen h-full lg:h-screen w-full bg-center bg-cover absolute top-0 left-0 hidden md:flex">
          <div>
            <Image
              unoptimized
              src={"/assets/images/i_humo.png"}
              alt=""
              width={0}
              height={0}
              className="w-full h-full absolute top-0 left-0"
            />
            <Image
              unoptimized
              src={"/assets/images/i_humo.png"}
              alt=""
              width={0}
              height={0}
              className="w-full h-full absolute top-0 left-0"
            />
            <Image
              unoptimized
              src={"/assets/images/d_humo.png"}
              alt=""
              width={0}
              height={0}
              className="w-full h-full absolute top-0 left-0"
            />
            <Image
              unoptimized
              src={"/assets/images/d_humo.png"}
              alt=""
              width={0}
              height={0}
              className="w-full h-full absolute top-0 left-0"
            />
          </div>
        </div>

        <div className="w-full h-full top-0 left-0 absolute grid grid-cols-2">
          <Image
            unoptimized
            src={"/assets/images/d_planta.png"}
            alt=""
            width={0}
            height={0}
            className="h-auto w-[45%] md:w-[30%] absolute z-40 bottom-0 right-0"
            /* className={`${
              loadAnimation == false ? "divOnLoadMobile" : "divOnLoadMobile"
            } h-auto w-auto absolute bottom-0 right-0`} */
          />
          <Image
            unoptimized
            src={"/assets/images/d_planta.png"}
            alt=""
            width={0}
            height={0}
            className="scale-x-[-1] h-auto w-[45%] md:w-[30%] absolute z-40 bottom-0 left-0"
            /* className={`${
              loadAnimation == false ? "divOnLoadMobile" : "divOnLoadMobile"
            } scale-x-[-1] h-auto w-auto absolute bottom-0 left-0`} */
          />
          {/* <Image
            unoptimized
            src={"/assets/images/a_planta.png"}
            alt=""
            width={0}
            height={0}
            className=" w-[20%] h-auto absolute top-0 right-0"
          /> */}
        </div>
      </div>
    </>
  );
}
