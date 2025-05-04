
export interface InterfacePaciente {
  id?: number;
  documento_identidad: string;
  fecha_nacimiento: string;
  genero: 'masculino' | 'femenino' | 'otro';
  alergias: string[]; // Seguimos trabajando con array en el front
  contacto_emergencia: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}

// Interface para el payload que se envía al backend
export interface PacientePayload {
  documento_identidad: string;
  fecha_nacimiento: string;
  genero: 'masculino' | 'femenino' | 'otro';
  alergias: string; // String JSON para el backend
  contacto_emergencia: string;
}