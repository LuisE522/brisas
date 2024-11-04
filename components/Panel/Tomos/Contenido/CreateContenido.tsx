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
import { Contenido_I } from "../Tomos";

interface Props {
  onClose: (newContenido: Contenido_I) => void;
  tomoId: number;
}

export default function CreateContenido({ onClose, tomoId }: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [titulo, setTitulo] = useState({
    es: "",
    en: "",
  });
  const [descripcion, setDescripcion] = useState({
    es: "",
    en: "",
  });
  const [leyenda, setLeyenda] = useState({
    es: "",
    en: "",
  });
  const [image, setImage] = useState<any>();
  const [urlImage, setUrlImage] = useState<string | null>(null);

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    if (urlImage == null) {
      toast.error("Debe subir una imagen");
      return null;
    }

    const dataJson = {
      image: urlImage,
      descripcion,
      leyenda,
      tomoId,
    };

    const createFundadoresToast = toast.loading("Creando...");

    const response = await fetch(`${API_URL}/tomos-contenido/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataJson),
    });

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

    /* console.log(data) */
    resetFields();
    onClose(dataJson);
    closeDialog(false);
  };

  const resetFields = () => {
    setTitulo({ es: "", en: "" });
    setDescripcion({ es: "", en: "" });
    setLeyenda({ es: "", en: "" });
    setImage("");
  };

  const onTranslate = async () => {
    const dataJson = {
      promp: `Traduceme los siguientes textos, ambos estan relacionados a la historia de como se creo, fundo y crecio, la asociacion cultural brisas del titicaca del perú\n1. ${leyenda.es}\n2. ${descripcion.es}'n Solo devuelveme la traduccion en formato json leyenda y descripcion. El contenido de leyenda y descripcion (traduccion en ingles) debe ser texto plano.`,
    };
    /* const dataJson = {
      promp: `Traduceme el siguiente texto, es el titulo de una sección de mi web, solo devuelveme la traducción y ya\n ${titulo.es}`,
    }; */

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

      setLeyenda({ ...leyenda, en: wqe.leyenda });
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

  const uploadFile = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
      formData.append("ruta", `/tomos/${tomoId}/contenido`);
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
      setUrlImage(result.fileUrl);
      toast.update(uploadImageToast, {
        render: "Imagen subida",
        isLoading: false,
        type: "success",
        autoClose: 2000,
      });
    } else {
      console.log("Error");
      console.log(result);
      setUrlImage(null);

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
        <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl">
          <IoIosCreate /> Crear contenido
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Registrar tomo</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              {/* <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="titulo-es">Titulo</Label>
                  <Input
                    type="text"
                    id="titulo-es"
                    value={titulo.es}
                    onChange={(e: any) =>
                      setTitulo({ ...titulo, es: e.target.value })
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre-en">Nombre (Inglés)</Label>
                  <Input
                    type="text"
                    id="nombre-en"
                    value={titulo.en}
                    onChange={(e) =>
                      setTitulo({ ...titulo, en: e.target.value })
                    }
                  />
                </div>
              </div> */}
              {/* <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Imagen</Label>
                <Input
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e: any) => setImage(e.target.value)}
                />
              </div> */}

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Imagen</Label>
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>

              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="leyenda-es">Leyenda (Español)</Label>
                  <Textarea
                    rows={5}
                    id="leyenda-es"
                    value={leyenda.es}
                    onChange={(e) =>
                      setLeyenda({ ...leyenda, es: e.target.value })
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="leyenda-en">Leyenda (Inglés)</Label>
                  <Textarea
                    rows={5}
                    id="leyenda-en"
                    value={leyenda.en}
                    onChange={(e) =>
                      setLeyenda({ ...leyenda, en: e.target.value })
                    }
                  />
                </div>
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
