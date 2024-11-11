'use client'

import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Talleres, { Talleres_I } from './Talleres';
import Image from 'next/image';
import T_CategoriaCreated from './T_CategoriaCreated';
import CreateTalleres from './CreateTalleres';

interface Props {
    talleresCategorias: TalleresCategoria_I[]
}

export interface T_Categoria_I {
    id?: number;
    categoria: string;
}

export interface TalleresCategoria_I extends T_Categoria_I {
    talleres: Talleres_I[]
}

export default function T_Categorias({ talleresCategorias }: Props) {

    const [listCategorias, setListCategorias] =
        useState<TalleresCategoria_I[]>(talleresCategorias);

    const [selectCategoria, setSelectCategoria] = useState<T_Categoria_I[]>(
        talleresCategorias.map(({ id, categoria }) => ({ id, categoria }))
    );

    const showDialog = (index: number) => {
        /* setDialogInfo(listCategorias[index]); */
    };

    const onDialogClose = () => {
        /* setDialogInfo(null); */
    };

    const closeCreate = (newCategoria: any) => {
        console.log(newCategoria)
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
                    <h1 className="text-sm lg:text-xl">Lista de talleres por categoria</h1>
                    <T_CategoriaCreated
                        onClose={(newFundador) => closeCreate(newFundador)}
                        listCategorias={selectCategoria}
                    />
                </div>

                <div className="w-full">
                    <Accordion type="single" collapsible className="w-full">
                        {listCategorias.map(
                            (categoria: TalleresCategoria_I, index: number) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger>
                                        <h1>{categoria.categoria}</h1>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-5">
                                        <div className="w-full flex flex-row gap-3 items-center">
                                            <div className="flex flex-row gap-5">
                                                <button
                                                    className="bg-slate-600/90 text-white px-3 py-1 rounded-lg text-sm"
                                                    onClick={() => showDialog(index)}
                                                >
                                                    <T_CategoriaCreated
                                                        onClose={(newFundador) => closeCreate(newFundador)}
                                                        edit={true}
                                                        nombre_p={categoria.categoria}
                                                        id={categoria.id}
                                                        listCategorias={selectCategoria}
                                                    />
                                                </button>
                                                <button
                                                    className="bg-slate-600/90 text-white px-3 py-1 rounded-lg text-sm"
                                                    onClick={() => showDialog(index)}
                                                >
                                                    <CreateTalleres
                                                        onClose={(newPlato) => closeCreatePlato(newPlato)}
                                                        categoriaId_p={categoria.id}
                                                        listCategorias={selectCategoria}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 2xl:gap-10">
                                            {categoria.talleres.map(
                                                (taller: Talleres_I, index: number) => (
                                                    <>
                                                        <Talleres
                                                            categoria_id={categoria.id ? categoria.id : 0}
                                                            taller={taller}
                                                            key={index}
                                                            listCategorias={selectCategoria}
                                                        />
                                                    </>
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
    )
}
