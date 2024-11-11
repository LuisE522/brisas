import { API_URL } from "@/const";
import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import trs from "@/public/locales/translate.json";
import React, { useEffect, useState } from "react";

export default function Carta() {
  const { language } = useLanguage();

  const translations = trs as any;

  const [categoria, setCategoria] = useState("Entradas");
  const [carta, setCarta] = useState<any>(null);
  const [platosList, setPlatosList] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarta = async () => {
      const response = await fetch(`${API_URL}/comidas/listcomidaspublic`, {
        method: "GET",
        cache: "no-cache",
      });

      const res = await response.json();
      setCarta(res);

      setCategoria(res[0].nombre);

      const asdassa = res.filter((item: any) => item.nombre === "Entradas");

      console.log(asdassa)

      setPlatosList(asdassa);
      setIsLoading(false);
    };

    fetchCarta();
  }, []);

  const changeCategoria = (option: string) => {
    setCategoria(option);

    const asdassa = carta.filter((item: any) => item.nombre === option);
    setPlatosList(asdassa);
  };

  return (
    <div
      id="carta_digital"
      className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto relative flex flex-col gap-10 md:gap-20 py-10 md:py-20"
    >
      <div className="w-full flex flex-col gap-8">
        <div className="w-full h-[70px] lg:h-[50px] flex flex-row flex-nowrap overflow-x-auto items-center justify-between gap-7 md:gap-5 lg:gap-3 uppercase text-nowrap">
          {carta != null && (
            <>
              {carta.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => changeCategoria(item.nombre)}
                  className={`cursor-pointer transition-all duration-500 ${
                    categoria === item.nombre
                      ? "text-lg 2xl:text-2xl font-bold"
                      : "text-sm 2xl:text-lg"
                  }`}
                >
                  {item.nombre}
                </div>
              ))}
            </>
          )}
        </div>
        <p className="text-6xl text-center bebas-neue" id="entradas">
          {categoria}
        </p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 2xl:gap-10">
          {isLoading == false ? (
            <>
              {platosList[0].comidas.map((plato: any, index: number) => (
                <div
                  key={index}
                  className="w-full relative h-auto overflow-hidden rounded-lg"
                  style={{ boxShadow: "0px 8px 19px 4px rgba(51,51,51,0.3)" }}
                >
                  <div className="w-full h-44 lg:h-52 2xl:h-96 relative overflow-hidden">
                    <Image
                      unoptimized
                      src={`${
                        plato.image
                          ? plato.image
                          : "http://localhost:3000/assets/images/logo_brisas.jpg"
                      }`}
                      alt="alt"
                      width={0}
                      height={0}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3 w-full h-32 md:h-40 2xl:h-56 flex flex-col gap-1">
                    <h1 className="font-bold text-base 2xl:text-2xl">
                      {plato.nombre}
                    </h1>
                    <p className="text-[10px] md:text-xs 2xl:text-base line-clamp-4">
                      {language == "es"
                        ? plato.descripcion.es
                        : plato.descripcion.en}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full relative h-auto overflow-hidden rounded-lg"
                >
                  <div className="w-full h-[300px] bg-slate-400 animate-pulse"></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-5 text-center text-sm md:text-base">
        <Link
          href="https://bit.ly/CartaPuquina"
          target="_blank"
          className="border-2 border-[#949393] w-[250px] px-2 py-1 text-[#949393]"
        >
          {translations[language].puquina_carta_digital_qocha}
        </Link>
        <Link
          href="https://drive.google.com/file/d/1eDl5szVReJaHh0TXnJhRQwjASrb9EGWw/view?usp=drive_link"
          target="_blank"
          className="border-2 border-[#949393] w-[250px] px-2 py-1 text-[#949393]"
        >
          {translations[language].puquina_carta_fiesta_patronal}
        </Link>
        <Link
          href="https://drive.google.com/file/d/155FCBm7fASrwjYI8WUQ9CvDoOAvKuZ8z/view?usp=drive_link"
          target="_blank"
          className="border-2 border-[#949393] w-[250px] px-2 py-1 text-[#949393]"
        >
          {translations[language].puquina_carta_cocteles}
        </Link>
      </div>
    </div>
  );
}
