import Danzas from "@/components/Danzas/Danzas";
import InfiniteImageGrid from "@/components/GridInfinito/GridInfinito";
import NavTransparent from "@/components/Home/NavTransparent";
import PopUp from "@/components/Home/PopUp";
import { PAGE_NAME } from "@/const";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: 'Danzas',
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

export default function DanzasPage() {
  return (
    <>
      <Danzas />
      {/* <InfiniteImageGrid /> */}
      <PopUp />
    </>
  );
}
