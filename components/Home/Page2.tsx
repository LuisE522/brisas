"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageProvider";

import trs from "@/public/locales/translate.json";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import FundadoresHotSpot from "../Historia/FundadoresHotSpot";
import CaroucelHistoria from "../Historia/CaroucelHistoria";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import LineaDelTiempo from "../Historia/LineaDelTiempo";
import YouTubeAudioPlayer from "../Historia/Audio";

export default function Page2({ fundadores }: { fundadores: any }) {
  const [load, setLoad] = useState(false);
  const { language } = useLanguage();

  const translations = trs as any;

  const onClicChangeImage = (toImage: string) => {};

  /* useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // Evita el scroll normal
      const deltaY = event.deltaY;

      if (deltaY > 0) {
        scrollToNextSection();
      } else {
        scrollToPrevSection();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []); */

  const scrollToNextSection = () => {
    const currentSection = getCurrentSection();
    if (currentSection) {
      const nextSection = currentSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Si no hay más secciones, puedes volver a la primera
        const firstSection =
          document.querySelector<HTMLElement>('div[id^="img"]');
        if (firstSection) {
          firstSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const scrollToPrevSection = () => {
    const currentSection = getCurrentSection();
    if (currentSection) {
      const prevSection = currentSection.previousElementSibling;
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Si no hay más secciones, puedes volver a la última
        const sections =
          document.querySelectorAll<HTMLElement>('div[id^="img"]');
        if (sections.length > 0) {
          const lastSection = sections[sections.length - 1];
          lastSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const getCurrentSection = (): HTMLElement | null => {
    const sections: any =
      document.querySelectorAll<HTMLElement>('div[id^="img"]');
    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        return section; // Retorna la sección actualmente visible
      }
    }
    return null;
  };

  const [isMute, setIsMute] = useState(true);
  const audioRef = useRef<any>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMute;
    }
  }, [isMute]);

  const toggleMute = () => {
    setIsMute((prev) => !prev);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="flex flex-col bg-black">
      <div>
        {/* <audio ref={audioRef} src="/assets/audios/historia.mp3" loop /> */}

        {/* <iframe
          id="youtube-iframe"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/kyA5HQwwXn0?autoplay=1&loop=1&playlist=kyA5HQwwXn0&controls=0&mute=${isMute ? "1" : "0"}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        /> */}
      </div>

      <div
        className={`h-screen w-full bg-[url("/assets/images/fondo2_home.png")] bg-no-repeat bg-cover bg-center relative z-0`}
        id="img1"
      >
        <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 lg:bottom-20 lg:left-10 z-50">
          <div className="bg-white rounded-full aspect-square h-[30px] lg:h-[50px] w-[30px] lg:w-[50px] 2xl:mt-7 flex justify-center items-center">
            {isMute ? (
              <FaVolumeMute
                color="black"
                className="cursor-pointer text-base md:text-lg lg:text-2xl"
                onClick={toggleMute}
              />
            ) : (
              <FaVolumeUp
                color="black"
                className="cursor-pointer text-base md:text-lg lg:text-2xl"
                onClick={toggleMute}
              />
            )}
            <YouTubeAudioPlayer videoId="K56u86QK-Yc" onMute={isMute} />
          </div>
        </div>

        <div className="bg-black/60 h-full w-full absolute top-0 left-0 -z-10"></div>
        <div className="bg-gradient-to-t from-black to-transparent w-full h-[200px] absolute bottom-0 left-0 -z-10"></div>

        <div className="w-full h-[calc(100%-124px)] absolute top-[62px] left-0 -z-10">
          <div className="relative max-w-[95%] w-[1080px] 2xl:w-[1500px] mx-auto h-full flex flex-col gap-1 items-start justify-center">
            <div className="w-full md:w-[70%] h-auto md:h-full flex flex-col gap-2 items-start justify-center">
              <h1 className="bebas-neue tracking-tight uppercase text-4xl md:text-6xl 2xl:text-8xl text-white">
                {translations[language].info_titulo}
              </h1>

              <p className="w-full text-white text-base md:text-2xl 2xl:text-4xl bebas-neue">
                {translations[language].info_descripcion}
              </p>
            </div>
            <div className="w-full ">
              <span className="text-sm md:text-base lg:text-lg text-white">
                {translations[language].hstoria_subInfo}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="img2">
        <h1 className="text-center text-white text-2xl sm:text-6xl 2xl:text-8xl bebas-neue my-4">
          {translations[language].hstoria_nuestros_fundadores}
        </h1>
        <div className="w-full h-auto lg:h-screen !relative overflow-hidden ">
          <FundadoresHotSpot fundadores={fundadores} />
          <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
          <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
            <Link href="#img3">
              <IoIosArrowDown
                size={30}
                onClick={() => onClicChangeImage("image3")}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      <div id="img3" className="my-20 flex flex-col gap-3 md:gap-10">
        <h1 className="text-white text-2xl sm:text-6xl 2xl:text-8xl bebas-neue text-center">
          Past- presidente
        </h1>
        <div className="w-[95%] mx-auto">
          {/* <CaroucelHistoria /> */}
          <LineaDelTiempo />
        </div>
      </div>

      {/* <div className="w-full h-screen relative" id="img3">
        <Image
          unoptimized
          src="/assets/images/info/historia_61_2.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full p-16 absolute top-0 left-0 z-10">
          <div className="w-full h-full grid grid-cols-2 gap-20">
            <div className="flex items-center">
              <h1 className="text-7xl bebas-neue text-white">
                Iniciando la vida institucional
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-white">
                En julio de 1968 también se alquila el primer local, en
                Balconcillo, en La Victoria. Después alquilaría en otros
                distritos como El Cercado, Jesús María. Y en ese mismo año, el
                28 de noviembre, a través de una asamblea se acordó cambiar la
                razón social de Centro Musical Brisas del Titikaka a Asociación
                Cultural Brisas del Titikaka. Se optó por “Titikaka”, con “k”,
                por ser un vocablo aimara. Y así estuvo en la Escritura de
                Constitución y Registros Públicos. Pero en 1985, de manera
                accidental o involuntariamente, en Registros Públicos se
                inscribió Brisas del Titicaca, con “c”. Y así permanece hasta la
                fecha, cuyo presidente actual es Juan Carlos Zevillanos Garnica.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
        <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
          <Link href="#img4">
            <IoIosArrowDown
              size={30}
              onClick={() => onClicChangeImage("image4")}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="w-full h-screen relative" id="img4">
        <Image
          unoptimized
          src="/assets/images/info/historia_65_3.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full p-16 absolute top-0 left-0 z-10">
          <div className="w-full h-full grid grid-cols-2 gap-20">
            <div className="flex items-center">
              <h1 className="text-7xl bebas-neue text-white">
                Antecedentes a las actividades artísticas
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-white">
                En julio de 1968 también se alquila el primer local, en
                Balconcillo, en La Victoria. Después alquilaría en otros
                distritos como El Cercado, Jesús María. Y en ese mismo año, el
                28 de noviembre, a través de una asamblea se acordó cambiar la
                razón social de Centro Musical Brisas del Titikaka a Asociación
                Cultural Brisas del Titikaka. Se optó por “Titikaka”, con “k”,
                por ser un vocablo aimara. Y así estuvo en la Escritura de
                Constitución y Registros Públicos. Pero en 1985, de manera
                accidental o involuntariamente, en Registros Públicos se
                inscribió Brisas del Titicaca, con “c”. Y así permanece hasta la
                fecha, cuyo presidente actual es Juan Carlos Zevillanos Garnica.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
        <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
          <Link href="#img5">
            <IoIosArrowDown
              size={30}
              onClick={() => onClicChangeImage("image5")}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="w-full h-screen relative" id="img5">
        <Image
          unoptimized
          src="/assets/images/info/historia_71.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full p-16 absolute top-0 left-0 z-10">
          <div className="w-full h-full grid grid-cols-2 gap-20">
            <div className="flex items-center">
              <h1 className="text-7xl bebas-neue text-white">
                Actividades culturales
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-white">
                En julio de 1968 también se alquila el primer local, en
                Balconcillo, en La Victoria. Después alquilaría en otros
                distritos como El Cercado, Jesús María. Y en ese mismo año, el
                28 de noviembre, a través de una asamblea se acordó cambiar la
                razón social de Centro Musical Brisas del Titikaka a Asociación
                Cultural Brisas del Titikaka. Se optó por “Titikaka”, con “k”,
                por ser un vocablo aimara. Y así estuvo en la Escritura de
                Constitución y Registros Públicos. Pero en 1985, de manera
                accidental o involuntariamente, en Registros Públicos se
                inscribió Brisas del Titicaca, con “c”. Y así permanece hasta la
                fecha, cuyo presidente actual es Juan Carlos Zevillanos Garnica.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
        <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
          <Link href="#img6">
            <IoIosArrowDown
              size={30}
              onClick={() => onClicChangeImage("image6")}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="w-full h-screen relative" id="img6">
        <Image
          unoptimized
          src="/assets/images/info/historia_72.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full p-16 absolute top-0 left-0 z-10">
          <div className="w-full h-full grid grid-cols-2 gap-20">
            <div className="flex items-center">
              <h1 className="text-7xl bebas-neue text-white">
                Actividades sociales
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-white">
                En julio de 1968 también se alquila el primer local, en
                Balconcillo, en La Victoria. Después alquilaría en otros
                distritos como El Cercado, Jesús María. Y en ese mismo año, el
                28 de noviembre, a través de una asamblea se acordó cambiar la
                razón social de Centro Musical Brisas del Titikaka a Asociación
                Cultural Brisas del Titikaka. Se optó por “Titikaka”, con “k”,
                por ser un vocablo aimara. Y así estuvo en la Escritura de
                Constitución y Registros Públicos. Pero en 1985, de manera
                accidental o involuntariamente, en Registros Públicos se
                inscribió Brisas del Titicaca, con “c”. Y así permanece hasta la
                fecha, cuyo presidente actual es Juan Carlos Zevillanos Garnica.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
        <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
          <Link href="#img7">
            <IoIosArrowDown
              size={30}
              onClick={() => onClicChangeImage("image7")}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="w-full h-screen relative" id="img7">
        <Image
          unoptimized
          src="/assets/images/info/historia_73.png"
          alt="alt"
          width={0}
          height={0}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full p-16 absolute top-0 left-0 z-10">
          <div className="w-full h-full grid grid-cols-2 gap-20">
            <div className="flex items-center">
              <h1 className="text-7xl bebas-neue text-white">
                Locales que ocupó la institución
              </h1>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-white">
                En julio de 1968 también se alquila el primer local, en
                Balconcillo, en La Victoria. Después alquilaría en otros
                distritos como El Cercado, Jesús María. Y en ese mismo año, el
                28 de noviembre, a través de una asamblea se acordó cambiar la
                razón social de Centro Musical Brisas del Titikaka a Asociación
                Cultural Brisas del Titikaka. Se optó por “Titikaka”, con “k”,
                por ser un vocablo aimara. Y así estuvo en la Escritura de
                Constitución y Registros Públicos. Pero en 1985, de manera
                accidental o involuntariamente, en Registros Públicos se
                inscribió Brisas del Titicaca, con “c”. Y así permanece hasta la
                fecha, cuyo presidente actual es Juan Carlos Zevillanos Garnica.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent absolute bottom-0"></div>
        <div className="absolute bottom-5 left-0 flex items-center justify-center w-full text-white z-10">
          <Link href="#img2">
            <IoIosArrowDown
              size={30}
              onClick={() => onClicChangeImage("image2")}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div> */}
    </div>
  );
}
