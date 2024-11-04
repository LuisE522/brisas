import { API_URL } from '@/const';
import { getCookie, hasCookie } from 'cookies-next';

export async function getUserData() {

    const token = hasCookie('auth_token') ? getCookie('auth_token') : null

    //console.log("Token: " + token)

    if (token) {
        const userData = await fetch(`${API_URL}/auth/session`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        }).catch((error) => {
            //console.error('Error fetching user data:', error);
            return null;
        });

        if (!userData) {
            //console.error('Failed to fetch user data:', userData);
            return null;
        }

        const data = await userData.json();

        if (data.errors) {
            //console.log("Error: " + data.errors)
            return null
        }

        //console.log("User data: ")
        //console.log(data)
        return data;
    }
    else {
        console.log("You are not logged in")
        return null
    }
}

export function getAuthTokenClient() {
    const token = hasCookie('auth_token') ? getCookie('auth_token') : null

    return token;
}