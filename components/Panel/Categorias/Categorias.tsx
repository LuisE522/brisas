"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Categoria,
  CategoriaWithComidas,
  Comida_I,
} from "@/app/(panel)/admin/platos/page";
import Comida from "./Comida";
import CreateCategoria from "./CreateCategoria";
import CreatePlatos from "./Platos/CreatePlatos";

interface Props {
  categorias: CategoriaWithComidas[];
}

export default function Categorias({ categorias }: Props) {

  const [listCategorias, setListCategorias] =
    useState<CategoriaWithComidas[]>(categorias);

  const showDialog = (index: number) => {
    /* setDialogInfo(listCategorias[index]); */
  };

  const onDialogClose = () => {
    /* setDialogInfo(null); */
  };

  const closeCreate = (newCategoria: any) => {
    /* console.log(newFundador) */
    if (newCategoria.edit == false) {
      setListCategorias((prevCategoria: any) => [
        ...prevCategoria,
        newCategoria,
      ]);
    }
  };

  const closeCreatePlato = (newPlato: any) => {
    console.log(newPlato);
    /* if (newPlato.edit == false) {
      setListCategorias((prevPlato: any) => [
        ...prevPlato,
        newPlato,
      ]);
    } */
  };

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center">
          <h1 className="text-sm lg:text-xl">Lista de las categorias</h1>
          <CreateCategoria
            onClose={(newFundador) => closeCreate(newFundador)}
          />
        </div>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {listCategorias.map(
              (categoria: CategoriaWithComidas, index: number) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>
                    <h1>{categoria.nombre}</h1>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-5">
                    <div className="w-full flex flex-row gap-3 items-center">
                      <div className="flex flex-row gap-5">
                        <button
                          className="bg-slate-600/90 text-white px-3 py-1 rounded-lg text-sm"
                          onClick={() => showDialog(index)}
                        >
                          <CreateCategoria
                            onClose={(newFundador) => closeCreate(newFundador)}
                            edit={true}
                            nombre_p={categoria.nombre}
                            id={categoria.id}
                          />
                        </button>
                        <button
                          className="bg-slate-600/90 text-white px-3 py-1 rounded-lg text-sm"
                          onClick={() => showDialog(index)}
                        >
                          <CreatePlatos
                            onClose={(newPlato) => closeCreatePlato(newPlato)}
                            categoriaId_p={categoria.id}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 2xl:gap-10">
                      {categoria.comidas.map(
                        (comida: Comida_I, index: number) => (
                          <Comida
                            categoria_id={categoria.id}
                            comida={comida}
                            key={index}
                          />
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
}
