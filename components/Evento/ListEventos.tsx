'use client'

import React, { useEffect, useState } from 'react'
import { Eventos_I, Eventos_Promociones_I } from '../Panel/Evento/Nuestros/Nuestros'
import Image from 'next/image'
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosCloseCircle } from 'react-icons/io';
import PromocionesEventos from './Promociones';
import Evento from './Evento';
import { PiBroomBold } from "react-icons/pi";
import Link from 'next/link';
import trs from "@/public/locales/translate.json";
import { useLanguage } from '@/context/LanguageProvider';

interface Props {
    eventos: {
        nuestros: Eventos_Promociones_I[];
        externos: Eventos_Promociones_I[];
    }
}

export interface allEvents {
    nuestros: Eventos_Promociones_I[];
    externos: Eventos_Promociones_I[];
}

export default function ListEventos({ eventos }: Props) {

    const router = useRouter();
    const { language } = useLanguage();
    const translations = trs as any;

    const [eventosNuestros, setEventosNuestros] = useState<Eventos_Promociones_I[]>(eventos.nuestros);
    const [eventosExternos, setEventosExternos] = useState<Eventos_Promociones_I[]>(eventos.externos);

    console.log(eventos)

    const searchParams = useSearchParams();
    const [type, setType] = useState<null | string>(searchParams.get("type"))

    const [openDialog, setOpenDialog] = useState(false)

    const onClicComprar = (evento: Eventos_I) => {
        if (evento.nombre?.toLowerCase().includes('almuerzo')) setOpenDialog(true)
    }

    useEffect(() => {
        document.body.style.overflow = openDialog ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto"; // Restaurar al desmontar el componente
        };
    }, [openDialog]);

    const cleanType = () => {
        setType(null)
        router.push('/eventos')
    }

    return (
        <>
            <div className='max-w-[95%] w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto flex flex-col gap-10 mt-[70px] md:mt-[130px]'>
                <div className='w-full flex flex-col gap-3'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-4xl font-bold'>{translations[language].nuestros_eventos}</h1>
                        {type && (
                            <div className='flex items-center gap-1 text-sm cursor-pointer' onClick={cleanType} ><PiBroomBold />Limpiar</div>
                        )}
                    </div>
                    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {eventosNuestros.map((evento: Eventos_Promociones_I, index: number) => (
                            <Evento evento={evento} type={type} />
                        ))}
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <div className='w-full flex justify-between items-center'>
                    <h1 className='text-4xl font-bold'>{translations[language].footer_eventos_externos}</h1>
                        {type && (
                            <div className='flex items-center gap-1 text-sm cursor-pointer' onClick={cleanType} ><PiBroomBold />Limpiar</div>
                        )}
                    </div>
                    <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {eventosExternos.map((evento: Eventos_Promociones_I, index: number) => (
                            <Evento evento={evento} type={type} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
