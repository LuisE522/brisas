"use client";

import { getAuthTokenClient } from "@/lib/getUserData";
import CreateFundadores from "./CreateFundadores";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EditFundadores from "./EditFundadores";

export interface Fundadores_I {
  id: number;
  nombre: string;
  descripcion: {
    en: string;
    es: string;
  };
  imagen: string;
  fecha: string;
}

export default function ListFundadores({
  fundadores,
}: {
  fundadores: Fundadores_I[];
}) {
  const token = getAuthTokenClient();

  const [listFundadores, setListFundadores] =
    useState<Fundadores_I[]>(fundadores);
  const [dialogInfo, setDialogInfo] = useState<Fundadores_I | null>(null);

  /* const showDialog = (index: number) => {
    setDialogInfo(listUser[index]);
  };

  const onDialogClose = () => {
    setDialogInfo(null);
  }; */

  const onSearch = (nombre: string) => {
    if (nombre.length > 1) {
      const filter = listFundadores.filter((danza: Fundadores_I) =>
        danza.nombre.toLowerCase().includes(nombre.toLowerCase())
      );

      setListFundadores(filter);
    } else {
      setListFundadores(fundadores);
    }
  };

  const showDialog = (index: number) => {
    setDialogInfo(listFundadores[index]);
  };

  const onDialogClose = () => {
    setDialogInfo(null);
  };

  const closeCreate = (newFundador: Fundadores_I) => {
    /* console.log(newFundador) */

    setListFundadores((prevFundador) => [...prevFundador, newFundador]);
  };

  console.log(fundadores);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Lista de todos los fundadores</h1>
          <CreateFundadores
            onClose={(newFundador) => closeCreate(newFundador)}
          />
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
          {listFundadores.map((fundador: Fundadores_I, index: number) => (
            <div
              className="w-full flex flex-col gap-2 cursor-pointer"
              key={index}
              onClick={() => showDialog(index)}
            >
              <div className="w-full flex justify-end">
                <div className="w-full h-[200px] md:h-[250px] xl:h-[300px] bg-slate-400 !relative rounded-lg overflow-hidden">
                  {fundador.imagen && (
                    <Image
                      /* unoptimized */
                      src={fundador.imagen}
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
                <h1 className="font-semibold">{fundador.nombre}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dialogInfo && (
        <EditFundadores fundadores={dialogInfo} onClose={onDialogClose} />
      )}
    </>
  );
}
