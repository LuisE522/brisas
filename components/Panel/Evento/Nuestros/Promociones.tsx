'use client'
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getAuthTokenClient } from '@/lib/getUserData';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoIosCloseCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/const';
import { Eventos_Promociones_I } from './Nuestros';
import Image from 'next/image';

interface Props {
    eventoId: number;
    edit?: boolean,
    listPromociones: Promociones[]
}

export interface Promociones {
    id: number,
    eventoId: number;
    nombre: string;
    image: string;
    precio: {
        vip: number
        general: number
    },
    descripcion: string;
}

export default function Promociones({ edit, eventoId, listPromociones }: Props) {
    const [open, setOpen] = useState(false);
    const token = getAuthTokenClient();

    const closeDialog = (open: boolean) => {
        setOpen(open);
    };

    const [openDialog, setOpenDialog] = useState(false)
    const [isCreated, setIsCreated] = useState(false)
    const [image, setImage] = useState<string>('')
    const [nombre, setNombre] = useState<string>('')
    const [descripcion, setDescripcion] = useState<string>('')
    const [precio, setPrecio] = useState({ general: 0, vip: 0 })
    const [fileImage, setFileImage] = useState<any>("");

    const [promociones, setPromociones] = useState<Promociones[]>(listPromociones)

    const uploadFile = async () => {
        const formData = new FormData();
        if (fileImage) {
            formData.append("image", fileImage);
            formData.append("ruta", `/eventos/paquetes`);
            if (edit) formData.append("update", image);
        } else {
            toast.error("Debe seleccionar una imagen");
            return null;
        }

        const uploadImageToast = toast.loading("Subiendo imagen...");

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (response.ok) {
            setImage(result.fileUrl);
            toast.update(uploadImageToast, {
                render: "Imagen subida",
                isLoading: false,
                type: "success",
                autoClose: 2000,
            });
        } else {
            console.log("Error");
            console.log(result);
            setImage("");

            toast.update(uploadImageToast, {
                render: "Error al subir la imagen",
                isLoading: false,
                type: "error",
                autoClose: 2000,
            });
        }
    };

    const onSubmit = async () => {
        const dataJson = {
            nombre,
            image,
            precio,
            descripcion,
            eventoId
        }

        const createPaqueteToast = toast.loading('Agregando paquete...');

        const response = await fetch(`${API_URL}/paquetes/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(dataJson),
        });

        const data = await response.json()

        if (!response.ok) {
            toast.update(createPaqueteToast, {
                render: "Error al agregar el paquete...",
                isLoading: false,
                type: "error",
                autoClose: 2000,
            });
            return;
        }

        toast.update(createPaqueteToast, {
            render: "Paquete agregado con éxito",
            isLoading: false,
            type: "success",
            autoClose: 2000,
        });

    }

    return (
        <>

            <div className='flex flex-row gap-1 justify-center items-center' onClick={() => setOpenDialog(true)}><FaCirclePlus /> Promo.</div>

            {openDialog && (
                <>
                    <div className="w-full h-screen fixed top-0 left-0 bg-black/80 flex justify-center items-center z-50" >
                        <div className='w-full h-screen absolute top-0 left-0' onClick={() => setOpenDialog(true)}></div>
                        <div className='overflow-y-auto max-w-[95%] w-[600px] 2xl:w-[900px] max-h-[95%] h-[500px] 2xl:h-[600px] bg-[#121212] rounded-lg relative'>
                            <div className='absolute top-2 right-2 cursor-pointer text-2xl' onClick={() => setOpenDialog(false)}>
                                <IoIosCloseCircle color='white' />
                            </div>
                            <div className='w-full h-full flex flex-col gap-3 items-center py-10'>
                                <div className='w-[95%] mx-auto flex justify-between items-center'>
                                    <h1 className='text-2xl font-semibold text-white uppercase'>Promociones</h1>
                                    <div className='flex flex-row gap-1 justify-center items-center w-fit px-3 py-1 text-xs text-white bg-black/70 rounded-lg select-none' onClick={() => setIsCreated(!isCreated)}><FaCirclePlus /> Agegar</div>
                                </div>
                                <div className="w-[90%] relative py-10">
                                    {isCreated ? (
                                        <>
                                            <div className='w-full flex flex-col gap-5'>
                                                <div className='w-full grid grid-cols-2 gap-3'>
                                                    <div className='w-full flex flex-col gap-2'>
                                                        <Label>Nombre</Label>
                                                        <Input type='text' value={nombre} onChange={(e) => {
                                                            setNombre(e.target.value)
                                                        }} />
                                                    </div>
                                                    <div className='w-full flex flex-col gap-2'>
                                                        <Label htmlFor='general'>Precio general</Label>
                                                        <Input id='general' type='number' value={precio.general} onChange={(e) => {
                                                            setPrecio({ ...precio, general: Number(e.target.value) })
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className='w-full grid grid-cols-2 gap-3'>
                                                    <div className='w-full flex flex-col gap-2'>
                                                        <Label htmlFor='vip'>Precio VIP</Label>
                                                        <Input id='vip' type='number' value={precio.vip} onChange={(e) => {
                                                            setPrecio({ ...precio, vip: Number(e.target.value) })
                                                        }} />
                                                    </div>

                                                    <div className="grid w-full items-center gap-1.5">
                                                        <Label htmlFor="image">Imagen</Label>
                                                        <Input
                                                            type="file"
                                                            id="image"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                setFileImage(e.target.files ? e.target.files[0] : null)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='w-full gap-3'>
                                                    <div className='w-full flex flex-col gap-2'>
                                                        <Label>Descripción</Label>
                                                        <Textarea rows={3} value={descripcion} onChange={(e) => {
                                                            setDescripcion(e.target.value)
                                                        }} />
                                                    </div>
                                                </div>

                                                <div className="w-full flex flex-row gap-3 justify-end">
                                                    <Button onClick={onSubmit}>Crear</Button>
                                                    <Button onClick={uploadFile}>Subir imagen</Button>
                                                </div>

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='w-full grid grid-cols-1 gap-5'>
                                                {promociones.map((promocion: Promociones, index: number) => (
                                                    <div className='w-full grid grid-cols-[30%_auto] md:grid-cols-2 gap-3'>
                                                        <Image unoptimized src={promocion.image} width={0} height={0} alt='' className='w-full h-auto object-cover rounded-lg ' />
                                                        <div className='w-full h-full py-4'>
                                                            <h1>{promocion.nombre}</h1>
                                                            <div>Precio general: ${promocion.precio.general}</div>
                                                            <div>Precio VIP: ${promocion.precio.vip}</div>
                                                            <p className='text-xs'>Descripción: {promocion.descripcion}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
