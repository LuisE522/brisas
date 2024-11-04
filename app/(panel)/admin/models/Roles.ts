export interface Roles {
    id: number;
    nombre: string;
}

export interface RolesWithPermisos extends Roles {
    permisos_roles: PermisosRole[];
    _count:         Count;
}

export interface Count {
    permisos_roles: number;
    usuarios_roles: number;
}

export interface PermisosRole {
    id:        number;
    idRol:     number;
    idPermiso: number;
    permiso:   Permiso;
}

export interface Permiso {
    id:     number;
    nombre: string;
}