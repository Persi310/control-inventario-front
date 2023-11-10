export interface Usuarios {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
    direccion: string;
    telefono: string;
    password: string;
    nombre_empresa: string;
    is_superuser: boolean;
    is_active: boolean;
    is_staff: boolean;
}
