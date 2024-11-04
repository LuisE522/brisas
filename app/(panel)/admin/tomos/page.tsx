import Tomos from "@/components/Panel/Tomos/Tomos";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function TomosPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/tomos/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await response.json();

  return (
    <>
      <Tomos tomos={res} />
    </>
  );
}
