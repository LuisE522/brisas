
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function NavFondo() {
    return (
        <>
            <div className="w-full h-[100px] grid grid-rows-[45px_auto] shadow-md shadow-black/50">
                <div className="w-full h-full flex flex-row gap-3 justify-between items-center bg-[#042D66] pl-10 pr-5 text-white text-sm">
                    <div className="flex flex-row gap-3 items-center">
                        <FaMapMarkerAlt />
                        <span>Jr. Héroes del Tarapacá 168</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-end">
                        <Link href={'#nosotros'} >Nosotros</Link>
                        <Link href={'#radio'} >Radio</Link>
                        <Link href={'#reservas'} >Reservas</Link>
                        <Link href={'#contactanos'} >Contáctanos</Link>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row gap-3 justify-between items-center bg-[#044495] pl-10 pr-5 py-2 text-white text-sm">
                    <div className="flex flex-row gap-3 items-center">
                        <Image unoptimized src={`/assets/images/nav_logo.png`} width={0} height={0} alt="Logo" className="h-[30px] w-auto " />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-end">
                        <Link href={'#eventos'} >Eventos</Link>
                        <Link href={'#promociones'} >Promociones</Link>
                        <Link href={'#cultural'} >Cultural</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
