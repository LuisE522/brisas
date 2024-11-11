'use client'

import React, { useState } from 'react'
import CreateEvento from './CreateEvento';

import { toast } from 'react-toastify';
import { API_URL } from '@/const';
import { getAuthTokenClient } from '@/lib/getUserData';
import Evento from './Evento';
import { Promociones } from './Promociones';

export interface Eventos_I {
    id?: number;
    nombre?: string,
    slug?: string,
    descripcion?: string,
    image?: string,
    fecha_creacion?: Date,
    fecha_edicion?: Date,
    precio?: number,
    bg_color?: string;
    tipo: number;
}

export interface Eventos_Promociones_I extends Eventos_I {
    paquetes: Promociones[]
}

interface Props {
    eventos: Eventos_Promociones_I[];
}

export default function Nuestros({ eventos }: Props) {
    const [open, setOpen] = useState(false);
    const token = getAuthTokenClient();

    const [listEventos, setListEventos] = useState<Eventos_Promociones_I[]>(eventos);

    const showDialog = (index: number) => {
        //setListEventos(listEventos[index]);
    };

    const onDialogClose = () => {
        //setDialogInfo(null);
    };

    const closeCreate = (newFundador: any) => {
        /* console.log(newFundador) */

        setListEventos((prevFundador) => [...prevFundador, newFundador]);
    };

    

    return (
        <>
            <div className="w-full flex flex-col gap-5">
                <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
                    <h1 className="text-sm lg:text-xl">Lista de todos los eventos</h1>
                    <CreateEvento
                        onClose={(newFundador) => closeCreate(newFundador)}
                    />
                </div>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
                    {listEventos.map((evento: Eventos_Promociones_I, index: number) => (
                        <Evento evento={evento} />
                    ))}
                </div>
            </div>
        </>
    )
}
