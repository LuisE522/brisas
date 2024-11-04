"use client";

import { Comida_I } from "@/app/(panel)/admin/platos/page";
import Image from "next/image";
import React from "react";
import CreatePlatos from "./Platos/CreatePlatos";

interface Props {
  comida: Comida_I;
  categoria_id?: number;
}

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
import { toast } from "react-toastify";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { MdDeleteForever } from "react-icons/md";

export default function Comida({ comida, categoria_id }: Props) {
  const token = getAuthTokenClient();

  const showDialog = (index: number) => {
    /* setDialogInfo(listCategorias[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newCategoria: any) => {
    /* console.log(newFundador) */
    /* if (newCategoria.edit == false) {
      setListCategorias((prevCategoria: any) => [
        ...prevCategoria,
        newCategoria,
      ]);
    } */
  };

  const onDeletePopup = async (id: number) => {
    if (!id) return toast.error("Error al eliminar el popup");

    const toastDelete = toast.loading("Eliminando...");

    const response = await fetch(`${API_URL}/comidas/delete/${id}`, {
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
        render: "Error al eliminar el plato",
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    toast.update(toastDelete, {
      render: "Plato eliminado con éxito",
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });
  };

  return (
    <>
      <div
        className="w-full relative h-auto overflow-hidden rounded-lg"
        style={{ boxShadow: "0px 8px 19px 4px rgba(51,51,51,0.3)" }}
      >
        <div className="w-full h-44 lg:h-52 2xl:h-96 relative overflow-hidden">
          <Image
            unoptimized
            src={`${
              comida.image
                ? comida.image
                : "http://localhost:3000/assets/images/logo_brisas.jpg"
            }`}
            alt="alt"
            width={0}
            height={0}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-3 w-full flex justify-between gap-3">
          <h1 className="font-bold text-base 2xl:text-2xl">{comida.nombre}</h1>
          <div>
            <button className="bg-slate-600/90 text-white px-3 py-1 rounded-lg text-sm">
              <CreatePlatos
                onClose={(newPlato) => closeCreate(newPlato)}
                categoriaId_p={categoria_id}
                edit={true}
                id_p={comida.id}
                nombre_p={comida.nombre}
                descripcion_p={comida.descripcion}
                image_p={comida.image}
                precio_p={comida.precio}
              />
            </button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger className="bg-red-600 h-fit text-white px-3 py-1 rounded-lg text-s">
              <MdDeleteForever />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estas seguro de eliminar este taller?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeletePopup(comida.id)}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
