'use client'

import { ListUsers, ListUsersPagination } from '@/app/(panel)/admin/models/Usuarios'
import React, { useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EditUser from './EditUser'
import { Roles } from '@/app/(panel)/admin/models/Roles'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/const'
import { getAuthTokenClient } from '../../../lib/getUserData';
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import CreateUser from './CreateUser'

interface Props {
    list: ListUsersPagination
    listRoles: Roles[]
}

export default function ListUser({ list, listRoles }: Props) {

    const token = getAuthTokenClient();

    const [infoListUser, setInfoListUser] = useState(list)
    const [listUser, setListUser] = useState(list.users)

    const [dialogInfo, setDialogInfo] = useState<ListUsers | null>(null)

    const loadUser = async (page: number) => {
        const url = `${API_URL}/auth/listuserPage?page=${page}`

        const loadUserToast = toast.loading('Cargando...')

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            const data = await response.json()

            if (!response.ok) {
                toast.update(loadUserToast, {
                    render: 'Error en el servidor',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000
                })

                return null;
            }
            setListUser(data.users)
            setInfoListUser(data)

            toast.update(loadUserToast, {
                render: 'Usuarios cargados.',
                type: 'success',
                isLoading: false,
                autoClose: 1000
            })
            /* console.log(infoListUser) */
        } catch (err) {
            toast.update(loadUserToast, {
                render: 'Error en el servidor',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
        }
    }

    const showDialog = (index: number) => {

        setDialogInfo(listUser[index])
    }

    const onDialogClose = () => {
        setDialogInfo(null)
    }

    const closeCreate = (newUser: ListUsers) => {
        setListUser(prevUsers => [...prevUsers, newUser])
    }

    return (
        <>
            <div className='w-full flex flex-col gap-5'>
                <div className='bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center'>
                    <h1 className='text-sm lg:text-xl'>Lista de todos los usuarios</h1>
                    <CreateUser onClose={(newUser) => closeCreate(newUser)} />
                </div>

                <div className=' bg-black/40 px-5 py-3 rounded-lg'>
                    <Table className='w-full dark'>
                        <TableCaption>Lista de todos los usuarios</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-fit">ID</TableHead>
                                <TableHead className='text-xs lg:text-base'>DNI</TableHead>
                                <TableHead className='text-xs lg:text-base'>Email</TableHead>
                                <TableHead className='text-xs lg:text-base'>Username</TableHead>
                                <TableHead className='text-xs lg:text-base'>Accion</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listUser.map((user: ListUsers, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{user.dni}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{user.email}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{user.username}</TableCell>
                                    <TableCell className='text-xs lg:text-base flex flex-row gap-3 items-center'>
                                        <FaEdit size={30} className='cursor-pointer' onClick={() => showDialog(index)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className='w-full flex items-center justify-end gap-3'>
                        <Button className='bg-white/10' disabled={infoListUser.currentPage == 1} onClick={() => loadUser(infoListUser.currentPage - 1)} >Anterior</Button>
                        <div>{infoListUser.currentPage}</div>
                        <Button className='bg-white/10' disabled={infoListUser.totalPages == infoListUser.currentPage} onClick={() => loadUser(infoListUser.currentPage + 1)}>Siguiente</Button>
                    </div>

                </div>
            </div>

            {dialogInfo && (
                <EditUser usuario={dialogInfo} listRoles={listRoles} onClose={onDialogClose} />
            )}

        </>
    )
}
