import ListDanzas from "@/components/Panel/Danzas/ListDanzas";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";

export default async function page() {
  const token = getAuthToken();

  const listDanzas = await fetch(`${API_URL}/danzas/listdanzasadmin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await listDanzas.json();

  /* console.log(res); */

  return (
    <div>
      <ListDanzas danzas={res} />
    </div>
  );
}
