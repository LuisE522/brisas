import Promociones from "@/components/Panel/Promociones/Promociones";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function PromocionesPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/promociones/list`, {
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
      <Promociones promociones={res} />
    </>
  );
}
