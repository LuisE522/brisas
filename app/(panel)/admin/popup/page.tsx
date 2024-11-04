import Popup from "@/components/Panel/Popup/Popup";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";

export default async function PopupPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/popup/list`, {
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
      <Popup popups={res} />
    </>
  );
}
