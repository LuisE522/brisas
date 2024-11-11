"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosCreate } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { convertToSlug } from "@/lib/utils";

interface Props {
  onClose: () => void;
}

export default function CreateDanzas({ onClose }: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [nombre, setNombre] = useState({
    es: "",
    en: "",
  });

  const [descripcion, setDescripcion] = useState({
    es: "",
    en: "",
  });
  const [image, setImage] = useState<string>("");
  const [fileImage, setFileImage] = useState<any>();
  const [slug, setSlug] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      nombre,
      descripcion,
      image,
      slug,
      video: video == "" ? null : video,
    };

    const createDanzaToast = toast.loading("Creando...");

    const response = await fetch(`${API_URL}/danzas/createdanzas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataJson),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.update(createDanzaToast, {
        render: data.message,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return null;
    }

    toast.update(createDanzaToast, {
      render: data.message,
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });

    onClose(/* data.result */);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/danzas`);
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

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoNombre = e.target.value;
    setNombre({ ...nombre, es: nuevoNombre });
    setSlug(convertToSlug(nuevoNombre));
  };

  const onTranslate = async () => {
    const dataJson = {
      promp: `Traduceme los siguientes textos, el primero es el nombre de una danza y el 2do es su descripción\n1. ${nombre.es}\n2. ${descripcion.es}'n Solo devuelveme la traduccion en formato json nombre y descripcion.`,
    };

    const createTranslaeToast = toast.loading("Creando...");

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
      const wqe = JSON.parse(data);

      /* console.log(wqe.nombre) */
      setNombre({ ...nombre, en: wqe.nombre });
      setDescripcion({ ...descripcion, en: wqe.descripcion });

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
        <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl">
          <IoIosCreate /> Crear danza
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Crear danza</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre-es">Nombre (Español)</Label>
                  <Input
                    autoFocus
                    type="text"
                    id="nombre-es"
                    value={nombre.es}
                    onChange={(e) => handleNombreChange(e)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre-en">Nombre (Inglés)</Label>
                  <Input
                    type="text"
                    id="nombre-en"
                    value={nombre.en}
                    onChange={(e) =>
                      setNombre({ ...nombre, en: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="video">Video</Label>
                  <Input
                    type="text"
                    id="video"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
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
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="descripcion-es">Descripción (Español)</Label>
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
                <Label htmlFor="descripcion-en">Descripción (Inglés)</Label>
                <Textarea
                  rows={5}
                  id="descripcion-en"
                  value={descripcion.en}
                  onChange={(e) =>
                    setDescripcion({ ...descripcion, en: e.target.value })
                  }
                />
              </div>

              <div className="w-full flex flex-row gap-3 justify-end">
                <Button onClick={onSubmit}>Crear</Button>
                <Button onClick={uploadFile}>Subir imagen</Button>
                <Button onClick={onTranslate}>Traducir</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
