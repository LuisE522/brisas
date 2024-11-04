import EventosCulturales from "@/components/Panel/Eventos/Culturales/EventosCulturales";
import EventoInfo from "@/components/Panel/Eventos/EventoInfo";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";

export default async function EventosCulturalesPage() {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/eventos-culturales/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const res = await response.json();

  return (
    <>
      <EventosCulturales cultural={res} />
    </>
  );
}
