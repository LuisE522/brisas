import ListRoles from '@/components/Panel/Roles/ListRoles';
import { API_URL } from '@/const'
import { getAuthToken } from '@/lib/getUserDataServer'
import React from 'react'

export default async function RolesPage() {

  const token = getAuthToken();

  const responseRoles = await fetch(`${API_URL}/roles/listroles`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  const listRoles = await responseRoles.json()
  /* console.log(listRoles) */
  if (!responseRoles.ok) {
    return (
      <>
        <h1>No tienes los permisos necesarios</h1>
      </>
    )
  }

  const responsePermisos = await fetch(`${API_URL}/permisos/listpermisos`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  const listPermisos = await responsePermisos.json()

  return (
    <>
      <ListRoles listRoles={listRoles} listPermisos={listPermisos} />
    </>
  )
}
