"use client";

import React, { useState } from "react";
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
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { toast } from "react-toastify";
import Image from "next/image";
import CreatePromociones from "./CreatePromociones";

interface Props {
  promociones: Promociones_I[];
}

export interface Promociones_I {
  id: number;
  imageFondo: string;
  imagePlato: string;
  dia: string;
}

export default function Promociones({ promociones }: Props) {
  const [listPromociones, setListPromociones] = useState(promociones);

  const token = getAuthTokenClient();

  const showDialog = (index: number) => {
    /* setDialogInfo(listFundadores[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newPopup: any) => {
    /* console.log(newFundador) */
    if(newPopup.edit == true) return null;
    setListPromociones((prevPopup: any) => [...prevPopup, newPopup]);
  };

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

    setListPromociones((prevPromociones: any) =>
      prevPromociones.filter((promocion: any) => promocion.id !== id)
    );
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Promociones</h1>
          <CreatePromociones onClose={(newPopup) => closeCreate(newPopup)} />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
          {listPromociones.map((promocion: Promociones_I, index: number) => (
            <div
              className="w-full flex flex-col gap-2.5 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div
                  className={`w-full h-auto ${
                    promocion.imageFondo ? "" : "bg-slate-400"
                  } !relative rounded-lg overflow-hidden`}
                >
                  {promocion.imageFondo && (
                    <Image
                      unoptimized
                      src={promocion.imageFondo}
                      alt="alt"
                      width={300}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* <div className="absolute bottom-1 right-1 flex flex-row gap-1 z-20">
                    <span className="px-3 py-1 text-xs text-white bg-black/70 rounded-lg">

                    </span>
                  </div> */}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="w-fit px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                  <CreatePromociones
                    onClose={(newPopup) => closeCreate(newPopup)}
                    dia_p={promocion.dia}
                    imageFondo_p={promocion.imageFondo}
                    imagePlato_p={promocion.imagePlato}
                    id_p={promocion.id}
                    edit={true}
                  />
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
                        onClick={() => onDeletePopup(promocion.id)}
                      >
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
