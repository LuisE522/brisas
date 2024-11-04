"use client";

import React, { useState } from "react";
import CreateTomos from "./CreateTomos";
import Image from "next/image";
import Link from "next/link";

export interface Tomos_I {
  id: number;
  image: string;
  titulo: {
    en: string;
    es: string;
  };
}

export interface Contenido_I {
  id?: number;
  image: string;
  titulo?: {
    en: string;
    es: string;
  };
  descripcion: {
    en: string;
    es: string;
  };
  leyenda: {
    en: string;
    es: string;
  };
  tomoId: number;
}

export interface TomosWithContenido_I extends Tomos_I {
  contenidos: Contenido_I[];
  _count: {
    contenidos: number;
  };
}

export default function Tomos({ tomos }: any) {
  const [listTomos, setListTomos] = useState(tomos);

  /* console.log(tomos); */

  const showDialog = (index: number) => {
    /* setDialogInfo(listFundadores[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newTomo: any) => {
    /* console.log(newFundador) */

    setListTomos((prevTomo: any) => [...prevTomo, newTomo]);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Lista de todos los fundadores</h1>
          <CreateTomos onClose={(newFundador) => closeCreate(newFundador)} />
        </div>
        <div className="w-full grid grid-cols-4 gap-3">
          {listTomos.map((tomos: Tomos_I, index: number) => (
            <Link
              prefetch={false}
              href={`/admin/tomos/${tomos.id}`}
              className="w-full flex flex-col gap-2.5 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div
                  className={`w-full h-[200px] md:h-[250px] xl:h-[300px] ${
                    tomos.image ? "" : "bg-slate-400"
                  } !relative rounded-lg overflow-hidden`}
                >
                  {tomos.image && (
                    <Image
                      /* unoptimized */
                      src={tomos.image}
                      alt="alt"
                      width={300}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* <div className="absolute bottom-1 right-1 flex flex-row gap-1 z-20">
                    <span className="px-3 py-1 text-xs text-white bg-black/70 rounded-lg">

                    </span>
                  </div> */}
                </div>
              </div>
              <div className="w-full relative text-white z-10 flex flex-col gap-1">
                <h1 className="font-semibold text-center">{tomos.titulo.es}</h1>
              </div>
              {/* <div className="w-full relative text-white z-10 flex flex-col gap-1">
                <button className="font-semibold w-full bg-white/10 p-2 rounded-lg">
                  Editar
                </button>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
