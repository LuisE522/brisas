import Nuestros from '@/components/Panel/Evento/Nuestros/Nuestros';
import { API_URL } from '@/const';
import { getAuthToken } from '@/lib/getUserDataServer';
import React from 'react'

export default async function NuestrosEventosPage() {
    const token = getAuthToken();

    const response = await fetch(`${API_URL}/eventosjoinuss/list`, {
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
            <Nuestros eventos={res} />
        </>
    )
}
