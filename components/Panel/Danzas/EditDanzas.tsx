"use client";

import { ListUsers, UsuariosRoles } from "@/app/(panel)/admin/models/Usuarios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { Checkbox } from "@/components/ui/checkbox";
import { Roles } from "@/app/(panel)/admin/models/Roles";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Danzas_I } from "./ListDanzas";

interface Props {
  danza: Danzas_I;
  onClose: () => void;
}

export default function EditDanzas({ danza, onClose }: Props) {
  const [open, setOpen] = useState(true);

  const [nombre, setNombre] = useState({
    es: danza.nombre.es,
    en: danza.nombre.en,
  });

  const [descripcion, setDescripcion] = useState({
    es: danza.descripcion.es,
    en: danza.descripcion.en,
  });
  const [image, setImage] = useState<string>(danza.image);
  const [video, setVideo] = useState<string | null>(danza.video);
  const [fileImage, setFileImage] = useState<any>();

  const token = getAuthTokenClient();

  const onSubmit = async () => {
    const dataJson = {
      id: danza.id,
      nombre,
      descripcion,
      image,
      video: video == '' ? null : video,
    };

    const editUserToast = toast.loading("Actualizando...");

    const userUpdate = await fetch(
      `${API_URL}/danzas/updatedanzas/${danza.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      }
    );

    const data = await userUpdate.json();

    if (!userUpdate.ok) {
      toast.update(editUserToast, {
        render: data.message,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
      return null;
    }

    console.log(data);

    toast.update(editUserToast, {
      render: "Actualizado.",
      isLoading: false,
      type: "success",
      autoClose: 2000,
    });
  };

  const updateImage = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", fileImage);
      formData.append("ruta", `/danzas`);
      formData.append("update", image);
    } else {
      toast.error("Debe seleccionar una imagen");
      return null;
    }

    const uploadImageToast = toast.loading("Actualizando imagen...");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setImage(result.fileUrl);
      toast.update(uploadImageToast, {
        render: "Imagen actualizada",
        isLoading: false,
        type: "success",
        autoClose: 2000,
      });
    } else {
      toast.update(uploadImageToast, {
        render: "Error al actualizar la imagen",
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const closeDialog = (open: boolean) => {
    setOpen(open);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
        <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl"></DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Editar danza</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="w-full grid grid-cols-2 gap-1.5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre-es">Nombre (ES)</Label>
                  <Input
                    autoFocus
                    type="text"
                    id="nombre-es"
                    value={nombre.es}
                    onChange={(e: any) =>
                      setNombre({ ...nombre, es: e.target.value })
                    }
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre-en">Nombre (EN)</Label>
                  <Input
                    type="text"
                    id="nombre-en"
                    value={nombre.en}
                    onChange={(e: any) =>
                      setNombre({ ...nombre, en: e.target.value })
                    }
                  />
                </div>
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
              <div className="w-full grid grid-cols-2 gap-1.5">
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
                  <Label htmlFor="video">Video</Label>
                  <Input
                    type="text"
                    id="video"
                    value={video ? video : ""}
                    onChange={(e: any) => setVideo(e.target.value)}
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

              <div className="w-full flex gap-3">
                <Button onClick={onSubmit}>Actualizar</Button>
                <Button onClick={updateImage}>Actualizar Imagen</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
