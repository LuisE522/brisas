'use client'

import Image from "next/image";

export default function NavOnlyLogo() {

    return (
        <div className="w-full mx-auto relative"> {/* max-w-[1280px] */}
            <div className="w-full flex justify-center h-[124px] items-center">                
                <Image unoptimized src={`/assets/images/logo_CFA_Brisas_Vertical.png`} width={0} height={0} alt="Logo" className="h-[120px] w-auto " />
                <Image unoptimized src={`/assets/images/nav_logo.png`} width={0} height={0} alt="Logo" className="h-[120px] w-auto " />
                <Image unoptimized src={`/assets/images/logo nav_Puquina_Qocha.png`} width={0} height={0} alt="Logo" className="h-[120px] w-auto " />
            </div>
            {/* <div className="w-full flex justify-center items-center md:absolute">
                <Image unoptimized src={`/assets/images/texto_home.png`} width={0} height={0} alt="Logo" className="h-[100px] w-auto " />                
            </div> */}
        </div>
    )
}
