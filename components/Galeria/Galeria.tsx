import Image from "next/image";
import React, { useState } from "react";
import trs from "@/public/locales/translate.json";
import { useLanguage } from "@/context/LanguageProvider";
import { Talleres_I } from "../Panel/Talleres/Talleres";

interface Props {
  taller: Talleres_I[];
}

export default function Galeria({ taller }: Props) {
  // Estado para manejar los links de las imágenes
  const [links, setLinks] = useState(taller.map(link => link.image));

  // Obtener el idioma desde el contexto
  const { language } = useLanguage();
  const translations = trs as any;

  // Estado para manejar la imagen expandida y la cantidad de imágenes visibles
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const [hasMoreImages, setHasMoreImages] = useState(visibleCount < links.length)

  // Función para manejar el click en una imagen (expandir o colapsar)
  const handleImageClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
  };

  // Función para cargar más imágenes (aumentar el número de imágenes visibles)
  const loadMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Aumentar en 6 imágenes
  };

  console.log(hasMoreImages)


  return (
    <>
      <div
        className={`w-full h-auto ${hasMoreImages ? "galeria-gradient" : ""}`}
      >
        {hasMoreImages && (
          <div className="w-full absolute bottom-8 md:bottom-12 lg:bottom-16 2xl:bottom-24 flex justify-center z-[999] ">
            <button
              className="rounded-lg text-white w-fit bg-black px-2 py-1 md:px-3 md:py-2 text-[10px] sm:text-xs md:text-sm 2xl:text-base"
              onClick={loadMoreImages}
            >
              {translations[language].ver_mas}
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-1 sm:gap-3 2xl:gap-5">
          {links.slice(0, visibleCount).map((link, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${expandedIndex === index
                ? "col-span-3 row-span-3"
                : "h-32 md:h-44 lg:h-64 2xl:h-80"
                }`}
              onClick={() => handleImageClick(index)}
            >
              <div className="w-full h-full bg-slate-400 rounded-lg overflow-hidden">
                <Image
                  src={`${link}`}
                  alt={`Evento Cultural ${index + 1}`}
                  width={1080}
                  height={720}
                  quality={100}
                  className={`w-full h-full object-cover transition-transform duration-300 ${expandedIndex === index ? "scale-125" : "scale-100"
                    }`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
