'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaEdit } from "react-icons/fa";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { Checkbox } from "@/components/ui/checkbox"

import { toast } from "react-toastify";
import { Permiso, PermisosRole, RolesWithPermisos } from "@/app/(panel)/admin/models/Roles";

interface Props {
    rol: RolesWithPermisos;
    listPermisos: Permiso[];
    onClose: () => void;
}

export default function EditRoles({ rol, listPermisos, onClose }: Props) {

    const [open, setOpen] = useState(true);
    const [listRolesPermisos, setListRolesPermisos] = useState(rol.permisos_roles.map((permisos: PermisosRole) => permisos.idPermiso));
    const [nombre, setNombre] = useState<string>(rol.nombre)

    const token = getAuthTokenClient();

    const onSubmit = async () => {
        const dataJson = {
            nombre: nombre,
            id: rol.id,
            listpermisos: listRolesPermisos
        }

        const editUserToast = toast.loading('Actualizando...')

        const userUpdate = await fetch(`${API_URL}/roles/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataJson)
        })

        const data = await userUpdate.json()

        if (!userUpdate.ok) {
            toast.update(editUserToast, {
                render: 'Error al actualizar',
                isLoading: false,
                type: 'error',
                autoClose: 2000
            })
            return null;
        }

        toast.update(editUserToast, {
            render: 'Rol actualizado',
            isLoading: false,
            type: 'success',
            autoClose: 2000
        })

    }

    const closeDialog = (open: boolean) => {
        setOpen(open)
        onClose()
    }

    const rolCheckedChange = (permisoId: number) => {
        if (listRolesPermisos.includes(permisoId)) {
            const newListId = listRolesPermisos.filter(permiso => permiso !== permisoId);
            setListRolesPermisos(newListId);
        } else {
            const newListId = [...listRolesPermisos, permisoId];
            setListRolesPermisos(newListId);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
                <DialogTrigger>

                </DialogTrigger>
                <DialogContent className="dark text-white">
                    <DialogHeader>
                        <DialogTitle>Editar rol</DialogTitle>
                        <DialogDescription className="w-full flex flex-col pt-5 gap-5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="username">Nomnbre</Label>
                                <Input autoFocus type="text" id="username" value={nombre} onChange={(e: any) => setNombre(e.target.value)} />
                            </div>

                            <div className="flex flex-row flex-wrap gap-3">
                                {listPermisos.map((permiso: Permiso, index: number) => (
                                    <div className="flex items-center space-x-2" key={index}>
                                        <Checkbox id={permiso.nombre} checked={listRolesPermisos.includes(permiso.id)} onCheckedChange={() => rolCheckedChange(permiso.id)} />
                                        <label
                                            htmlFor={permiso.nombre}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {permiso.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={onSubmit}>Actualizar</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
