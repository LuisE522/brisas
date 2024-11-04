import { API_URL } from "@/const";



export const getListfundadores = async (): Promise<any> => {
    const url = API_URL + "/fundadores/listfundadores";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 604800, // Una semana
                tags: [`listFundadores`]
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch getListfundadores');
        }

        return await response.json()
    } catch (error) {
        console.log("Error en getListfundadores: ", error);
        return null;
    }
}