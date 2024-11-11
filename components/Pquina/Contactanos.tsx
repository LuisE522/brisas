"use client";
import { useLanguage } from "@/context/LanguageProvider";
import React, { useState } from "react";
import trs from "@/public/locales/translate.json";
import { API_URL } from "@/const";
import { toast } from "react-toastify";

export default function Contactanos() {
  const { language } = useLanguage();
  const translations = trs as any;

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [mensaje, setMensaje] = useState('');

  const sendCorreo = async () => {

    const mesg = `<b>Nombre: </b>${nombre}<br/><b>Correo: </b>${correo}<br/><b>Celular: </b>${celular}<br/><b>Mensaje: </b>${mensaje}`

    const dataJsosn = {
      subjectSend: "Mensaje desde Puquina Q'ocha",
      messageSend: mesg,
      type: "puquina" //eventos_externos
    }

    const send = await fetch(`${API_URL}/sendemails/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJsosn),
    });

    const res = await send.json();

    if (!send.ok) {
      toast.error("Error al enviar el correo.")
      return null;
    }

    toast.success("Correo enviado correctamente.")
    setNombre('');
    setCorreo('');
    setCelular('');
    setMensaje('');
  }

  return (
    <>
      <div
        className="max-w-[95%] mx-auto w-[800px] 2xl:w-full 2xl:max-w-screen-2xl py-10 lg:py-20 h-full flex flex-col-reverse lg:flex-row gap-10 justify-center"
        id="contactanos"
      >
        <div className="w-full flex flex-col gap-3 px-7 lg:p-0">
          <h1 className="text-[#949393] font-bold text-xl 2xl:text-4xl uppercase">
            {translations[language].contactanos}
          </h1>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full bg-[#DAD9D9] px-3 2xl:px-5 py-2 2xl:py-4 outline-none rounded-lg"
            value={nombre} onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Correo"
            className="w-full bg-[#DAD9D9] px-3 2xl:px-5 py-2 2xl:py-4 outline-none rounded-lg"
            value={correo} onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Celular"
            className="w-full bg-[#DAD9D9] px-3 2xl:px-5 py-2 2xl:py-4 outline-none rounded-lg"
            value={celular} onChange={(e) => setCelular(e.target.value)}
          />
          <textarea
            rows={7}
            placeholder="Mensaje"
            className="w-full bg-[#DAD9D9] px-3 2xl:px-5 py-2 2xl:py-4 outline-none rounded-lg"
            value={mensaje} onChange={(e) => setMensaje(e.target.value)}
          />
          <input
            type="button"
            value="Enviar"
            className="bg-[#FF9900] text-white px-3 2xl:px-5 py-2 2xl:py-4 rounded-lg cursor-pointer"
            onClick={sendCorreo}
          />
        </div>
        <div className="w-full flex flex-col gap-5 p-7 lg:p-4 border-2 border-[#DAD9D9] rounded-2xl text-[#949393]">
          <h1 className="font-bold text-xl 2xl:text-4xl uppercase">
            {translations[language].puquina_hora_atencion}
          </h1>
          <p className="text-sm lg:text-xl 2xl:text-2xl">
            {translations[language].puquina_hora_atencion_p1}
            <br />
            {translations[language].puquina_hora_atencion_p2}
          </p>
          <p className="text-sm lg:text-xl">
            {translations[language].puquina_hora_atencion_p3}
          </p>
        </div>
      </div>
    </>
  );
}
