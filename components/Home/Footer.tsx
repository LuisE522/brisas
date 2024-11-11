"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

import trs from "@/public/locales/translate.json";
import { useLanguage } from "@/context/LanguageProvider";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Elenco from "../Elenco/Elenco";

export default function Footer() {
  const { language } = useLanguage();
  const translations = trs as any;
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const pathItems = pathNames.map((path, i) => ({
    // Optionally you can capitalize the first letter here
    name: path,
    path: pathNames.slice(0, i + 1).join("/"),
  }));

  return (
    <div id="footer">
      <div className="bg-white py-10 hidden md:block">
        <div className="max-w-[95%] w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto flex flex-row gap-1 items-center text-2xl capitalize">
          <span className="font-bold flex flex-row gap-1 items-center">
            Inicio <MdKeyboardArrowRight color="black" />
          </span>
          {pathItems.map((item, index) => (
            <>
              {item.name}
              {index !== pathItems.length - 1 && (
                <MdKeyboardArrowRight color="black" />
              )}
            </>
          ))}
        </div>
        <div className="w-full my-10 border-b-2 border-[#D9D9D9]"></div>

        <div className="max-w-[95%] w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto grid grid-cols-4 xl:grid-cols-5 gap-3 2xl:gap-5">
          <div className="w-full flex flex-col gap-3 2xl:gap-5 capitalize">
            <Link href="/nosotros" className="text-xl 2xl:text-2xl font-bold">
              {translations[language].puquina_nosotros}
            </Link>
            <div className="w-full flex flex-col gap-3">
              <a href="/historia">
                {translations[language].footer_nuestra_historia}
              </a>
              <Link href="/nosotros">
                {translations[language].footer_consejo_directivo}
              </Link>
              <p>{translations[language].footer_consejo_directivo}</p>
              <p>{translations[language].footer_trabaja_con_nosotros}</p>
              <p>{translations[language].footer_promociones}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-xl 2xl:text-2xl font-bold">
              {translations[language].footer_eventos}
            </h1>
            <div className="w-full flex flex-col gap-3">
              <Link
                href={"https://acbt-ticketera.vercel.app/eventos/almuerzo-show"}
                target="_blank"
              >
                Almuerzo Show
              </Link>
              <Link
                href={
                  "https://acbt-ticketera.vercel.app/eventos/noche-de-folklore"
                }
                target="_blank"
              >
                Noches de Folklore
              </Link>
              <Link href={"/talleres"}>Talleres</Link>
              <Link href={"/eventos/culturales"}>
                {translations[language].footer_eventos_culturales}
              </Link>
              <Link href="/eventos/externos">
                {translations[language].footer_eventos_externos}
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-xl 2xl:text-2xl font-bold">
              {translations[language].footer_cultural}
            </h1>
            <div className="w-full flex flex-col gap-3">
              <p>{translations[language].footer_agenda_cultural}</p>
              <p>{translations[language].footer_revista_brisas}</p>
              <p>{translations[language].footer_noticias}</p>
              <p>{translations[language].footer_estudiantina}</p>
              <p>{translations[language].footer_radio}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <Link
              href="/puquina-qocha"
              className="text-xl 2xl:text-2xl font-bold"
            >
              Puquina Q’ocha
            </Link>
            <div className="w-full flex flex-col gap-3">
              <a href="/puquina-qocha#carta_digital">
                {translations[language].footer_puquina_carta_digital}
              </a>
              <Link
                href={
                  "https://drive.google.com/file/d/155FCBm7fASrwjYI8WUQ9CvDoOAvKuZ8z/view?usp=drive_link"
                }
                target="_blank"
              >
                {translations[language].footer_puquina_carta_cocteles}
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-xl 2xl:text-2xl font-bold">
              {translations[language].asociados}
            </h1>
            <div className="w-full flex flex-col gap-3">
              <p>{translations[language].footer_comunicados}</p>
              <p>{translations[language].footer_admisiones}</p>
              <p>{translations[language].footer_asambleas}</p>
              <p>{translations[language].footer_actas}</p>
              <p>{translations[language].footer_estados_financieros}</p>
            </div>
          </div>
        </div>

        <div className="w-full my-10 border-b-2 border-[#D9D9D9]"></div>

        <div className="max-w-[95%] w-[1080px] 2xl:w-full 2xl:max-w-screen-2xl mx-auto grid grid-cols-3 justify-between items-center">
          <Image
            unoptimized
            src="/assets/images/nav_logo_negro.png"
            alt="alt"
            width={0}
            height={0}
            className="w-[80%] h-auto"
          />
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-row gap-3 justify-center">
              <Link href={"https://www.facebook.com/BrisasdelTiticacaPeru"} target="_blank" className="w-fit p-2 h-full bg-black rounded-lg flex justify-center items-center text-xl">
                <FaFacebookF color="white" />
              </Link>
              <Link href={"https://www.instagram.com/brisasdeltiticaca/"} target="_blank" className="w-fit p-2 h-full bg-black rounded-lg flex justify-center items-center text-xl">
                <FaInstagram color="white" />
              </Link>
              <Link href={"https://www.youtube.com/@BrisasDelTiticacaOficial"} target="_blank" className="w-fit p-2 h-full bg-black rounded-lg flex justify-center items-center text-xl">
                <FaYoutube color="white" />
              </Link>
              <div className="w-fit p-2 h-full bg-black rounded-lg flex justify-center items-center text-xl">
                <FaWhatsapp color="white" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <p>eventos@brisasdeltiticaca.com</p>
              <p>ventas@brisasdeltiticaca.com</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 items-center">
            <p className="font-bold text-lg 2xl:text-2xl capitalize">
              {translations[language].contactanos}
            </p>
            <p className="text-sm">Jr. Héroes de Tarapacá 168</p>
            <div className="w-full flex flex-row justify-center gap-2 ">
              <p className="flex flex-row gap-1 items-center">
                <FaPhoneAlt /> 01-715 6960
              </p>
              <p className="flex flex-row gap-1 items-center">
                <FaPhoneAlt />
                01-715 6961
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 px-5 flex flex-col gap-5 md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="border-none font-bold">
              {translations[language].nosotros}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="w-full flex flex-col gap-5 pl-5">
                <a href="/historia">
                  {translations[language].footer_nuestra_historia}
                </a>
                <Link href="/nosotros">
                  {translations[language].footer_consejo_directivo}
                </Link>
                <p>{translations[language].footer_consejo_directivo}</p>
                <p>{translations[language].footer_trabaja_con_nosotros}</p>
                <p>{translations[language].footer_promociones}</p>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="border-none font-bold">
              {translations[language].eventos}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="w-full flex flex-col gap-5 pl-5">
                <Link
                  href={
                    "https://acbt-ticketera.vercel.app/eventos/almuerzo-show"
                  }
                  target="_blank"
                >
                  Almuerzo Show
                </Link>
                <Link
                  href={
                    "https://acbt-ticketera.vercel.app/eventos/noche-de-folklore"
                  }
                  target="_blank"
                >
                  Noches de Folklore
                </Link>
                <Link href={"/talleres"}>Talleres</Link>
                <Link href={"/eventos/culturales"}>
                  {translations[language].footer_eventos_culturales}
                </Link>
                <Link href="/eventos/externos">
                  {translations[language].footer_eventos_externos}
                </Link>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="border-none font-bold">
              {translations[language].cultural}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="w-full flex flex-col gap-5 pl-5">
                <p>{translations[language].footer_agenda_cultural}</p>
                <p>{translations[language].footer_revista_brisas}</p>
                <p>{translations[language].footer_noticias}</p>
                <p>{translations[language].footer_estudiantina}</p>
                <p>{translations[language].footer_radio}</p>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="border-none font-bold">
              Puquina Q’ocha
            </AccordionTrigger>
            <AccordionContent>
              <ul className="w-full flex flex-col gap-5 pl-5">
                <a href="/puquina-qocha#carta_digital">
                  {translations[language].footer_puquina_carta_digital}
                </a>
                <Link
                  href={
                    "https://drive.google.com/file/d/155FCBm7fASrwjYI8WUQ9CvDoOAvKuZ8z/view?usp=drive_link"
                  }
                  target="_blank"
                >
                  {translations[language].footer_puquina_carta_cocteles}
                </Link>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="border-none font-bold">
              {translations[language].asociados}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="w-full flex flex-col gap-5 pl-5">
                <p>{translations[language].footer_comunicados}</p>
                <p>{translations[language].footer_admisiones}</p>
                <p>{translations[language].footer_asambleas}</p>
                <p>{translations[language].footer_actas}</p>
                <p>{translations[language].footer_estados_financieros}</p>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="w-full flex flex-col gap-3 items-center">
          <Image
            unoptimized
            src="/assets/images/nav_logo_negro.png"
            alt="alt"
            width={0}
            height={0}
            className="w-[70%] h-auto"
          />

          <div className="w-full flex flex-row gap-3 justify-center">
            <Link
              href={"https://www.facebook.com/BrisasdelTiticacaPeru"}
              target="_blank"
              className="w-fit p-2 lg:p-0 lg:w-full h-full bg-black rounded-lg flex justify-center items-center"
            >
              <FaFacebookF color="white" size={25} />
            </Link>
            <Link
              href={"https://www.instagram.com/brisasdeltiticaca/"}
              target="_blank"
              className="w-fit p-2 lg:p-0 lg:w-full h-full bg-black rounded-lg flex justify-center items-center"
            >
              <FaInstagram color="white" size={25} />
            </Link>
            <Link
              href={"https://www.youtube.com/@BrisasDelTiticacaOficial"}
              target="_blank"
              className="w-fit p-2 lg:p-0 lg:w-full h-full bg-black rounded-lg flex justify-center items-center"
            >
              <FaYoutube color="white" size={25} />
            </Link>
            <div className="w-fit p-2 lg:p-0 lg:w-full h-full bg-black rounded-lg flex justify-center items-center">
              <FaWhatsapp color="white" size={25} />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 items-center">
            <p className="font-bold text-lg">
              {translations[language].contactanos}
            </p>
            <p className="text-sm">Jr. Héroes de Tarapacá 168</p>
            <div className="w-full flex flex-row justify-around text-sm">
              <p className="flex flex-row gap-1 items-center">
                <FaPhoneAlt /> 01-715 6960
              </p>
              <p className="flex flex-row gap-1 items-center">
                <FaPhoneAlt />
                01-715 6961
              </p>
            </div>
            <p className="text-sm">eventos@brisasdeltiticaca.com</p>
            <p className="text-sm">ventas@brisasdeltiticaca.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
