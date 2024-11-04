import { UsuariosRoles } from "@/app/(panel)/admin/models/Usuarios";

export interface I_UserData {
    data: {
        username: string,
        email: string,
        create_time: Date,
        dni: string,
        id: number,
        razon_social: string;
        usuarios_roles: UsuariosRoles[]
    },
    iat: number,
    exp: number

}