'use client'

import React, { useState } from 'react'
import { Eventos_Promociones_I } from '../Panel/Evento/Nuestros/Nuestros'
import Image from 'next/image'
import { FaCalendarAlt } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'
import PromocionesEventos from './Promociones'
import Link from 'next/link'


interface Props {
    evento: Eventos_Promociones_I,
    type: string | null,
}

export default function Evento({ evento, type }: Props) {

    const [openDialog, setOpenDialog] = useState(false)

    const getMesAnio = (date: string | undefined) => {

        if (!date) return null;

        const fecha = new Date(date);

        // Obtener el año y el mes (los meses en JavaScript son 0-indexados)
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Se suma 1 porque los meses son 0-indexados

        // Concatenar año y mes en el formato 'YYYY-MM'
        const anioMes = `${mes}-${anio}`;

        return anioMes
    }

    return (
        <>
            <div className='flex flex-col rounded-lg overflow-hidden relative' style={{ boxShadow: "0px 8px 19px 4px rgba(51,51,51,0.3)" }}>
                {type != null && (
                    <>
                        {!evento.nombre?.toLowerCase().includes(type) && (
                            <div className='w-full h-full bg-black/60 absolute top-0'></div>
                        )}
                    </>
                )}
                <div className='w-full h-44'>
                    <Image
                        unoptimized
                        src={evento.image ? evento.image : ''}
                        alt="alt"
                        width={300}
                        height={250}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className='w-full h-32 md:h-36 p-4 flex flex-col gap-3'>
                    <h1 className='uppercase font-semibold h-[35px] md:h-[45px] text-sm md:text-base'>{evento.nombre}</h1>
                    <div className='w-full flex gap-2 items-center text-xs md:text-sm'>
                        <FaCalendarAlt />{getMesAnio(evento.fecha_creacion?.toString())}
                    </div>
                    <div className="w-full flex justify-between items-center text-xs md:text-sm">
                        <p>Desde <span className='font-bold'>s/ {evento.precio}</span></p>
                        {evento.paquetes.length > 0 ? (
                            <div className='w-fit bg-black px-3 py-1 text-white rounded-lg cursor-pointer' onClick={() => setOpenDialog(true)} >Comprar</div>
                        ) : (
                            <Link href={evento.descripcion ? evento.descripcion : ''} target="_blank" className='w-fit bg-black px-3 py-1 text-white rounded-lg cursor-pointer'>Comprar</Link>
                        )}
                    </div>
                </div>
            </div>

            {openDialog && (
                <>
                    <div className="w-full h-screen fixed top-0 left-0 bg-black/80 flex justify-center items-center z-50">
                        <div className="w-full h-full absolute top-0 left-0" onClick={() => setOpenDialog(false)}></div>
                        <div className='overflow-y-auto max-w-[95%] w-[600px] 2xl:w-[900px] max-h-[95%] h-[400px] lg:h-[500px] 2xl:h-[600px] bg-[#121212] rounded-lg relative'>
                            <div className='absolute z-10 top-2 right-2 cursor-pointer text-2xl' onClick={() => setOpenDialog(false)}>
                                <IoIosCloseCircle color='white' />
                            </div>
                            <div className='w-full h-full flex flex-col gap-3 justify-center items-center relative'>
                                <PromocionesEventos promociones={evento.paquetes} enlace={evento.descripcion ? evento.descripcion : ''} />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
