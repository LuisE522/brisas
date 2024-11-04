import Elenco from "@/components/Elenco/Elenco";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";
import React from "react";import { PAGE_NAME } from "@/const";
import { Metadata } from "next";
import { getTalleres } from "./services/culturales.services";

async function fetchTalleres(){
  const data = await getTalleres();

  return data
}

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: 'Talleres',
    /* description: `${DESCRIPTION}`, */
    applicationName: `${PAGE_NAME}`,
    /* keywords: `${KEYWORDS}`, */
    openGraph: {
      siteName: `${PAGE_NAME}`,
      /* description: `${DESCRIPTION}`, */
      type: 'article'


    }
  }
}

export default async function ElencoPage() {
  const res = await fetchTalleres();

  return (
    <>
      <Elenco imagenes={res} />
    </>
  );
}
