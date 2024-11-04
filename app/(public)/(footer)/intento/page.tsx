'use client'

import { useEffect, useState } from "react";

export default function Page() {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true)
    }, [])

    useEffect(() => {
        const parallaxContainer = document.getElementById('parallax-container');
        if (!parallaxContainer) return;
        const images = parallaxContainer.getElementsByTagName('img');

        const handleMouseMove = (e: any) => {
            const { clientX: mouseX, clientY: mouseY } = e;
            const { innerWidth: width, innerHeight: height } = window;




            const speedFactors = [0.5, 1, 1.5, 2, 3]; // Velocidades diferentes para cada imagen
            const rotationFactors = [10, 10, 30, 30, 30]; // Velocidades diferentes para cada imagen
            const posFactors = [20, 60, 90, 100, 220]; // Velocidades diferentes para cada imagen

            Array.from(images).forEach((img, index) => {
                // Calcular el ángulo de rotación basado en la posición del mouse
                const rotateX = ((mouseY / height) * rotationFactors[index] - 10); // Rango de -10 a 10
                const rotateY = ((mouseX / width) * rotationFactors[index] - 10); // Rango de -10 a 10
                const speed = speedFactors[index] || 1;
                const scale = 130;

                const xPos = (mouseX / width) * posFactors[index] - 10; // Ajusta el rango
                const yPos = (mouseY / height) * posFactors[index] - 10; // Ajusta el rango

                // Aplicar transformaciones
                img.style.transform = `translate(${xPos / speed}px, ${yPos / speed}px) scale(${scale}%)`;
                img.style.transitionDuration = '0ms'
            });
        };

        parallaxContainer.addEventListener('mousemove', handleMouseMove);

        return () => {
            parallaxContainer.removeEventListener('mousemove', handleMouseMove);
        };
    });



    return (
        <div className="h-screen w-full bg-slate-900 overflow-hidden relative" id="parallax-container">
            <img src="/assets/images/fondo_animado/1.png" alt="" className={`w-full h-full object-cover ${load == false ? 'transition-transform  duration-1000 scale-[200%]' : 'transition-transform  duration-1000 scale-110'} absolute -top-10 md:-top-36`} />
            <img src="/assets/images/fondo_animado/2.png" alt="" className={`w-full object-cover ${load == false ? 'transition-transform  duration-1000 scale-[200%]' : 'transition-transform  duration-1000 scale-110'} absolute -bottom-0 left-0`} />
            <img src="/assets/images/fondo_animado/3.png" alt="" className={`w-full object-cover ${load == false ? 'transition-transform  duration-1000 scale-[200%]' : 'transition-transform  duration-1000 scale-110'} absolute -bottom-0 left-0`} />
            <img src="/assets/images/fondo_animado/4.png" alt="" className={`w-full object-cover ${load == false ? 'transition-transform  duration-1000 scale-[200%]' : 'transition-transform  duration-1000 scale-110'} absolute -bottom-0 left-0`} />
            <img src="/assets/images/fondo_animado/5.png" alt="" className={`w-full object-cover ${load == false ? 'transition-transform  duration-1000 scale-[200%]' : 'transition-transform  duration-1000 scale-110'} absolute -bottom-0 left-0`} />
        </div>
    );
}
