import ListUser from '@/components/Panel/User/ListUser';
import { API_URL } from '@/const'
import { getAuthToken } from '@/lib/getUserDataServer'
import React from 'react'

export default async function UsuariosPage() {

  const token = getAuthToken();

  const listUser = await fetch(`${API_URL}/auth/listuserPage`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  const data = await listUser.json()
  /* console.log(data) */
  if (!listUser.ok) {
    return (
      <>
        <h1>No tienes los permisos necesarios</h1>
      </>
    )
  }


  const listRoles = await fetch(`${API_URL}/auth/listroles`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  const dataRoles = await listRoles.json();
  console.log(dataRoles)

  return (
    <>
      <ListUser list={data} listRoles={dataRoles} />
    </>
  )
}
