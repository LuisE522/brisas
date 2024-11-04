"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUser } from "@/context/SessionProvider";
import React, { useState } from "react";
import { getAuthTokenClient } from "@/lib/getUserData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { API_URL } from "@/const";
import { MdEdit } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { FaCirclePlus } from "react-icons/fa6";

interface Props {
  onClose: (newPlato: any) => void;
  id_p?: number;
  nombre_p?: string;
  descripcion_p?: {
    es: string;
    en: string;
  };
  precio_p?: number;
  categoriaId_p?: number;
  image_p?: string;
  edit?: boolean;
}

export default function CreatePlatos({
  onClose,
  id_p = 0,
  nombre_p = "",
  descripcion_p = { es: "", en: "" },
  precio_p = 0,
  categoriaId_p = 0,
  image_p = "",
  edit = false,
}: Props) {
  const { userData: data, updateUserData } = useUser();

  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [nombre, setNombre] = useState(nombre_p);
  const [descripcion, setDescripcion] = useState(descripcion_p);
  const [precio, setPrecio] = useState(precio_p);
  const [categoriaId, setCategoriaId] = useState(categoriaId_p);
  const [image, setImage] = useState(image_p);
  const [fileImage, setFileImage] = useState<any>();
  const [id, setId] = useState(id_p);

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    if (!data) return toast.error("No hay usuario logueado");

    const dataJson = {
      idUser: data.data.id,
      nombre,
      descripcion,
      precio: Number(precio),
      categoriaId,
      image,
    };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/comidas/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/comidas/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    }

    const res = await response.json();

    if (!response.ok) {
      toast.update(createFundadoresToast, {
        render: res.message,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return null;
    }

    toast.update(createFundadoresToast, {
      render: res.message,
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });

    const asdas = {
      id: res.id,
      idUser: data.data.id,
      nombre,
      descripcion,
      precio,
      categoriaId,
      image,
      edit: edit,
    };

    setNombre("");
    setDescripcion({ es: "", en: "" });
    setPrecio(0);
    setImage("");
    setCategoriaId(0);
    setId(0);
    onClose(asdas);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/plato`);
      /* if (edit == true) formData.append("update", image); */
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

  const onTranslate = async () => {
    const dataJson = {
      promp: `Traduceme el siguiente texto, es la descripcion de un plato peruano, solo devuelveme la traducción y ya\n ${descripcion.es}`,
    };

    const createTranslaeToast = toast.loading("Traduciendo...");

    const sendTranslation = await fetch(`/api/traduccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataJson),
    });

    const data = await sendTranslation.json();

    if (sendTranslation.ok) {
      setDescripcion({ ...descripcion, en: data });

      toast.update(createTranslaeToast, {
        render: "Traducido",
        isLoading: false,
        type: "success",
        autoClose: 2000,
      });
    } else {
      toast.update(createTranslaeToast, {
        render: "Error al raducir",
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
              <FaCirclePlus /> Crear Plato
            </>
          ) : (
            <>
              <MdEdit />
            </>
          )}
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>{text} Plato</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombres">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e: any) => setNombre(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    type="number"
                    id="precio"
                    value={precio}
                    onChange={(e: any) => setPrecio(e.target.value)}
                  />
                </div>
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
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="descripcion-es">Descripción (ESpañol)</Label>
                  <Textarea
                    rows={5}
                    id="descripcion-es"
                    value={descripcion.es}
                    onChange={(e) =>
                      setDescripcion({ ...descripcion, es: e.target.value })
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="descripcion-es">Descripción (Ingles)</Label>
                  <Textarea
                    rows={5}
                    id="descripcion-en"
                    value={descripcion.en}
                    onChange={(e) =>
                      setDescripcion({ ...descripcion, en: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-row gap-3 justify-end">
                <Button onClick={onSubmit}>{text}</Button>
                <Button onClick={onTranslate}>Traducir</Button>
                <Button onClick={uploadFile}>Subir imagen</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
