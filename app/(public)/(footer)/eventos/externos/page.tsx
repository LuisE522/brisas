import EventosExternos from "@/components/EventosExternos/EventosExternos";
import React from "react";
import { PAGE_NAME } from "@/const";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Eventos Externos",
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

export default function EventosExternosPage() {
  return (
    <>
      <EventosExternos />
    </>
  );
}