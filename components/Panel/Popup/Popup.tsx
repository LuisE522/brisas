"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CreatePopup from "./CreatePopup";

export interface PopUp_I {
  id?: number;
  image: string;
  link: string;
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
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { toast } from "react-toastify";

export default function Popup({ popups }: { popups: PopUp_I[] }) {
  const [listPopup, setListPopup] = useState(popups);

  const token = getAuthTokenClient();

  const showDialog = (index: number) => {
    /* setDialogInfo(listFundadores[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newPopup: any) => {
    /* console.log(newFundador) */
    setListPopup((prevPopup: any) => [...prevPopup, newPopup]);
  };

  const onDeletePopup = async (id: number | undefined) => {
    if (!id) return toast.error("Error al eliminar el popup");

    const toastDelete = toast.loading("Eliminando...");

    const response = await fetch(`${API_URL}/popup/delete/${id}`, {
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

    setListPopup((prevPopup: any) =>
      prevPopup.filter((popup: any) => popup.id !== id)
    );
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">PopUps</h1>
          <CreatePopup onClose={(newPopup) => closeCreate(newPopup)} />
        </div>
        <div className="w-full grid grid-cols-4 gap-3">
          {listPopup.map((popup: PopUp_I, index: number) => (
            <div
              className="w-full flex flex-col gap-2.5 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div
                  className={`w-full h-[200px] md:h-[250px] xl:h-[300px] ${
                    popup.image ? "" : "bg-slate-400"
                  } !relative rounded-lg overflow-hidden`}
                >
                  {popup.image && (
                    <Image
                      unoptimized
                      src={popup.image}
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
                  <CreatePopup
                    onClose={(newPopup) => closeCreate(newPopup)}
                    id_p={popup.id}
                    image_p={popup.image}
                    link_p={popup.link}
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
                        ¿Estas seguro de eliminar este Popup?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDeletePopup(popup.id)}
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
