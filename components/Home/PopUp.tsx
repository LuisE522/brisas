"use client";

import { API_URL } from "@/const";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { Autoplay, EffectFade, EffectCube } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { PopUp_I } from "../Panel/Popup/Popup";

import 'swiper/css/effect-cube';

// Variable global para controlar la visibilidad del modal
let hasShownModal = false;

export default function PopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const [listPopUp, setListPopUp] = useState<PopUp_I[] | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    hasShownModal = true; // Marcar como mostrado
  };

  useEffect(() => {
    const fetchPopUp = async () => {
      const res = await fetch(`${API_URL}/popup/list`, {
        method: "GET",
        cache: "no-cache",
      });

      const data = await res.json();

      if (data.length > 0) {
        setListPopUp(data);
        // Abrir el modal solo si no se ha mostrado antes
        if (!hasShownModal) {
          setIsOpen(true);
        }

        // Controlar el overflow del body
        document.body.style.overflow = isOpen ? "hidden" : "auto";
      } else {
        setIsOpen(false);
      }
    };

    fetchPopUp();

    return () => {
      document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && listPopUp != null ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* <Swiper
              className="mySwiper "
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[Autoplay]}
              slidesPerView={1}
            >
              {listPopUp.map((Popup: PopUp_I, index) => (
                <SwiperSlide className="w-full" key={index}>
                  <div className="w-[95%] max-w-[500px] 2xl:max-w-[800px] h-auto relative mx-auto">
                    <Image
                      unoptimized
                      src={Popup.image}
                      alt="popup"
                      width={0}
                      height={0}
                      className="w-full h-auto "
                    />
                    <FaCircleXmark
                      onClick={closeModal}
                      className="mt-4 text-white rounded absolute top-px right-4 cursor-pointer text-xl 2xl:text-4xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}

            <div className="w-[90%] max-w-[500px] 2xl:max-w-[800px] h-auto relative">
              <Swiper
                loop={true}
                effect={'cube'}
                grabCursor={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                pagination={true}
                modules={[EffectCube]}
                className="mySwiper"
              >
                {listPopUp.map((Popup: PopUp_I, index) => (
                  <SwiperSlide className="w-full" key={index}>
                    <div className="relative mx-auto">
                      <Image
                        unoptimized
                        src={Popup.image}
                        alt="popup"
                        width={0}
                        height={0}
                        className="w-full h-auto "
                      />
                      <FaCircleXmark
                        onClick={closeModal}
                        className="mt-4 text-white rounded absolute top-px right-4 cursor-pointer text-xl 2xl:text-4xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
