export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    contraseña: string;
    telefono?: string;
    rol: 'ADMINISTRADOR' | 'ENFERMERO' | 'MEDICO';
    created_at?: string;
    updated_at?: string;
  }
