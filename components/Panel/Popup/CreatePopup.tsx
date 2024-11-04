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
import { FaCirclePlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface Props {
  onClose: (newFundador: any) => void;
  id_p?: number;
  link_p?: string;
  image_p?: string;
  edit?: boolean;
}

export default function CreatePopup({
  onClose,
  id_p = 0,
  link_p = "",
  image_p = "",
  edit = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [id, setId] = useState(id_p);
  const [link, setLink] = useState(link_p);
  const [image, setImage] = useState<string>(image_p);
  const [fileImage, setFileImage] = useState<any>("");

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson = {
      link,
      image,
    };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/popup/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/popup/update/${id}`, {
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
      image,
      link,
      edit: edit,
    };

    setId(0);
    setLink("");
    setImage("");

    /* console.log(data) */
    onClose(asdas);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/popup`);
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
              <FaCirclePlus /> Crear Popup
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
                <Label htmlFor="link">Link</Label>
                <Input
                  type="text"
                  id="link"
                  value={link}
                  onChange={(e: any) => setLink(e.target.value)}
                />
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
