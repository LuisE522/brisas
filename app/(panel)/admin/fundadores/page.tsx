import ListFundadores from "@/components/Panel/Fundadores/ListFundadores";
import { API_URL } from "@/const";
import { getAuthToken } from "@/lib/getUserDataServer";

export default async function page() {
  const token = getAuthToken();

  const listFundadores = await fetch(`${API_URL}/fundadores/listfundadoresadmin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await listFundadores.json();

  /* console.log(res); */

  return (
    <div>
      <ListFundadores fundadores={res} />
    </div>
  );
}
