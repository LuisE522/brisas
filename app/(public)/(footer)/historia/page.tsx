import Page2 from "@/components/Home/Page2";
import { API_URL } from "@/const";
import { getListfundadores } from "./services/historia.services";import { PAGE_NAME } from "@/const";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {


  return {
    title: 'Historia',
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

async function fetchListFundadores() {
  const data = await getListfundadores();

  return data;

}

export default async function Infopage() {
  
  const res = await fetchListFundadores();

  return (
    <>
      <Page2 fundadores={res} />
    </>
  );
}
