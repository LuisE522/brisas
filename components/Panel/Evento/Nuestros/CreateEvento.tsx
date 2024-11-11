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
import { useEffect, useState } from "react";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { convertToSlug, revalidar, tipo_eventos } from "@/lib/utils";
import { FaCirclePlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { format, formatISO } from "date-fns";

interface Props {
  onClose: (newFundador: any) => void;
  id_p?: number;
  nombre_p?: string,
  slug_p?: string,
  descripcion_p?: string,
  image_p?: string,
  fecha_creacion_p?: Date,
  precio_p?: number,
  edit?: boolean,
  type_p?: number
}

export default function CreateEvento({ onClose, id_p = 0, type_p = 0, nombre_p = '', slug_p = '', descripcion_p = '', image_p = '', fecha_creacion_p = new Date(), precio_p = 0, edit = false }: Props) {
  const [open, setOpen] = useState(false);
  const token = getAuthTokenClient();

  const [id, setId] = useState<number>(id_p)
  const [nombre, setNombre] = useState(nombre_p);
  const [slug, setSlug] = useState<string>(slug_p);
  const [image, setImage] = useState<string>(image_p);
  const [fileImage, setFileImage] = useState<any>("");
  const [link, setLink] = useState<string>(descripcion_p);
  const [precio, setPrecio] = useState<number>(precio_p);
  const [tipoEvento, setTipoEvento] = useState<number>(type_p);

  const [fecha, setFecha] = useState<string>('');

  const text = edit ? "Editar" : "Crear";

  useEffect(() => {
    // Si fecha_creacion_p es una fecha válida, actualizamos el estado
    if (fecha_creacion_p) {
      const fechaFormateada = new Date(fecha_creacion_p).toISOString().split('T')[0]; // Formato: YYYY-MM-DD
      setFecha(fechaFormateada);
    }
  }, [fecha_creacion_p]);

  const closeDialog = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = async () => {

    console.log(fecha)

    const dataJson = {
      nombre,
      slug,
      image,
      fecha_creacion: `${fecha}T05:00:00Z`,
      tipo: Number(tipoEvento),
      descripcion: link,
      precio: Number(precio),
    };

    /* console.log(dataJson)

    return; */

    const createFundadoresToast = toast.loading(`${text}...`);


    var response;

    if (edit == false) {


      response = await fetch(`${API_URL}/eventosjoinuss/createevento`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataJson),
      });
    }
    else {
      response = await fetch(`${API_URL}/eventosjoinuss/update/${id}`, {
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

    await revalidar('listFundadores')

    const res = {
      id: data.id,
      nombre,
      slug,
      image,
      fecha_creacion: new Date(fecha),
      tipo: Number(tipoEvento),
      descripcion: link,
      precio: Number(precio),
    }

    onClose(res);
    closeDialog(false);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (fileImage) {
      formData.append("image", fileImage);
      formData.append("ruta", `/eventos`);
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
    setNombre(nuevoNombre);
    setSlug(convertToSlug(nuevoNombre));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
        <DialogTrigger className={`flex flex-row gap-1 items-center text-sm`}>
          {edit == false ? (
            <>
              <FaCirclePlus /> Crear Evento
            </>
          ) : (
            <>
              <MdEdit /> Editar
            </>
          )}
        </DialogTrigger>
        <DialogContent className="dark text-white">
          <DialogHeader>
            <DialogTitle>Registrar Evento</DialogTitle>
            <DialogDescription className="w-full flex flex-col pt-5 gap-5">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:ga-3">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    autoFocus
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e: any) => handleNombreChange(e)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e: any) => setFecha(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="precio">Precio</Label>
                  <Input
                    type="number"
                    id="precio"
                    value={precio}
                    onChange={(e: any) => setPrecio(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    type="text"
                    id="link"
                    value={link}
                    onChange={(e: any) => setLink(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="descripcion">Descripcion</Label>
                  <select onChange={(e) => setTipoEvento(Number(e.target.value))} className="w-full bg-[#121212] text-white h-[50px] px-3">
                    <option value="" selected={tipoEvento == 0} >Seleccione el tipo de evento</option>
                    {tipo_eventos.map((tipo) => (
                      <option key={tipo.id} value={tipo.id} selected={tipoEvento == tipo.id}>
                        {tipo.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <Label htmlFor="fecha">Fecha</Label>
                  <input
                    className="w-full h-[50px] px-3 rounded-lg bg-[#121212] text-white"
                    type="date"
                    id="fecha"
                    value={fecha}
                    onChange={(e: any) => setFecha(e.target.value)}
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
