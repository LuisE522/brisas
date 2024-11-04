"use client";

import { API_URL } from "@/const";
import React, { useEffect, useRef, useState } from "react";
import { Danzas_I } from "../Panel/Danzas/ListDanzas";
import { useLanguage } from "@/context/LanguageProvider";
import trs from "@/public/locales/translate.json";
import Image from "next/image";

const initialColumns = 6;
const imagesPerLoad = 10;

export default function GameArea() {
  const danceVideoLink = [
    {
      danza: "la-diablada-un-icono-de-tradicion",
      link: "6tnxOubynQ0",
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
      danza: "waka-waka",
      link: "aVq8EINxjlo",
    },
  ];

  const { language } = useLanguage();
  const translations = trs as any;

  const [loading, setLoading] = useState(true);
  const [listDanzas, setListDanzas] = useState<Danzas_I[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });
  const [visibleImages, setVisibleImages] = useState<Danzas_I[]>([]);

  const [selectedImage, setSelectedImage] = useState<null | Danzas_I>(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [hasVideo, setHasVideo] = useState<undefined | string>(undefined);

  const handleImageClick = (src: Danzas_I, event: React.MouseEvent) => {
    const target = event.currentTarget;
    const { left, top } = target.getBoundingClientRect();

    setSelectedImage(src);
    console.log(src)

    const getLink = danceVideoLink.find(
      (video) => video.danza === src.slug
    )?.link;

    setHasVideo(getLink);

    setTimeout(() => {
      setImageModalOpen(true);
    }, 1000);

    // Aplicar animación
    target.classList.add("animate-move");
    target.classList.add("z-50");

    setTimeout(() => {
      target.classList.remove("animate-move");
      target.classList.remove("z-50");
    }, 1000);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: event.clientX, y: event.clientY });
    if (containerRef.current) {
      setScrollPos({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop,
      });
    }
    event.preventDefault();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    event.preventDefault();

    const deltaX = event.clientX - startPos.x;
    const deltaY = event.clientY - startPos.y;

    containerRef.current.scrollLeft = scrollPos.left - deltaX;
    containerRef.current.scrollTop = scrollPos.top - deltaY;

    // Detectar si se ha llegado al límite
    if (containerRef.current.scrollLeft <= 0) {
      loadMoreImages("left");
    } else if (
      containerRef.current.scrollLeft + containerRef.current.clientWidth >=
      containerRef.current.scrollWidth
    ) {
      loadMoreImages("right");
    }

    if (containerRef.current.scrollTop <= 0) {
      loadMoreImages("up");
    } else if (
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
      containerRef.current.scrollHeight
    ) {
      loadMoreImages("down");
    }
  };

  const loadMoreImages = (direction: string) => {
    const currentLength = visibleImages.length;

    // Cargar más imágenes en la dirección adecuada
    if (direction === "right" || direction === "down") {
      if (currentLength < listDanzas.length) {
        const newImages = listDanzas.slice(
          currentLength,
          currentLength + imagesPerLoad * initialColumns
        );
        setVisibleImages((prev) => [...prev, ...newImages]);
      }
    }

    if (direction === "left" || direction === "up") {
      const newImages = listDanzas.slice(
        Math.max(0, currentLength - imagesPerLoad * initialColumns),
        currentLength
      );
      setVisibleImages((prev) => [...newImages, ...prev]);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    const touch = event.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
    if (containerRef.current) {
      setScrollPos({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop,
      });
    }
    event.preventDefault();
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;

    containerRef.current.scrollLeft = scrollPos.left - deltaX;
    containerRef.current.scrollTop = scrollPos.top - deltaY;

    // Detectar si se ha llegado al límite
    if (containerRef.current.scrollLeft <= 0) {
      loadMoreImages("left");
    } else if (
      containerRef.current.scrollLeft + containerRef.current.clientWidth >=
      containerRef.current.scrollWidth
    ) {
      loadMoreImages("right");
    }

    if (containerRef.current.scrollTop <= 0) {
      loadMoreImages("up");
    } else if (
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
      containerRef.current.scrollHeight
    ) {
      loadMoreImages("down");
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`${API_URL}/danzas/listdanzas`, {
        method: "GET",
        cache: "no-cache",
      });

      const res = await response.json();

      setListDanzas(res);
      setLoading(false);
      setVisibleImages(res.slice(0, initialColumns * 5));

      /* console.log(res);
      console.log(visibleImages); */
    };

    load();
  }, []);

  const [widthGrid, setWidthGrid] = useState(300);
  const [heightGrid, setHeightGrid] = useState(380);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setWidthGrid(150);
        setHeightGrid(200);
      } else if (window.innerWidth < 768) {
        setWidthGrid(200);
        setHeightGrid(280);
      } else if (window.innerWidth > 1536) {
        setWidthGrid(500);
        setHeightGrid(580);
      } else {
        /* console.log("Por defecto"); */
        setWidthGrid(300);
        setHeightGrid(380);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    // Controlar el overflow del body
    document.body.style.overflow = isImageModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
    };
  }, [isImageModalOpen]);

  if (loading) {
    return (
      <>
        <h1>Cargando....</h1>
      </>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="h-screen w-full overflow-hidden border relative cursor-grab"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          className="grid gap-3 lg:gap-5 2xl:gap-7 grid-infinito"
          style={{
            gridTemplateColumns: `repeat(${initialColumns}, 1fr)`,
            width: `${initialColumns * widthGrid}px`,
            height: `${
              Math.ceil(visibleImages.length / initialColumns) * heightGrid
            }px`,
          }}
        >
          {visibleImages.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg danzasCaja hover:-top-1 transition-all duration-300"
              onMouseDown={(event) => {
                event.stopPropagation();
                handleMouseDown(event);
              }}
              onClick={(e) => handleImageClick(src, e)}
            >
              <Image
                src={src.image}
                alt={`Image ${index + 1}`}
                width={350}
                height={450}
                className="object-cover w-full h-full rounded-lg shadow-lg hover:scale-125 transition-all duration-300 "
              />
            </div>
          ))}
        </div>
      </div>

      {isImageModalOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col gap-20 z-50 transition-all p-10 overflow-y-auto ${
            selectedImage?.video ? "overflow-x-hidden" : "md:overflow-hidden"
          }`}
        >
          <div className="w-full h-screen flex justify-end items-center">
            <span
              className="absolute top-5 left-5 p-2 text-xl lg:text-2xl xl:text-4xl font-extrabold cursor-pointer z-50"
              onClick={() => setImageModalOpen(false)}
            >
              x
            </span>
            <img
              src="/assets/images/danzas/mancha7.png"
              className="w-[500px] xl:w-[700px] 2xl:w-[800px] h-auto absolute top-0 left-0"
            />
            <img
              src="/assets/images/danzas/mancha6.png"
              className="w-auto h-auto hidden md:block absolute top-0 right-0 "
            />
            <div className="w-full h-auto relative p-2 mt-28 md:mt-0">
              <div className="w-full xl:w-[1280px] 2xl:w-[1536px] mx-auto h-full flex flex-col-reverse gap-5 md:grid md:grid-cols-2 md:gap-0 p-2 justify-between">
                <div className="w-full h-full gap-5 flex flex-col items-center md:items-start justify-center md:justify-center">
                  <h1 className="text-4xl md:text-6xl 2xl:text-8xl bebas-neue font-semibold uppercase">
                    {language === "es" ? (
                      <>{selectedImage?.nombre.es}</>
                    ) : (
                      <>{selectedImage?.nombre.en}</>
                    )}
                  </h1>
                  <p className="text-sm 2xl:text-2xl">
                    {language === "es" ? (
                      <>{selectedImage?.descripcion.es}</>
                    ) : (
                      <>{selectedImage?.descripcion.en}</>
                    )}
                  </p>
                </div>
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="w-[300px] 2xl:w-[600px] h-full relative">
                    <img
                      src="/assets/images/danzas/info_danza_planta2.png"
                      className="h-full w-auto absolute top-0 -left-32 md:-left-24 lg:-left-32 -z-10"
                    />
                    <img
                      src={selectedImage?.image}
                      alt="Selected"
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <img
                      src="/assets/images/danzas/info_danza_planta1.png"
                      className="h-[130px] lg:h-[150px] w-auto absolute -bottom-4 -right-14  "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {selectedImage?.video && (
            <div className="max-w-[95%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto h-auto pt-5 z-50">
              <iframe
                className="w-full aspect-video self-stretch"
                src={`https://www.youtube.com/embed/${selectedImage?.video}?controls=2`}
                title={selectedImage?.descripcion.es}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
