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
import { API_URL } from "@/const";
import { getAuthTokenClient } from "@/lib/getUserData";

import { toast } from "react-toastify";
import { ListUsers } from "@/app/(panel)/admin/models/Usuarios";

interface Props {
    onClose: (newRol: ListUsers) => void;
}

export default function CreateUser({ onClose }: Props) {

    const [open, setOpen] = useState(false);
    const [dni, setDni] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [razonSocial, setRazonSocial] = useState<string>('')

    const token = getAuthTokenClient();

    const onSubmit = async () => {

        const password = username;

        const dataJson = {
            username,
            password,
            dni,
            email,
            razon_social: razonSocial,
        }

        const createUserToast = toast.loading('Creando...')

        const userCreate = await fetch(`${API_URL}/auth/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataJson)
        })

        const data = await userCreate.json()

        if (!userCreate.ok) {
            toast.update(createUserToast, {
                render: data.message,
                isLoading: false,
                type: 'error',
                autoClose: 2000
            })
            return null;
        }

        toast.update(createUserToast, {
            render: data.response.message,
            isLoading: false,
            type: 'success',
            autoClose: 2000
        })

        onClose(data.result)
        closeDialog(false)
    }

    const closeDialog = (open: boolean) => {
        setOpen(open)
        setDni('')
        setUsername('')
        setEmail('')
        setRazonSocial('')
    }

    return (
        <>
            <Dialog open={open} onOpenChange={(open) => closeDialog(open)}>
                <DialogTrigger className="flex flex-row gap-1 items-center text-sm lg:text-xl">
                    <IoIosCreate /> Crear usuario
                </DialogTrigger>
                <DialogContent className="dark text-white">
                    <DialogHeader>
                        <DialogTitle>Crear usuario</DialogTitle>
                        <DialogDescription className="w-full flex flex-col pt-5 gap-5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="dni">DNI</Label>
                                <Input autoFocus type="text" id="dni" value={dni} onChange={(e: any) => setDni(e.target.value)} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="razonSocial">Razon Social</Label>
                                <Input type="text" id="razonSocial" value={razonSocial} onChange={(e: any) => setRazonSocial(e.target.value)} />
                            </div>

                            <Button onClick={onSubmit}>Crear</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}
