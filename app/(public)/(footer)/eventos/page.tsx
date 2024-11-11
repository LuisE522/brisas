import ListEventos from '@/components/Evento/ListEventos';
import { API_URL } from '@/const';
import { getAuthToken } from '@/lib/getUserDataServer';
import React from 'react'

export default async function EventosPage() {

    const token = getAuthToken();

    const response = await fetch(`${API_URL}/eventosjoinuss/list/filter`, {
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
            <ListEventos eventos={res} />
        </>
    )
}
