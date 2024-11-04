'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoIosCreate } from "react-icons/io";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";
import { Checkbox } from "@/components/ui/checkbox"

import { toast } from "react-toastify";
import { RolesWithPermisos } from "@/app/(panel)/admin/models/Roles";

interface Props {
    onClose: (newRol:RolesWithPermisos) => void;
}

export default function CreateRoles({onClose}: Props ) {

    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState<string>('')

    const token = getAuthTokenClient();

    const onSubmit = async () => {
        console.log(nombre)

        const dataJson = {
            nombre: nombre,
        }

        const editUserToast = toast.loading('Actualizando...')

        const rolCreate = await fetch(`${API_URL}/roles/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataJson)
        })

        const data = await rolCreate.json()

        if (!rolCreate.ok) {
            toast.update(editUserToast, {
                render: 'Error al crear',
                isLoading: false,
                type: 'error',
                autoClose: 2000
            })
            return null;
        }

        toast.update(editUserToast, {
            render: 'Rol creado',
            isLoading: false,
            type: 'success',
            autoClose: 2000
        })

        onClose(data)
        closeDialog(false)
    }

    const closeDialog = (open: boolean) => {
        setOpen(open)
        setNombre('')
    }

    return (
        <>
            <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
                <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl">
                    <IoIosCreate /> Crear rol
                </DialogTrigger>
                <DialogContent className="dark text-white">
                    <DialogHeader>
                        <DialogTitle>Crear rol</DialogTitle>
                        <DialogDescription className="w-full flex flex-col pt-5 gap-5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="username">Nombre</Label>
                                <Input autoFocus type="text" id="username" value={nombre} onChange={(e: any) => setNombre(e.target.value)} />
                            </div>

                            <Button onClick={onSubmit}>Crear</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
