'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCircleXmark } from "react-icons/fa6";

// Variable global para controlar la visibilidad del modal
let hasShownModal = false;

export default function PopUp() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
        hasShownModal = true; // Marcar como mostrado
    };

    useEffect(() => {
        // Abrir el modal solo si no se ha mostrado antes
        if (!hasShownModal) {
            setIsOpen(true);
        }

        // Controlar el overflow del body
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto'; // Restaurar al desmontar el componente
        };
    }, [isOpen]);

    return (
        <div>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-70 z-50" />
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className='w-[95%] max-w-[500px] 2xl:max-w-[800px] h-auto relative'>
                            <Image unoptimized src={'/assets/images/popup/popup2.png'} alt='popup' width={0} height={0} className='w-full h-auto ' />
                            <FaCircleXmark onClick={closeModal} className='mt-4 text-white rounded absolute top-px right-4 cursor-pointer text-xl 2xl:text-4xl' />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
