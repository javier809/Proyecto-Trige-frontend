export interface InterfaceTriaje {
  id?: number;
  paciente_id: number;
  personal_salud_id: number;
  recurso_hospitalario_id: number | null; // Añadir null como tipo válido
  fecha_hora: string;
  signos_vitales: {
    presion_arterial: string;
    frecuencia_cardiaca: number;
    temperatura: number;
    frecuencia_respiratoria: number;
    saturacion_oxigeno: number;
    glucosa: number;
  };
  sintomas: string[];
  prioridad: 'ROJO' | 'NARANJA' | 'AMARILLO' | 'VERDE' | 'AZUL';
  estado: 'EN_TRIAGE' | 'EN_ESPERA' | 'EN_ATENCION' | 'DERIVADO' | 'ALTA';
  created_at?: string;
  updated_at?: string;
}
  
  export interface TriajePayload {
    paciente_id: number;
    personal_salud_id: number;
    recurso_hospitalario_id: number;
    fecha_hora: string;
    signos_vitales: string; // JSON string
    sintomas: string; // JSON string
    prioridad: 'ROJO' | 'NARANJA' | 'AMARILLO' | 'VERDE' | 'AZUL';
    estado: 'EN_ESPERA' | 'EN_ATENCION' | 'ATENDIDO' | 'DERIVADO' | 'CANCELADO';
  }