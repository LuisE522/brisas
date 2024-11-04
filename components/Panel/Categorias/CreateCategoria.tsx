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
import { MdEdit } from "react-icons/md";

import { getAuthTokenClient } from "@/lib/getUserData";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Categoria } from "@/app/(panel)/admin/platos/page";
import { toast } from "react-toastify";
import { API_URL } from "@/const";

interface Props {
  onClose: (newFundador: any) => void;
  edit?: boolean;
  nombre_p?: string;
  id?: number;
}

export default function CreateCategoria({
  onClose,
  edit = false,
  nombre_p = "",
  id = 0,
}: Props) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(nombre_p);
  const token = getAuthTokenClient();

  const text = edit ? "Editar" : "Crear";

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {
    const dataJson: Categoria = { nombre };

    const createFundadoresToast = toast.loading(
      `${edit == false ? "Creando" : "Editando"}...`
    );

    var response;

    if (edit == false) {
      response = await fetch(`${API_URL}/categorias/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    } else {
      response = await fetch(`${API_URL}/categorias/update/${id}`, {
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
      comidas: [],
      edit: edit,
    };

    setNombre("");
    onClose(asdas);
    closeDialog(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
        <DialogTrigger
          className={`flex flex-row gap-1 items-center text-sm ${
            edit == false ? "lg:text-xl" : ""
          }`}
        >
          {edit == false ? (
            <>
              <IoIosCreate /> Crear Categoria
            </>
          ) : (
            <>
              <MdEdit /> Editar Categoria
            </>
          )}
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>{text} Categoria</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nombres">Nombre</Label>
                <Input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e: any) => setNombre(e.target.value)}
                />
              </div>

              <div className="w-full flex flex-row gap-3 justify-end">
                <Button onClick={onSubmit}>{text}</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
