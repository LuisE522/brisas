import { useLanguage } from '@/context/LanguageProvider';
import React, { useState } from 'react'
import trs from "@/public/locales/translate.json";
import { API_URL } from '@/const';
import { toast } from 'react-toastify';

export default function ContactanosExternos() {
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
            type: "eventos_externos" //puquina
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
            <div className="w-full h-auto relative bg-black" id="consultar">
                <div className="max-w-[90%] w-[500px] md:w-[800px] lg:w-[900px] 2xl:w-full 2xl:max-w-screen-xl mx-auto py-20 grid lg:grid-cols-2 justify-center gap-10 lg:gap-28">
                    <div className="w-full flex flex-col gap-3 lg:gap-5 text-white">
                        <h1 className="text-2xl lg:text-4xl font-bold">
                            {translations[language].externos_contacto_titulo}
                        </h1>
                        <p className="text-xl 2xl:text-2xl">
                            {translations[language].externos_contacto_descripcion}
                        </p>
                    </div>
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
                </div>
            </div>
        </>
    )
}
