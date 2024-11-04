import Puquina from "@/components/Pquina/Puquina";import { PAGE_NAME } from "@/const";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: "Puquina Q'ocha",
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

export default function PquinaPage() {
  return (
    <>
      <Puquina />
    </>
  );
}
