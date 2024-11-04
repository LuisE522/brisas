"use client";

import Image from "next/image";
import { Evento_I } from "./ListEventos";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import TinyEditor from "@/components/EditorHtml/TinyEditor";

interface Props {
  evento: Evento_I;
}

export default function EventoInfo({ evento }: Props) {
  const [color, setColor] = useState(`#${evento.bg_color}`);
  const [nombre, setNombre] = useState(`${evento.nombre}`);
  const [slug, setSlug] = useState(`${evento.slug}`);
  const [descripcion, setDescripcion] = useState(`${evento.descripcion}`);
  const [precio, setPrecio] = useState(`${evento.precio}`);

  const token = getAuthTokenClient();

  /* console.log(color); */

  const onUpdate = async () => {
    const data = {
      nombre,
      slug,
      descripcion,
      bg_color: color.replace("#", ""),
    };

    /* console.log(color); */

    const update = await fetch(`${API_URL}/eventos/update/${evento.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await update.json();
    console.log(res);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-[30%_68%] justify-between">
        <div className="w-full h-auto flex flex-col gap-2">
          <Image
            src={evento.image}
            alt="alt"
            width={300}
            height={250}
            className="w-full h-auto rounded-lg"
          />
          {/* <PopoverPicker color={color} onChange={setColor} /> */}
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            defaultValue={color}
          />
        </div>
        <div className="w-full h-auto flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
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
              <Label htmlFor="slug">Slug</Label>
              <Input
                type="text"
                id="slug"
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="descripcion">Descripcion</Label>
            <Textarea
              rows={5}
              id="descripcion"
              value={descripcion}
              onChange={(e: any) => setDescripcion(e.target.value)}
            />
          </div>

          <Button onClick={onUpdate}>Actualizar</Button>
        </div>
      </div>

      <div className="w-full mt-4">
        <TinyEditor />
      </div>
    </>
  );
}
