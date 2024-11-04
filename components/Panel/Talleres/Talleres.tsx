"use client";

import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  talleres: Talleres_I[];
}

export interface Talleres_I {
  id?: number;
  image: string;
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
import Image from "next/image";
import CreateTalleres from "./CreateTalleres";

export default function Talleres({ talleres }: Props) {
  const [listTalleres, setListTalleres] = useState(talleres);

  console.log(talleres);

  const token = getAuthTokenClient();

  const showDialog = (index: number) => {
    /* setDialogInfo(listCategorias[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newCategoria: any) => {
    /* console.log(newFundador) */
    if (newCategoria.edit == false) {
      setListTalleres((prevCategoria: any) => [...prevCategoria, newCategoria]);
    }
  };

  const onDeletePopup = async (id: number | undefined) => {
    if (!id) return toast.error("Error al eliminar el popup");

    const toastDelete = toast.loading("Eliminando...");

    const response = await fetch(`${API_URL}/talleres/delete/${id}`, {
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
        render: "Error al eliminar el popup",
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    toast.update(toastDelete, {
      render: "Popup eliminado con éxito",
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });

    setListTalleres((prevPopup: any) =>
      prevPopup.filter((popup: any) => popup.id !== id)
    );
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Galeria de talleres</h1>
          <CreateTalleres onClose={(newFundador) => closeCreate(newFundador)} />
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
          {listTalleres.map((taller: Talleres_I, index: number) => (
            <div
              className="w-full flex flex-col gap-2.5 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div
                  className={`w-full h-[200px] md:h-[250px] xl:h-[300px] ${
                    taller.image ? "" : "bg-slate-400"
                  } !relative rounded-lg overflow-hidden`}
                >
                  {taller.image && (
                    <Image
                      /* unoptimized */
                      src={taller.image}
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
                  <CreateTalleres
                    onClose={(newPopup) => closeCreate(newPopup)}
                    id_p={taller.id}
                    image_p={taller.image}
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
                        ¿Estas seguro de eliminar este taller?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeletePopup(taller.id)}
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
