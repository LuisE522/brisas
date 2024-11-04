'use client'

import { I_UserData } from '@/app/(auth)/models/User'
import { UsuariosRoles } from '@/app/(panel)/admin/models/Usuarios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { API_URL } from '@/const'
import { useUser } from '@/context/SessionProvider'
import { getAuthTokenClient } from '@/lib/getUserData'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function Profile() {

    const { userData: data, updateUserData } = useUser()
    const { register, handleSubmit } = useForm()

    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const token = getAuthTokenClient();

    const onSubmit = async (dataForm: any) => {
        const dataJson: any = {
            id: data?.data.id,
            password: dataForm.password,
            newPass: dataForm.newPass
        }

        const editUserToast = toast.loading('Actualizando contraseña...')

        const userUpdate = await fetch(`${API_URL}/auth/update`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(dataJson)
        })

        const dataRes = await userUpdate.json()

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
            render: 'Contraseña actualizado',
            isLoading: false,
            type: 'success',
            autoClose: 2000
        })

        setCurrentPass('')
        setNewPass('')
    }

    return (
        <>
            <div className='w-full flex flex-col gap-5'>
                <div className='bg-black/40 px-5 py-3 rounded-lg flex flex-row justify-between items-center'>
                    <h1 className='text-xl'>Editar perfil</h1>
                </div>

                <div className='w-full grid grid-cols-1 gap-3 lg:gap-0 lg:grid-cols-[24%_74%] justify-between'>
                    <div className='w-full flex flex-col gap-3 '>
                        <div className='w-full h-auto flex flex-col gap-3 justify-center items-center px-5 py-3 bg-black/40 rounded-lg'>
                            <Image unoptimized src={'https://krowdy.s3.amazonaws.com/company/logos/2022-03-16T16-05-42-722Zzona-punto-brisas-del-titicaca-logo.jpg'} width={0} height={0} alt ='profile' className='w-[150px] h-auto rounded-full aspect-square object-cover' />
                            <h1 className='text-center font-bold'>{data?.data.razon_social}</h1>
                        </div>
                        <div className='flex flex-col gap-2 relative text-xs sm:text-sm px-5 py-3 bg-black/40 rounded-lg'>
                            <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>DNI:</p>
                                <div className='flex flex-row flex-wrap gap-2'>
                                    {data?.data.dni}
                                </div>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>Username:</p>
                                <div className='flex flex-row flex-wrap gap-2'>
                                    {data?.data.username}
                                </div>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>Email:</p>
                                <div className='flex flex-row flex-wrap gap-2'>
                                    {data?.data.email}
                                </div>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <p className='font-semibold'>Roles:</p>
                                <div className='flex flex-row flex-wrap gap-2'>
                                    {data?.data.usuarios_roles.map((usarioRol: UsuariosRoles, index: number) => (
                                        <span>{usarioRol.rol.nombre}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-3 bg-black/40 px-5 py-3 rounded-lg'>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 dark">

                            <div className='flex flex-col sm:flex-row gap-3'>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-white" htmlFor="email">Contraseña actual</Label>
                                    <Input className="bg-white text-black" type="password" placeholder="******" id="email" {...register('password', {
                                        required: true,
                                        onChange(e) {
                                            setCurrentPass(e.target.value)
                                        }
                                    })} />
                                </div>

                                <div className="grid w-full items-center gap-1.5">
                                    <Label className="text-white" htmlFor="password">Nueva contraseña</Label>
                                    <Input className="bg-white text-black" type="password" placeholder="******" id="password" {...register('newPass', {
                                        required: true,
                                        onChange(e) {
                                            setNewPass(e.target.value)
                                        }
                                    })} />
                                </div>
                            </div>

                            <Button variant="default" className="dark w-full bg-black hover:bg-black text-white">Cambiar contraseña</Button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
