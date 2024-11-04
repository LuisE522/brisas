'use client'

import { Permiso, RolesWithPermisos } from '@/app/(panel)/admin/models/Roles'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Roles } from '@/app/(panel)/admin/models/Roles'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/const'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'
import { getAuthTokenClient } from '@/lib/getUserData'
import { useState } from 'react'
import EditRoles from './EditRoles'
import CreateRoles from './CreateRoles'
import { useRouter } from 'next/navigation'

interface Props {
    listRoles: RolesWithPermisos[];
    listPermisos: Permiso[]
}

export default function ListRoles({ listRoles, listPermisos }: Props) {

    const token = getAuthTokenClient();

    const [dialogInfo, setDialogInfo] = useState<RolesWithPermisos | null>(null)

    const [roles, setRoles] = useState<RolesWithPermisos[]>(listRoles)

    const showDialog = (index: number) => {
        setDialogInfo(roles[index])
    }

    const router = useRouter()

    const onDialogClose = () => {
        setDialogInfo(null)
        router.refresh()
    }

    const closeCreate = (newRol: RolesWithPermisos) => {

        setRoles(prevRoles => [...prevRoles, newRol])
    }

    return (
        <>
            <div className='w-full flex flex-col gap-5'>
                <div className='bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center'>
                    <h1 className='text-sm lg:text-xl'>Lista de todos los roles</h1>
                    <CreateRoles onClose={(newrol) => closeCreate(newrol)} />
                </div>

                <div className=' bg-black/40 px-5 py-3 rounded-lg '>
                    <Table className='w-full dark'>
                        <TableCaption>Lista de todos los roles</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-fit">ID</TableHead>
                                <TableHead className='text-xs lg:text-base'>Nombre</TableHead>
                                <TableHead className='text-xs lg:text-base'>N° Personas</TableHead>
                                <TableHead className='text-xs lg:text-base'>N° Permisos</TableHead>
                                <TableHead className='text-xs lg:text-base'>Accion</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((rol: RolesWithPermisos, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{rol.id}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{rol.nombre}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{rol._count.usuarios_roles}</TableCell>
                                    <TableCell className='text-xs lg:text-base'>{rol._count.permisos_roles}</TableCell>
                                    <TableCell className='text-xs lg:text-bas flex flex-row gap-3 items-center'>
                                        <FaEdit size={30} className='cursor-pointer' onClick={() => showDialog(index)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* <div className='w-full flex items-center justify-end gap-3'>
                        <Button className='bg-white/10' disabled={infoListUser.currentPage == 1} onClick={() => loadUser(infoListUser.currentPage - 1)} >Anterior</Button>
                        <div>{infoListUser.currentPage}</div>
                        <Button className='bg-white/10' disabled={infoListUser.totalPages == infoListUser.currentPage} onClick={() => loadUser(infoListUser.currentPage + 1)}>Siguiente</Button>
                    </div> */}

                </div>
            </div>

            {dialogInfo && (
                <EditRoles rol={dialogInfo} listPermisos={listPermisos} onClose={onDialogClose} />
            )}

        </>
    )
}
