import ShowTomo from "@/components/Panel/Tomos/ShowTomo";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function ShowTomoPage({
  params,
}: {
  params: { id: string };
}) {
  const token = getAuthToken();

  const id: number = Number(params.id);

  const response = await fetch(`${API_URL}/tomos/id/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await response.json();

  return (
    <>
      <ShowTomo tomo={res.data} />
    </>
  );
}
