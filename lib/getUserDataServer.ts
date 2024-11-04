import { API_URL } from "@/const";
import { cookies } from "next/headers";

// getUserData.ts
export async function getUserDataServer() {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get("auth_token");

    if(token) {
      const response = await fetch(`${API_URL}/auth/session`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token?.value}`,
        },
        credentials: 'include',
      });
      
      const data = await response.json();

      if (!response.ok) {
        console.error('Error:', data);

        return null;
      }
      
      return data;
    }
    else{
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la información:', error);
    return null;
  }
}

export function getAuthToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");

  if (!token) return null;
  
  return token.value

}