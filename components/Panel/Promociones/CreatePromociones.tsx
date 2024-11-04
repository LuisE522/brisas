"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: (newPromocion: any) => void;
  id_p?: number;
  imageFondo_p?: string;
  imagePlato_p?: string;
  dia_p?: string;
  edit?: boolean;
}

export default function CreatePromociones({
  onClose,
  id_p = 0,
  imageFondo_p = "",
  imagePlato_p = "",
  dia_p = "",
  edit = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [id, setId] = useState(id_p);
  const [imageFondo, setImageFondo] = useState(imageFondo_p);
  const [imagePlato, setImagePlato] = useState(imagePlato_p);
  const [fileImagePlato, setFileImagePlato] = useState<any>();
  const [fileImageFondo, setFileImageFondo] = useState<any>();
  const [dia, setDia] = useState<string>(dia_p);

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      imageFondo,
      imagePlato,
      dia,
    };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/promociones/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/promociones/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    }
    const data = await response.json();

    if (!response.ok) {
      toast.update(createFundadoresToast, {
        render: data.message,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return null;
    }

    toast.update(createFundadoresToast, {
      render: data.message,
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });

    const asdas = {
      id: data.id,
      imageFondo,
      imagePlato,
      dia,
      edit: edit,
    };

    setId(0);
    setImageFondo("");
    setImagePlato("");
    setDia("");

    /* console.log(data) */
    onClose(asdas);
    closeDialog(false);
  };

  const uploadGroup = async () => {
    const imgFondo = await uploadFile(fileImageFondo, "/promociones", "fondo");

    if (imgFondo == "") return null;
    setImageFondo(imgFondo);

    const imgPlato = await uploadFile(fileImagePlato, "/promociones", "plato");
    if (imgPlato == "") return null;
    setImagePlato(imgPlato);
  };

  const uploadFile = async (file: any, ruta: string, nombre: string) => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      formData.append("ruta", ruta);
    } else {
      toast.error("Debe seleccionar una imagen");
      return "";
    }

    const uploadImageToast = toast.loading(`Subiendo imagen de ${nombre}...`);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      toast.update(uploadImageToast, {
        render: `Imagen de ${nombre} subida`,
        isLoading: false,
        type: "success",
        autoClose: 2000,
      });

      return result.fileUrl;
    } else {
      toast.update(uploadImageToast, {
        render: `Error al subir la imagen de ${nombre}`,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });

      return "";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
        <DialogTrigger className={`flex flex-row gap-1 items-center text-sm`}>
          {edit == false ? (
            <>
              <FaCirclePlus /> Registrar presidente
            </>
          ) : (
            <>
              <MdEdit /> Editar
            </>
          )}
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>{text} Presidente</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="dia">Día</Label>
                <Input
                  type="text"
                  id="dia"
                  value={dia}
                  onChange={(e: any) => setDia(e.target.value)}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="imagePresidente">Imagen Presidente</Label>
                  <Input
                    type="file"
                    id="imagePresidente"
                    accept="image/*"
                    onChange={(e) =>
                      setFileImageFondo(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="imageJunta">Imagen Junta directiva</Label>
                  <Input
                    type="file"
                    id="imageJunta"
                    accept="image/*"
                    onChange={(e) =>
                      setFileImagePlato(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-row gap-3 justify-end">
                <Button onClick={onSubmit}>{text}</Button>
                <Button onClick={uploadGroup}>Subir imagen</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
