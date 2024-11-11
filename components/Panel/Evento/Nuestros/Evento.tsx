'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { toast } from 'react-toastify';
import { getAuthTokenClient } from '@/lib/getUserData';
import { API_URL } from '@/const';
import { Eventos_I, Eventos_Promociones_I } from './Nuestros';
import CreatePromociones from '../../Promociones/CreatePromociones';
import CreateEvento from './CreateEvento';
import Promociones from './Promociones';

interface Props {
    evento: Eventos_Promociones_I
}

export default function Evento({ evento }: Props) {
    const token = getAuthTokenClient();

    const onDeletePopup = async (id: number | undefined) => {
        if (!id) return toast.error("Error al eliminar la promocion");

        const toastDelete = toast.loading("Eliminando...");

        const response = await fetch(`${API_URL}/promociones/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-cache",
        });

        const res = await response.json();

        if (!response.ok) {
            toast.update(toastDelete, {
                render: "Error al eliminar el promocion",
                isLoading: false,
                type: "error",
                autoClose: 2000,
            });
            return;
        }

        toast.update(toastDelete, {
            render: "Promocion eliminado con éxito",
            isLoading: false,
            type: "success",
            autoClose: 2000,
        });

        /* setListEventos((prevPromociones: any) =>
            prevPromociones.filter((promocion: any) => promocion.id !== id)
        ); */
    };
    const closeCreate = (newFundador: any) => {
        /* console.log(newFundador) */

        /* setListEventos((prevFundador) => [...prevFundador, newFundador]); */
    };

    console.log(evento)

    return (
        <>
            <div
                className="w-full flex flex-col gap-2.5 cursor-pointer"
            >
                <div className="w-full flex justify-end">
                    <div
                        className={`w-full h-auto ${evento.image ? "" : "bg-slate-400"
                            } !relative rounded-lg overflow-hidden`}
                    >
                        {evento.image && (
                            <Image
                                unoptimized
                                src={evento.image}
                                alt="alt"
                                width={300}
                                height={250}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* <div className="absolute bottom-1 right-1 flex flex-row gap-1 z-20">
                            <span className="px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                                asdas
                            </span>
                        </div> */}
                    </div>
                </div>

                <div className="w-full flex justify-between">
                    <div className="w-fit px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                        <CreateEvento
                            onClose={(newPopup) => closeCreate(newPopup)}

                            id_p={evento.id}
                            nombre_p={evento.nombre}

                            descripcion_p={evento.descripcion}
                            image_p={evento.image}
                            precio_p={evento.precio}
                            slug_p={evento.slug}
                            fecha_creacion_p={evento.fecha_creacion}
                            edit={true}
                            type_p={evento.tipo}
                        />
                    </div>
                    <div className="w-fit px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                        {evento.id && (
                            <Promociones eventoId={evento.id} listPromociones={evento.paquetes} />
                        )}
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger className="w-fit px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                            Eliminar
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Estas seguro de eliminar este promocion?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDeletePopup(evento.id)}
                                >
                                    Continuar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </>
    )
}
