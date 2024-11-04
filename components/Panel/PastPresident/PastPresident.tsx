"use client";

import { getAuthTokenClient } from "@/lib/getUserData";
import Image from "next/image";
import React, { useState } from "react";
import CreatePresident from "./CreatePresident";
import President from "./President";

export interface PastPresident_I {
  id: number;
  nombre: string;
  fecha: string;
  descripcion: any;
  imagePresident: string;
  imageJunta: string;
}

interface Props {
  pastPresidents: PastPresident_I[];
}

export default function PastPresident({ pastPresidents }: Props) {
  console.log(pastPresidents);

  const [listPresidents, setListPresidents] = useState(pastPresidents);

  const token = getAuthTokenClient();

  const showDialog = (index: number) => {
    /* setDialogInfo(listFundadores[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newPresidente: any) => {
    console.log(newPresidente);
    setListPresidents((prevPresidente: any) => [
      ...prevPresidente,
      newPresidente,
    ]);
  };

  const onDelete = (id: number) => {
    setListPresidents((prevPresidente: any) =>
      prevPresidente.filter((presidente: any) => presidente.id !== id)
    );
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Past Presidents</h1>
          <CreatePresident
            onClose={(newPresidente) => closeCreate(newPresidente)}
          />
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-7">
          {listPresidents.map((presidente: PastPresident_I, index: number) => (
            <President
              presidente={presidente}
              key={index}
              onDelete={(id: number) => onDelete(id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
