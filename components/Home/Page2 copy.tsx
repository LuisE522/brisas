"use client";

import React, { useState } from "react";
import NavTransparent from "./NavTransparent";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageProvider";

import trs from "@/public/locales/translate.json";
import CaroucelHistoria from "../Historia/CaroucelHistoria";
import CaroucelListEvento from "../Evento/CaroucelListEvento";
import LineaDelTiempo from "../Historia/LineaDelTiempo";
import PannellumHistoria from "../Pannellum/PannellumHistoria";

export default function Page2() {
  const [load, setLoad] = useState(false);
  const { language } = useLanguage();

  const translations = trs as any;

  return (
    <div className="flex flex-col gap-24 md:gap-36 bg-black">
      <div
        className={`h-screen w-full bg-[url("/assets/images/fondo2_home.png")] bg-no-repeat bg-cover bg-center relative z-0`}
      >
        <div className="bg-black/60 h-full w-full absolute top-0 left-0 -z-10"></div>
        <div className="bg-gradient-to-t from-black to-transparent w-full h-[200px] absolute bottom-0 left-0 -z-10"></div>
        {/* <div className="w-full h-auto z-[9999]">
          <NavTransparent />
        </div> */}
        <div className="w-full h-[calc(100%-124px)] absolute top-[62px] left-0 -z-10">
          <div className="relative max-w-[95%] w-[1080px] mx-auto h-full flex flex-col gap-1 items-start justify-center">
            <div className="w-[70%] h-full flex flex-col gap-2 items-start justify-center">
              {/* <p className="text-white">
                {translations[language].info_subtitulo}
              </p> */}
              {/* <h1
                className="bebas-neue tracking-tight uppercase font-bold text-5xl md:text-7xl bg-gradient-to-t from-[#FC228A] to-[#FF9900] bg-clip-text text-transparent"
                style={{ lineHeight: "1.2" }}
              >
                {translations[language].info_titulo}
              </h1> */}

              <h1 className="bebas-neue tracking-tight uppercase text-3xl md:text-6xl text-white">
                {translations[language].info_titulo}
              </h1>

              <p className="w-full text-white text-base md:text-2xl bebas-neue">
                {translations[language].info_descripcion}
              </p>

              {/* <div className="w-[230px] h-fit absolute bottom-0 right-0">
              <p className="text-white text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur. Egestas amet tincidunt{" "}
                <span className="text-[#FF8814]">
                  platea id. Ut augue proin odio est molestie elit nisl
                </span>{" "}
                facilisis sodales.
              </p>
            </div> */}
            </div>
            <div className="w-full ">
              <span className="text-base md:text-lg text-white">
                La historia de nuestra asociación cultural empezó con la buena
                voluntad de migrantes puneños, aimaras y quechuas, que llegaron
                a Lima con sus tradiciones, danzas, música y costumbres. Es
                decir, con toda su cultura a cuestas. Y no solo era la nostalgia
                por el terruño, sino también el empeñó por difundir la cultura
                altiplánica en la capital del Perú. editado :V
              </span>
            </div>
          </div>
        </div>
        {/* <div className="w-full z-10">
          <div className="w-full h-[70px] bg-white"></div>
        </div> */}
      </div>

      {/* <div className="relative max-w-[95%] w-[800px] mx-auto">
        <CaroucelListEvento />
      </div> */}

      <div className="w-full h-auto">
        <Image
          unoptimized
          src="/assets/images/info/historia_70.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-auto"
        />
      </div>

      {/* <div className="w-full h-auto">
        <PannellumHistoria />
      </div> */}

      <div className="w-full bg-black text-white">
        <div className="relative max-w-[95%] w-[800px] mx-auto flex flex-col gap-24">
          <div className="w-full bg-black text-white ">
            <div className="relative max-w-[95%] w-[800px] mx-auto flex flex-col gap-24 md:gap-28">
              <div className="w-full h-auto relative flex flex-col gap-10 ">
                <p className="text-white text-sm">
                  La historia de nuestra asociación cultural empezó con la buena
                  voluntad de migrantes puneños, aimaras y quechuas, que
                  llegaron a Lima con sus tradiciones, danzas, música y
                  costumbres. Es decir, con toda su cultura a cuestas. Y no solo
                  era la nostalgia por el terruño, sino también el empeñó por
                  difundir la cultura altiplánica en la capital del Perú.
                </p>

                <div className="h-full w-full ">
                  <Image
                    src="/assets/images/info/historia_4.png"
                    unoptimized
                    alt="alt"
                    width={0}
                    height={0}
                    className="w-full h-auto top-0 left-0 "
                  />
                  <div className="bg-black/60 w-full h-full absolute top-0 md:hidden"></div>
                  <div className="absolute top-0 left-0 flex flex-col gap-5 md:grid md:grid-cols-2 w-full h-full">
                    <div className="w-full h-fit md:h-full flex justify-center md:justify-start items-center">
                      <h1
                        className="text-xl sm:text-2xl md:text-5xl bebas-neue leading-none"
                        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                      >
                        Conjunto Musical Brisas del Titikaka
                      </h1>
                    </div>
                    <div className="w-full h-full flex flex-col gap-3 justify-end relative text-[10px] sm:text-xs">
                      <div className="w-full h-full flex flex-col md:justify-end gap-3 md:absolute">
                        <p>
                          En el año 1961, un grupo de puneños, todos músicos,
                          deciden formar un grupo y lo denominaron Conjunto
                          Musical Brisas del Titikaka. Lo admirable es que este
                          grupo se creó en un espacio humilde, que era la
                          habitación del puneño César Antonio Ontiveros Luna,
                          ubicado en la calle Gamarra, en el corazón del
                          distrito de la Victoria. Ontiveros Luna cedió su
                          habitación todos los sábados para que el conjunto
                          ensayara y afiate su repertorio. El conjunto se afirmó
                          en los social y artístico, sin embargo, no existe acta
                          de fundación o documento alguno sobre estos hechos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 

          <div className="w-full h-auto relative md:mb-36">
            <div className="h-full w-full ">
              <Image
                src="/assets/images/info/historia_2.png"
                unoptimized
                alt="alt"
                width={0}
                height={0}
                className="w-full h-auto top-0 left-0 "
              />
              <div className="bg-black/60 w-full h-full absolute top-0 md:hidden"></div>
              <div className="absolute top-0 left-0 flex flex-col gap-5 md:grid md:grid-cols-2 w-full h-full">
                <div className="w-full h-fit md:h-full flex justify-center md:justify-start items-center md:-ml-10">
                  <h1
                    className="text-xl sm:text-2xl md:text-4xl bebas-neue leading-none"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                  >
                    Lorem ipsum dolor consectetur. Quis sed nisi habitant
                  </h1>
                </div>
                <div className="w-full h-full flex flex-col gap-3 justify-end relative text-[10px] sm:text-xs">
                  <div className="w-full h-full flex flex-col md:justify-end gap-3 md:absolute md:-bottom-20">
                    <p>
                      Lorem ipsum dolor sit amet consectetur. In turpis habitant
                      aliquam adipiscing augue gravida. Viverra dui egestas duis
                      nunc eu vulputate sit blandit non. Leo mauris tristique
                      vitae sodales semper platea non id. Proin mollis vitae
                      massa
                    </p>
                    <p>
                      pretium egestas scelerisque pulvinar amet. Lobortis
                      consequat nulla bibendum amet. Egestas non turpis
                      porttitor hendrerit accumsan aliquet vulputate dui. Nibh
                      turpis in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Nuestros fundadores */}
      <div className="w-full bg-black">
        <div className="mx-auto max-w-[95%] w-[1333px]">
          <div className="w-full grid grid-cols-1 lg:justify-between lg:grid-cols-[25%_73%] xl:grid-cols-[20%_78%]">
            <h1 className="text-4xl lg:text-6xl text-white font-bold text-center lg:text-left bebas-neue">
              NUESTROS <span className="text-[#006EB6]">FUNDADORES</span>
            </h1>
            <div className="w-full relative">
              <CaroucelHistoria />
            </div>
          </div>
        </div>
      </div>
      {/* Nuestros fundadores */}

      <div className="w-full bg-black text-white ">
        <div className="relative max-w-[95%] w-[800px] mx-auto flex flex-col gap-24 md:gap-36">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full h-full">
              <Image
                unoptimized
                src="/assets/images/info/historia_5.png"
                alt="alt"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-end gap-3 md:gap-5">
              <h1 className="text-xl sm:text-2xl md:text-4xl bebas-neue leading-none">
                de Conjunto Musical a Centro Musical Brisas del Titicaca.
              </h1>
              <div className="flex flex-col gap-2 md:gap-5 text-[10px] sm:text-xs md:text-sm">
                <p>
                  En diciembre de 1965, se cambia de nombre de Conjunto Musical
                  Brisas del Titikaka a Centro Musical Brisas del Titicaca. En
                  1966, eligió su primera junta directiva, cuyo presidente fue
                  Juan José Carpio Mostejo. Merece recordarse que en aquella
                  oportunidad se inscribieron dos personalidades de la cultura
                  puneña: uno, el escritor Arturo Peralta Miranda, reconocido
                  por su seudónimo Gamaliel Churata, el gran autor de la novela
                  El pez de oro. A Churata, que se inscribió con su esposa, la
                  boliviana Carmen Gallardo Muguertegui, se le dispensó por su
                  edad la Libreta Electoral. Y dos, el músico puneño Víctor
                  Cuentas Ampuero, compositor de la famosa pieza “Cholitas
                  puneñas”. Cuentas Ampuero incluso llegó a ser directivo los
                  años 1967 y 1968.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-auto relative flex flex-col gap-10 ">
            <p className="text-white text-sm">
              Entre los años, 1968 y 1970, establece su personería jurídica y
              también definió su razón social, como Asociación Cultural Brisas
              del Titicaca. Asimismo, se redactó su primer estatuto y se realizó
              la respectiva Escritura Pública, así como el Acta de su
              Constitución.
            </p>

            <div className="h-full w-full ">
              <Image
                src="/assets/images/info/historia_2.png"
                unoptimized
                alt="alt"
                width={0}
                height={0}
                className="w-full h-auto top-0 left-0 "
              />
              <div className="bg-black/60 w-full h-full absolute top-0 md:hidden"></div>
              <div className="absolute top-0 left-0 flex flex-col gap-5 md:grid md:grid-cols-2 w-full h-full">
                <div className="w-full h-fit md:h-full flex justify-center md:justify-start items-center">
                  <h1
                    className="text-xl sm:text-2xl md:text-5xl bebas-neue leading-none"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
                  >
                    se alquila el primer local
                  </h1>
                </div>
                <div className="w-full h-full flex flex-col gap-3 justify-end relative text-[10px] sm:text-xs">
                  <div className="w-full h-full flex flex-col md:justify-end gap-3 md:absolute">
                    <p>
                      En julio de 1968 también se alquila el primer local, en
                      Balconcillo, en La Victoria. Después alquilaría en otros
                      distritos como El Cercado, Jesús María. Y en ese mismo
                      año, el 28 de noviembre, a través de una asamblea se
                      acordó cambiar la razón social de Centro Musical Brisas
                      del Titikaka a Asociación Cultural Brisas del Titikaka. Se
                      optó por “Titikaka”, con “k”, por ser un vocablo aimara. Y
                      así estuvo en la Escritura de Constitución y Registros
                      Públicos. Pero en 1985, de manera accidental o
                      involuntariamente, en Registros Públicos se inscribió
                      Brisas del Titicaca, con “c”. Y así permanece hasta la
                      fecha, cuyo presidente actual es Juan Carlos Zevillanos
                      Garnica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3 md:gap-5 justify-center">
              <h1 className="text-xl sm:text-2xl md:text-4xl bebas-neue leading-none">
                la fundación de la Asociación Cultural Brisas del Titicaca
              </h1>
              <div className="flex flex-col gap-2 md:gap-5 text-[10px] sm:text-xs md:text-sm">
                <p>
                  El 10 de julio de 1969, en asamblea, ante la falta de acta de
                  fundación, se acuerda que la fecha de fundación de la
                  Asociación Cultural Brisas del Titicaca será el 4 de noviembre
                  de 1962. Se determinó esta fecha para coincidir con la fecha
                  de fundación del departamento de Puno. Así, Brisas del
                  Titicaca llega a su 62 aniversario ofreciendo lo mejor del
                  folklore peruano bajo el cielo de Lima.
                </p>
              </div>
            </div>
            <div className="w-full h-full">
              <Image
                unoptimized
                src="/assets/images/info/historia_1.png"
                alt="alt"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* <div className="w-[80%] h-auto relative flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl bebas-neue">
              Así , Brisas del Titicaca llega a su 62 aniversario ofreciendo lo
              mejor del folklore peruano bajo el cielo de Lima.
            </h1>
          </div> */}
        </div>
      </div>

      {/* Linea del tiempo */}
      <div className="w-full bg-black">
        <div className="mx-auto max-w-[95%] w-[1333px]">
          <div className="w-full grid grid-cols-1 lg:justify-between lg:grid-cols-[25%_73%] xl:grid-cols-[20%_78%]">
            <h1 className="text-4xl lg:text-6xl text-white font-bold text-center lg:text-left bebas-neue">
              LINEA DEL <span className="text-[#006EB6]">TIEMPO</span>
            </h1>
            <div className="w-full relative">
              <LineaDelTiempo />
            </div>
          </div>
        </div>
      </div>
      {/* Linea del tiempo */}

      {/* <div className="w-full min-h-screen">
        <div className="h-screen w-full relative">
          <Image
            unoptimized
            src="/assets/images/info/nueva_era.png"
            alt="alt"
            width={0}
            height={0}
            className="w-auto md:w-full h-full md:h-auto object-cover md:object-contain"
          />
          <div className="w-full h-full flex items-center justify-center absolute top-0">
            <h1
              className="text-6xl md:text-8xl font-semibold text-white text-center"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 2)" }}
            >
              LA NUEVA ERA
            </h1>
          </div>
        </div>
        <div className="h-screen w-full bg-[#1f1f1f] -mt-20"></div>
      </div> */}

      <div></div>
    </div>
  );
}
