"use client";

import { getAuthTokenClient } from "@/lib/getUserData";
import CreateDanzas from "./CreateDanzas";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EditDanzas from "./EditDanzas";

export interface Danzas_I {
  id: number;
  nombre: {
    en: string;
    es: string;
  };
  descripcion: {
    en: string;
    es: string;
  };
  image: string;
  slug: string;
  video: null | string;
}

export default function ListDanzas({ danzas }: { danzas: Danzas_I[] }) {
  const token = getAuthTokenClient();

  const [listDanzas, setListDanzas] = useState<Danzas_I[]>(danzas);
  const [dialogInfo, setDialogInfo] = useState<Danzas_I | null>(null);

  const showDialog = (index: number) => {
    setDialogInfo(listDanzas[index]);
    console.log(listDanzas[index])
  };

  const onDialogClose = () => {
    setDialogInfo(null);
  };

  const closeCreate = () => {};

  const onSearch = (nombre: string) => {
    if (nombre.length > 1) {
      const filter = listDanzas.filter((danza: Danzas_I) =>
        danza.nombre.es.toLowerCase().includes(nombre.toLowerCase())
      );

      setListDanzas(filter);
    } else {
      setListDanzas(danzas);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Lista de todos las danzas</h1>
          <CreateDanzas onClose={() => closeCreate()} />
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
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
          {listDanzas.map((danza: Danzas_I, index: number) => (
            <div
              className="w-full flex flex-col gap-2 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div className="w-full h-[200px] md:h-[250px] xl:h-[300px] bg-slate-400 !relative rounded-lg overflow-hidden">
                  {danza.image && (
                    <Image
                      /* unoptimized */
                      src={danza.image}
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
                <h1 className="font-semibold">{danza.nombre.es}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dialogInfo && <EditDanzas danza={dialogInfo} onClose={onDialogClose} />}
    </>
  );
}
