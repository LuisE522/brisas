import Evento from "@/components/Evento/Evento";
import { API_URL, PAGE_NAME } from "@/const";
import { Metadata } from "next";

const eventoData = [
  {
    imagen: "https://cdn.joinnus.com/user/3068910/uiV7JPMHHg0u23D.png",
    color: "99C44F",
    btn_color: "3E51A2",
    slug: "almuerzo-show",
    nombre: "Almuerzo show",
    btn_inicio: '3B3D46'
  },
  {
    imagen: "https://cdn.joinnus.com/user/3068910/sDoZbNGm20Nvvzx.png",
    color: "D066AA",
    btn_color: "C93513",
    slug: "noche-de-folklore",
    nombre: "Noche de folklore",
    btn_inicio: '7D220E'
  },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const filteredEvento = eventoData.filter((e) => e.slug === params.slug);

  if(filteredEvento.length === 0) {
    return {
      title: "Evento bien god",
      applicationName: PAGE_NAME,
      openGraph: {
        siteName: PAGE_NAME,
        type: "article",
      },
    };
  }

  return {
    title: filteredEvento[0].nombre,
    applicationName: PAGE_NAME,
    openGraph: {
      siteName: PAGE_NAME,
      type: "article",
    },
  };
}

interface Props {
  evento: {
    imagen: string;
    color: string;
    btn_color: string;
    nombre: string;
    btn_inicio: string;
  };
}

export default async function eventoPage({ params }: { params: { slug: string } }) {
  const filteredEvento = eventoData.filter((e) => e.slug === params.slug);
  var eventoInfo = null;
  var evento = null;

  /* console.log(`${API_URL}/eventos/listareventos/${params.slug}`) */

  if (filteredEvento.length === 0) {
    const response = await fetch(`${API_URL}/eventos/listareventos/${params.slug}`, {
      method: 'GET',
      cache: 'no-store'
    })

    const res = await response.json()

    console.log(res)
    eventoInfo = res;

    /* console.log(params.slug)
    console.log(res) */
  }

  if(eventoInfo === null){
    evento = filteredEvento[0];
  }
  else{
    evento = {
      imagen: eventoInfo.image,
      color: eventoInfo.bg_color,
      btn_color: '1f1f1f',
      nombre: eventoInfo.nombre,
      btn_inicio: '212121'
    }
  }
  /* console.log(eventoInfo) */

  return (
    <>
      <Evento evento={evento} />
    </>
  );
}
