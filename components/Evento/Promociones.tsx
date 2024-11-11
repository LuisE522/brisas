import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaWhatsapp } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Promociones } from '../Panel/Evento/Nuestros/Promociones';
import Image from 'next/image';

interface Props {
    promociones: Promociones[],
    enlace: string;
}

export default function PromocionesEventos({ promociones, enlace }: Props) {

    const onSendWhatsapp = (index: number) => {

        //https://api.whatsapp.com/send/?phone=51993234743&text=asdsadsa&type=phone_number&app_absent=0
        /* * Evento:* Almuerzo Show
        * Promoción:* Piqueo Típico
        * Precio:* Vip s /. 95 - General s /. 90
        * Descripción:* asdasdasdasdas */
        const url = "https://api.whatsapp.com/send/?phone=51948487140&text=*Quiero saber sobre los paquetes promocionales que incluye el ingreso al espectáculo de Almuerzo show.*";

        /* const texto = `%0a%0a*Promoción:* ${promociones[index].nombre}%0a*Descripción:* ${promociones[index].descripcion}`; */
        window.open(url, '_blank');
    }

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}

                effect={'fade'} autoplay={{ delay: 3000, pauseOnMouseEnter: true }} fadeEffect={{ crossFade: true }} modules={[EffectFade, Autoplay, Pagination]}
                className="mySwiper w-full h-full relative"
                loop={true}
            >
                {promociones.map((promocion: Promociones, index: number) => (
                    <SwiperSlide className='rounded-lg w-full h-full'>
                        <Image src={promocion.image} width={0} height={0} alt='' unoptimized className='w-full h-full' />
                        <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center'>
                            <Image unoptimized src="/assets/images/paquetes/fondo_degradado.png" alt="alt" width={0} height={0} className='w-full h-full absolute top-0 left-0' />
                            <div className='max-w-[90%] w-full max-h-[90%] h-full grid grid-rows-[20%_77%] gap-1 lg:gap-3 z-10'>
                                <div className=''>
                                    <Image unoptimized src="/assets/images/paquetes/titulo.png" alt="alt" width={0} height={0} className='w-auto h-auto' />
                                </div>
                                <div className='w-full grid grid-cols-2 gap-1 lg:gap-3'>
                                    <div className='w-full h-full flex flex-col gap-3 justify-end'>
                                        <div className='w-full flex flex-col gap-1 text-white'>
                                            <h1 className='text-lg md:text-xl 2xl:text-4xl font-bold uppercase'>{promocion.nombre}</h1>
                                            <p className='text-[10px] md:text-xs 2xl:text-lg'>{promocion.descripcion}</p>
                                        </div>
                                        <div className='w-full flex justify-center gap-3'>
                                            <div className='w-fit flex flex-col justify-center items-center px-4 lg:px-8 py-1 bg-[#FF9000] rounded-full uppercase text-[10px] lg:text-xs text-white font-bold'>
                                                <span>VIP</span>
                                                <span>s/. <b>{promocion.precio.vip}</b></span>
                                            </div>
                                            <div className='w-fit flex flex-col justify-center items-center px-4 lg:px-8 py-1 bg-[#1FA2C4] rounded-full uppercase text-[10px] lg:text-xs text-white font-bold'>
                                                <span>General</span>
                                                <span>s/. <b>{promocion.precio.general}</b></span>
                                            </div>
                                        </div>
                                        <div className='w-full rounded-xl flex gap-1 cursor-pointer p-2 lg:p-3 text-white justify-center items-center bg-[#41E960]' onClick={() => onSendWhatsapp(index)}>
                                            <FaWhatsapp className='text-lg lg:text-3xl' /> <span className='text-sm lg:text-2xl uppercase font-bold'>Contactanos</span>
                                        </div>
                                    </div>
                                    <div className='w-full h-full flex flex-col gap-3 justify-end items-end'>
                                        <Image unoptimized src="/assets/images/logo_almuerzo_show.png" alt="alt" width={0} height={0} className='w-[100px] lg:w-[150px] h-auto' />
                                        <a target='_blank' href={enlace} className='text-sm lg:text-base w-[100px] lg:w-[150px] bg-white text-black p-2 lg:p-3 flex justify-center items-center font-bold rounded-xl uppercase'>
                                            Reservar
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
