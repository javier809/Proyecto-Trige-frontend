import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceTriaje, TriajePayload } from '../modelos/InterfaceTriage';

@Injectable({
  providedIn: 'root'
})
export class TriajeService {
  private apiUrl = 'http://127.0.0.1:8000/api/triajes';

  constructor(private http: HttpClient) { }

  // GET api/triajes - Listar todos
  getTriajes(): Observable<InterfaceTriaje[]> {
    return this.http.get<InterfaceTriaje[]>(this.apiUrl);
  }

  // POST api/triajes - Crear nuevo
  crearTriaje(triaje: InterfaceTriaje): Observable<InterfaceTriaje> {
    // Preparar el payload exactamente como lo espera Laravel
    const payload = {
      paciente_id: triaje.paciente_id,
      personal_salud_id: triaje.personal_salud_id,
      recurso_hospitalario_id: triaje.recurso_hospitalario_id || null, // Puede ser null
      fecha_hora: triaje.fecha_hora,
      signos_vitales: this.transformarSignosVitales(triaje.signos_vitales),
      sintomas: triaje.sintomas,
      prioridad: triaje.prioridad,
      estado: triaje.estado
    };

    return this.http.post<InterfaceTriaje>(this.apiUrl, payload);
  }

  private transformarSignosVitales(signos: any): any[] {
    // Convertimos el objeto de signos vitales en array de pares clave-valor
    return Object.entries(signos).map(([key, value]) => ({
      [key]: value
    }));
  }
  // GET api/triajes/{id} - Obtener uno
  getTriaje(id: number): Observable<InterfaceTriaje> {
    return this.http.get<InterfaceTriaje>(`${this.apiUrl}/${id}`);
  }

  // PUT api/triajes/{id} - Actualizar


  // DELETE api/triajes/{id} - Eliminar
  eliminarTriaje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}