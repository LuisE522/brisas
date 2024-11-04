import Categorias from "@/components/Panel/Categorias/Categorias";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export interface Categoria {
  id?: number;
  nombre: string;
}

export interface Comida_I {
  id: number;
  idUser: number;
  nombre: string;
  descripcion: {
    es: string;
    en: string;
  };
  precio: number;
  categoriaId: number;
  image: string;
}

export interface CategoriaWithComidas extends Categoria {
  comidas: Comida_I[];
}

export default async function CategoriaPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/comidas/listcomidasadmin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const res = await response.json();

  return (
    <>
      <Categorias categorias={res} />
    </>
  );
}
