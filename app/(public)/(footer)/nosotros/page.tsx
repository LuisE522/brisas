import Nosotros from "@/components/Nosotros/Nosotros";
import React from "react";import { PAGE_NAME } from "@/const";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: 'Nosotros',
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

export default function NosotrosPage() {
  return (
    <>
      <Nosotros />
    </>
  );
}
