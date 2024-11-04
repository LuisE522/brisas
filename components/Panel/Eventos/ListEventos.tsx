"use client";

import { formateDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Evento_I {
  idUser: number;
  id: number;
  nombre: string;
  descripcion: string;
  image: string;
  fecha_creacion: string;
  fecha_edicion: string;
  precio: number;
  slug: string;
  bg_color: string;
}

export default function ListEventos({ eventos }: { eventos: Evento_I[] }) {
  const [listEventos, setListEventos] = useState(eventos);

  console.log(listEventos[0])

  const onSearch = (nombre: string) => {
    if (nombre.length > 1) {
      const filter = eventos.filter((eventos: Evento_I) =>
        eventos.nombre.toLowerCase().includes(nombre.toLowerCase())
      );

      setListEventos(filter);
    } else {
      setListEventos(eventos);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Lista de todos los eventos</h1>
        </div>
        <div className="w-full">
          <div className="w-full px-3 h-[40px] bg-white/10 rounded-lg overflow-hidden">
            <input
              onChange={(e) => onSearch(e.target.value)}
              type="text"
              name=""
              className="w-full h-full bg-transparent outline-none text-xs"
              id=""
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-x-3 gap-y-7">
          {listEventos.map((evento: Evento_I, index: number) => (
            <div className="w-full flex flex-col gap-2" key={index}>
              <Link
                href={`/admin/evento/${evento.slug}`}
                className="w-full flex justify-end"
              >
                <div className="w-full h-[200px] bg-slate-400 !relative rounded-lg overflow-hidden">
                  {evento.image && (
                    <Image
                      /* unoptimized */
                      src={evento.image}
                      alt="alt"
                      width={300}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute bottom-1 right-1 flex flex-row gap-1 z-20">
                    <span className="px-3 py-1 text-xs text-white bg-black/70 rounded-lg">
                      {formateDate(evento.fecha_creacion)}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="w-full relative text-white z-10 flex flex-col gap-1">
                <h1 className="font-semibold">{evento.nombre}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
