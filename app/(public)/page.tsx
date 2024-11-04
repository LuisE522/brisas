import PopUp from "@/components/Home/PopUp";
import Page1 from "@/components/Home/Page1";
import Page2 from "@/components/Home/Page2";
import Page3 from "@/components/Home/Page3";
import { Metadata } from "next";
import {PAGE_NAME} from '@/const'

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: 'Inicio',
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

export default function Home() {
  const i_images = [
    "/assets/images/personajes/1.png",
    "/assets/images/personajes/3.png",
    "/assets/images/personajes/5.png",
  ];

  const d_images = [
    "/assets/images/personajes/2.png",
    "/assets/images/personajes/4.png",
    "/assets/images/personajes/6.png",
  ];

  return (
    <div className="w-full min-h-screen">
      {/* <Page1 d_images={d_images} i_images={i_images} /> */}
      {/* <Page2 /> */}
      
      <Page3 d_images={d_images} i_images={i_images} />

      {/* <div className="h-screen bg-[#12141C]"></div>
      <div className="h-screen bg-purple-500" id="purple"></div> */}

      {/* <PopUp /> */}
    </div>
  );
}
