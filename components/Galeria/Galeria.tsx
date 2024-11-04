"use client";

import Image from "next/image";
import React, { useState } from "react";
import trs from "@/public/locales/translate.json";
import { useLanguage } from "@/context/LanguageProvider";

export default function Galeria({ links }: { links: string[] }) {
  const { language } = useLanguage();
  const translations = trs as any;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleImageClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expand/collapse
  };

  const loadMoreImages = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Aumentar en 3 imágenes
  };

  const hasMoreImages = visibleCount < links.length;

  return (
    <>
      <div
        className={`w-full h-auto ${hasMoreImages ? "galeria-gradient" : ""}`}
      >
        {hasMoreImages && (
          <div className="w-full absolute bottom-16 md:bottom-20 lg:bottom-32 2xl:bottom-44 flex justify-center">
            <button
              className="rounded-lg text-white w-fit bg-black z-50 px-2 py-1 md:px-3 md:py-2 text-[10px] sm:text-xs md:text-sm 2xl:text-base"
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
              className={`transition-all duration-300 ${
                expandedIndex === index
                  ? "col-span-3 row-span-3"
                  : "h-32 md:h-44 lg:h-64 2xl:h-80"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <div className="w-full h-full bg-slate-400 rounded-lg overflow-hidden">
                <Image
                  /* unoptimized */
                  src={`${link}`}
                  alt={`Evento Cultural ${index + 1}`}
                  width={1080}
                  height={720}
                  quality={100}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    expandedIndex === index ? "scale-125" : "scale-100"
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
