import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(date: string) {
  const fecha = new Date(date); // Esto es correcto, pero se ajusta a la zona horaria local

  // Aumentar 5 horas
  fecha.setHours(fecha.getHours() + 5); // Sumamos 5 horas a la fecha original

  console.log("Fecha después de agregar 5 horas:", fecha);

  // Convertir la fecha a UTC (si es necesario) para mostrarla sin el ajuste de zona horaria local
  const año = fecha.getUTCFullYear();
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() devuelve 0 para enero
  const dia = String(fecha.getUTCDate()).padStart(2, "0"); // getUTCDate() devuelve el día en UTC

  // Formateamos la fecha como YYYY-MM-DD
  const fechaFormateada = `${año}-${mes}-${dia}`;

  return fechaFormateada;
}

export async function revalidar(tag: string) {
  await fetch(`/api/revalidar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tag,
    }),
  });
}

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase() // Convierte a minúsculas
    .trim() // Elimina espacios al principio y al final
    .replace(/[\s]+/g, "-") // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, "") // Elimina caracteres no alfanuméricos
    .replace(/\-\-+/g, "-") // Reemplaza múltiples guiones con uno solo
    .replace(/^-+/, "") // Elimina guiones al principio
    .replace(/-+$/, ""); // Elimina guiones al final
};

export const tipo_eventos = [
  {
    id: 1,
    nombre: "Nuestros eventos",
  },
  {
    id: 2,
    nombre: "Eventos externos",
  },
];
