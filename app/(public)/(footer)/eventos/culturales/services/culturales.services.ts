import { API_URL } from "@/const";



export const getEventosCulturales = async (): Promise<any> => {
    const url = API_URL + "/eventos-culturales/list";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 604800, // Una semana
                tags: [`eventos-culturales`]
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch getEventosCulturales');
        }

        return await response.json()
    } catch (error) {
        console.log("Error en getEventosCulturales: ", error);
        return null;
    }
}