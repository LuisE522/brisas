'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/const"
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"

export default function Login() {

    const { register, handleSubmit } = useForm()

    const router = useRouter()

    const onSubmit = async (data: any) => {
        console.log(data)

        const loginToast = toast.loading('Iniciando...')

        const dataJson = {
            'email': data.email,
            'password': data.pass
        }

        try {
            const resLogin = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(dataJson)
            })

            const res = await resLogin.json()

            if (!resLogin.ok) {
                toast.update(loginToast, {
                    render: 'Datos incorrectos',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000
                })
                return null;
            }

            setCookie('auth_token', res.token, { maxAge: 3600 })
            toast.update(loginToast, {
                render: 'Inicio de sesion correctamente',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })

            router.push('/admin')
        } catch (error: any) {
            toast.update(loginToast, {
                render: 'Problemas en el servidor',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            })
        }


    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[90%] mx-auto flex flex-col gap-5">

                <div className="grid w-full items-center gap-1.5">
                    <Label className="text-white" htmlFor="email">Email</Label>
                    <Input className="bg-white" type="email" placeholder="Email" id="email" {...register('email', { required: true })} />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label className="text-white" htmlFor="password">Email</Label>
                    <Input className="bg-white" type="password" placeholder="******" id="password" {...register('pass', { required: true })} />
                </div>

                <Button variant="default" className="dark w-full bg-black hover:bg-black text-white">Iniciar</Button>
            </form>
        </>
    )
}
