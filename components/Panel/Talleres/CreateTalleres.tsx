"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { T_Categoria_I } from "./T_Categorias";

interface Props {
  onClose: (newFundador: any) => void;
  edit?: boolean;
  image_p?: string;
  id_p?: number;
  categoriaId_p?: number;
  listCategorias: T_Categoria_I[]
}

export default function CreateTalleres({
  onClose,
  listCategorias,
  edit = false,
  image_p = "",
  id_p = 0,
  categoriaId_p = 0
}: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [id, setId] = useState(id_p);
  const [image, setImage] = useState<string>(image_p);
  const [fileImage, setFileImage] = useState<any>("");
  const [categoriaId, setCategoriaId] = useState(categoriaId_p)

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      image,
      categorias_talleresId: categoriaId
    };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/talleres/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/talleres/update/${id}`, {
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
        autoClose: 1500,
      });
      return null;
    }

    toast.update(createFundadoresToast, {
      render: data.message,
      isLoading: false,
      type: "success",
      autoClose: 1500,
    });

    const asdas = {
      id: data.id,
      image,
      edit: edit,
    };

    setId(0);
    setImage("");

    /* console.log(data) */
    onClose(asdas);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/talleres`);
      if (edit) formData.append("update", image);
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
        <DialogTrigger className={`flex flex-row gap-1 items-center text-sm`}>
          {edit == false ? (
            <>
              <FaCirclePlus /> Subir imagen
            </>
          ) : (
            <>
              <MdEdit /> Editar
            </>
          )}
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>{text} Popup</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="image">Categoria</Label>
                <select onChange={(e) => setCategoriaId(Number(e.target.value))} className="w-full bg-[#121212] text-white h-[50px] px-3">
                  <option disabled>Selecciona la categoria</option>
                  {listCategorias.map((categoria, index) => (
                    <option selected={categoria.id == categoriaId} value={categoria.id}>{categoria.categoria}</option>
                  ))}
                </select>
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
