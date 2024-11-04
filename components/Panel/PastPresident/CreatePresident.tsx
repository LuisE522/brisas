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
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface Props {
  onClose: (newFundador: any) => void;
  id_p?: number;
  nombre_p?: string;
  fecha_p?: string;
  descripcion_p?: any;
  imagePresident_p?: string;
  imageJunta_p?: string;
  edit?: boolean;
}

export default function CreatePresident({
  onClose,
  id_p = 0,
  nombre_p = "",
  fecha_p = "",
  descripcion_p = "",
  imagePresident_p = "",
  imageJunta_p = "",
  edit = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [id, setId] = useState(id_p);
  const [nombre, setNombre] = useState(nombre_p);
  const [fecha, setFecha] = useState(fecha_p);
  const [imagePresident, setImagePresident] =
    useState<string>(imagePresident_p);
  const [imageJunta, setImageJunta] = useState<string>(imageJunta_p);
  const [fileImagePresident, setFileImagePresident] = useState<any>("");
  const [fileImageJunta, setFileImageJunta] = useState<any>("");

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      nombre,
      fecha,
      imagePresident,
      imageJunta,
    };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/presidentes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/presidentes/update/${id}`, {
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
      nombre,
      fecha,
      imagePresident,
      imageJunta,
      edit: edit,
    };

    setId(0);
    setNombre("");
    setFecha("");
    setImagePresident("");
    setImageJunta("");

    /* console.log(data) */
    onClose(asdas);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImagePresident) {
      formData.append("image", fileImagePresident);
      formData.append("ruta", `/president`);
      if (edit) formData.append("update", imagePresident);
    } else {
      toast.error("Debe seleccionar una imagen en presidente");
      return null;
    }

    const uploadImageToast = toast.loading("Subiendo imagen...");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setImagePresident(result.fileUrl);
      toast.update(uploadImageToast, {
        render: "Imagen subida",
        isLoading: false,
        type: "success",
        autoClose: 2000,
      });

      const formDataJunta = new FormData();
      if (fileImageJunta) {
        formDataJunta.append("image", fileImageJunta);
        formDataJunta.append("ruta", `/president`);
        formData.append("update", imagePresident);
      } else {
        toast.error("Debe seleccionar una imagen en junta");
        return null;
      }
      const uploadImageToastJunta = toast.loading(
        "Subiendo imagen de la junta..."
      );

      const responseJunta = await fetch("/api/upload", {
        method: "POST",
        body: formDataJunta,
      });

      const resultJunta = await responseJunta.json();
      if (responseJunta.ok) {
        setImageJunta(resultJunta.fileUrl);
        toast.update(uploadImageToastJunta, {
          render: "Imagen de la junta subida",
          isLoading: false,
          type: "success",
          autoClose: 2000,
        });
      } else {
        toast.update(uploadImageToastJunta, {
          render: "Error al subir la imagen de la junta",
          isLoading: false,
          type: "error",
          autoClose: 2000,
        });
        return null;
      }
    } else {
      console.log("Error");
      console.log(result);
      setImagePresident("");

      toast.update(uploadImageToast, {
        render: "Error al subir la imagen",
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
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
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e: any) => setNombre(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    type="text"
                    id="fecha"
                    value={fecha}
                    onChange={(e: any) => setFecha(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="imagePresidente">Imagen Presidente</Label>
                  <Input
                    type="file"
                    id="imagePresidente"
                    accept="image/*"
                    onChange={(e) =>
                      setFileImagePresident(
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
                      setFileImageJunta(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-row gap-3 justify-end">
                <Button onClick={onSubmit}>{text}</Button>
                <Button onClick={uploadFile}>Subir imagen</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
