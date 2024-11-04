import Image from "next/image";
import React, { useState } from "react";
import { PastPresident_I } from "./PastPresident";
import CreatePresident from "./CreatePresident";
import { toast } from "react-toastify";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";

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

interface Props {
  presidente: PastPresident_I;
  onDelete: (id: number) => void;
}

export default function President({ presidente, onDelete }: Props) {
  const [showImage, setShowImage] = useState(false);

  const token = getAuthTokenClient();

  const showDialog = () => {
    /* setDialogInfo(listFundadores[index]); */
  };

  const closeCreate = (x: any) => {};
  
  const onDeletePopup = async () => {
    console.log(presidente.id);

    const toastDelete = toast.loading("Eliminando...");

    const response = await fetch(
      `${API_URL}/presidentes/delete/${presidente.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }
    );

    const res = await response.json();

    if (!response.ok) {
      toast.update(toastDelete, {
        render: "Error al eliminar al presidente",
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return;
    }

    toast.update(toastDelete, {
      render: "Presidente eliminado con éxito",
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });

    onDelete(presidente.id);
  };

  return (
    <>
      <div
        className="w-full flex flex-col gap-2.5 cursor-pointer"
        onClick={() => showDialog()}
      >
        <div className="w-full flex justify-end">
          <div
            onClick={() => setShowImage(true)}
            className={`w-full h-[200px] md:h-[250px] xl:h-[300px] ${
              presidente.imagePresident ? "" : "bg-slate-400"
            } !relative rounded-lg overflow-hidden`}
          >
            {presidente.imagePresident && (
              <Image
                unoptimized
                src={presidente.imagePresident}
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
            <CreatePresident
              onClose={(newPopup) => closeCreate(newPopup)}
              id_p={presidente.id}
              imagePresident_p={presidente.imagePresident}
              imageJunta_p={presidente.imageJunta}
              nombre_p={presidente.nombre}
              fecha_p={presidente.fecha}
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
                <AlertDialogAction onClick={onDeletePopup}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {showImage && (
        <div
          className="w-full h-screen fixed bg-black/50 top-0 left-0 z-50 flex justify-center items-center"
          onClick={() => setShowImage(false)}
        >
          <Image
            unoptimized
            src={presidente.imageJunta}
            alt="alt"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
        </div>
      )}
    </>
  );
}
