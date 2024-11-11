import T_Categorias from "@/components/Panel/Talleres/T_Categorias";
import Talleres from "@/components/Panel/Talleres/Talleres";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function TalleresPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/talleres/list/categoria`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const res = await response.json();

  console.log(res)

  return (
    <>
      {/* <Talleres talleres={res} /> */}
      <T_Categorias talleresCategorias={res} />
    </>
  );
}
