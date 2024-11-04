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

interface Props {
  onClose: (newFundador: any) => void;
}

export default function CreateTomos({ onClose }: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [nombre, setNombre] = useState({
    es: "",
    en: "",
  });
  const [image, setImage] = useState<string>("");
  const [fileImage, setFileImage] = useState<any>("");

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      titulo: nombre,
      image,
    };

    const createFundadoresToast = toast.loading("Creando...");

    const response = await fetch(`${API_URL}/tomos/create`, {
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
    onClose(dataJson);
    closeDialog(false);
  };

  const onTranslate = async () => {
    const dataJson = {
      promp: `Traduceme el siguiente texto, es el titulo de una sección de mi web, solo devuelveme la traducción y ya\n ${nombre.es}`,
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
      setNombre({ ...nombre, en: data });

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
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/tomos`);
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

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
        <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl">
          <IoIosCreate /> Crear tomo
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Registrar tomo</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nombre-es">Nombre</Label>
                <Input
                  type="text"
                  id="nombre-es"
                  value={nombre.es}
                  onChange={(e: any) =>
                    setNombre({ ...nombre, es: e.target.value })
                  }
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nombre-en">Nombre (Inglés)</Label>
                <Input
                  type="text"
                  id="nombre-en"
                  value={nombre.en}
                  onChange={(e) => setNombre({ ...nombre, en: e.target.value })}
                />
              </div>
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
                    setFileImage(e.target.files ? e.target.files[0] : null)
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
