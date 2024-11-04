import PastPresident from "@/components/Panel/PastPresident/PastPresident";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function PastPresidentPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/presidentes/list`, {
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
      <PastPresident pastPresidents={res} />
    </>
  );
}
