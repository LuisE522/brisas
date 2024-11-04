'use client'

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/effect-fade';
import Image from "next/image";

export default function CaroucelPeronsajes({ images }: { images: string[] }) {
    /* console.log(images) */

    return (
        <>
            <Swiper className="mySwiper h-[45%] sm:h-[65%] md:h-[75%] xl:h-[80%] w-full" loop={true} effect={'fade'} autoplay={{ delay: 3000 }} fadeEffect={{ crossFade: true }} modules={[EffectFade, Autoplay]}>
                {images.map((image, index) => (
                    <SwiperSlide className="w-full !h-full flex items-center justify-center" key={index}>
                        <center className="w-full h-full">
                            <Image unoptimized src={image} alt="" width={0} height={0} className="w-auto h-full" />
                        </center>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
