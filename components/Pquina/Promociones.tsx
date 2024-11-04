import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { API_URL } from "@/const";
import { Promociones_I } from "../Panel/Promociones/Promociones";

export default function Promociones() {
  const [indexAnimation, setIndexAnimation] = useState(0);

  const [promociones, setPromociones] = useState<Promociones_I[]>();

  const promos = [
    {
      img: "/assets/images/pquina/promos/1.png",
      plato: "/assets/images/pquina/promos/plato_1_2.png",
    },
    {
      img: "/assets/images/pquina/promos/2.png",
      plato: "/assets/images/pquina/promos/plato_2_2.png",
    },
  ];

  const onSlideChange = (x: any) => {
    // console.log("slider moved");
    /* console.log(x.realIndex); */
    setIndexAnimation(x.realIndex);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${API_URL}/promociones/list`, {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      setPromociones(data);
    };

    getData();
  }, []);

  return (
    <>
      {promociones && (
        <div className="w-full h-auto lg:h-screen relative bg-emerald-950">
          <Swiper
            className="mySwiper w-full h-auto lg:h-full"
            loop={true}
            effect={"fade"}
            autoplay={{ delay: 2000, disableOnInteraction: false }} // Asegúrate de que disableOnInteraction sea false
            modules={[EffectFade, Autoplay]}
            onActiveIndexChange={(x) => onSlideChange(x)}
          >
            {promociones.map((promo, index) => (
              <SwiperSlide className="w-full h-auto lg:h-full" key={index}>
                <Image
                  unoptimized
                  src={promo.imageFondo}
                  alt="alt"
                  width={0}
                  height={0}
                  className="w-full h-auto lg:h-full "
                />
                <Image
                  unoptimized
                  src={promo.imagePlato}
                  alt="alt"
                  width={0}
                  height={0}
                  className={`w-auto h-full absolute transition-all ease-in-ou duration-300 ${
                    index == indexAnimation
                      ? "top-0 right-0"
                      : index % 2 == 0
                      ? "top-[100%] -right-[50%]"
                      : "top-[-100%] -right-[50%]"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
