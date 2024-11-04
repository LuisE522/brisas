import EventosCulturales from "@/components/EventosCulturales/EventosCulturales";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";
import { PAGE_NAME } from "@/const";
import { Metadata } from "next";
import { getEventosCulturales } from "./services/culturales.services";

async function fetchEventosCulturales() {
  const data = await getEventosCulturales();

  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Eventos Culturales",
    /* description: `${DESCRIPTION}`, */
    applicationName: `${PAGE_NAME}`,
    /* keywords: `${KEYWORDS}`, */
    openGraph: {
      siteName: `${PAGE_NAME}`,
      /* description: `${DESCRIPTION}`, */
      type: "article",
    },
  };
}

export default async function EventosCulturalesPage() {

  const res = await fetchEventosCulturales();

  return (
    <>
      <EventosCulturales imagenes={res} />
    </>
  );
}
