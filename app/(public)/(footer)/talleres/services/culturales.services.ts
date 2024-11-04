import { API_URL } from "@/const";



export const getTalleres = async (): Promise<any> => {
    const url = API_URL + "/talleres/list";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 604800, // Una semana
                tags: [`talleres`]
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch getTalleres');
        }

        return await response.json()
    } catch (error) {
        console.log("Error en getTalleres: ", error);
        return null;
    }
}