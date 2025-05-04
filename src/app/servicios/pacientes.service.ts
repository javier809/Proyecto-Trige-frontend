import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfacePaciente } from '../modelos/InterfacePaciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl = 'http://127.0.0.1:8000/api/pacientes';
  // Si necesitas usar ngrok como en tu ejemplo:
  // private apiUrl = 'https://xxxx-xxxx-xxxx.ngrok-free.app/api/pacientes';

  constructor(private http: HttpClient) { }

  /**
   * GET api/pacientes - Listar todos los pacientes
   * @param params Parámetros opcionales para filtrar/buscar
   */
  getPacientes(params?: any): Observable<InterfacePaciente[]> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.get<InterfacePaciente[]>(this.apiUrl, { params: httpParams });
  }

  /**
   * POST api/pacientes - Crear un nuevo paciente
   * @param paciente Datos del paciente a crear
   */
  crearPaciente(paciente: InterfacePaciente): Observable<InterfacePaciente> {
    // Convertir el array de alergias a string JSON
    const pacienteParaEnviar = {
      ...paciente,
      alergias: JSON.stringify(paciente.alergias)
    };
    
    return this.http.post<InterfacePaciente>(this.apiUrl, pacienteParaEnviar);
  }
  /**
   * GET api/pacientes/{paciente} - Obtener un paciente específico
   * @param id ID del paciente a obtener
   */
  getPaciente(id: number | string): Observable<InterfacePaciente> {
    return this.http.get<InterfacePaciente>(`${this.apiUrl}/${id}`);
  }

  /**
   * PUT|PATCH api/pacientes/{paciente} - Actualizar un paciente
   * @param id ID del paciente a actualizar
   * @param paciente Datos actualizados del paciente
   */
  actualizarPaciente(id: number | string, paciente: Partial<InterfacePaciente>): Observable<InterfacePaciente> {
    return this.http.put<InterfacePaciente>(`${this.apiUrl}/${id}`, paciente);
  }

  /**
   * DELETE api/pacientes/{paciente} - Eliminar un paciente
   * @param id ID del paciente a eliminar
   */
  eliminarPaciente(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}