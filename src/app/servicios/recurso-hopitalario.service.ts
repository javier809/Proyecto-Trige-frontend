import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterfaceRecursoHospitalario } from '../modelos/InterfaceRecursoHospitalario';

@Injectable({
  providedIn: 'root'
})
export class RecursoHospitalarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/recursos_hospitalarios';

  constructor(private http: HttpClient) {}

  /**
   * GET api/recursos_hospitalarios - Listar todos los recursos hospitalarios
   * @param params Parámetros opcionales para filtrar/buscar
   */
  getRecursos(params?: any): Observable<InterfaceRecursoHospitalario[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.get<InterfaceRecursoHospitalario[]>(this.apiUrl, { params: httpParams });
  }

  /**
   * POST api/recursos_hospitalarios - Crear un nuevo recurso hospitalario
   * @param recurso Datos del recurso hospitalario a crear
   */
  crearRecurso(recurso: InterfaceRecursoHospitalario): Observable<InterfaceRecursoHospitalario> {
    return this.http.post<InterfaceRecursoHospitalario>(this.apiUrl, recurso);
  }

  /**
   * GET api/recursos_hospitalarios/{id} - Obtener un recurso hospitalario específico
   * @param id ID del recurso hospitalario
   */
  getRecurso(id: number | string): Observable<InterfaceRecursoHospitalario> {
    return this.http.get<InterfaceRecursoHospitalario>(`${this.apiUrl}/${id}`);
  }

  /**
   * PUT|PATCH api/recursos_hospitalarios/{id} - Actualizar un recurso hospitalario
   * @param id ID del recurso hospitalario
   * @param recurso Datos actualizados del recurso
   */
  actualizarRecurso(id: number | string, recurso: Partial<InterfaceRecursoHospitalario>): Observable<InterfaceRecursoHospitalario> {
    return this.http.put<InterfaceRecursoHospitalario>(`${this.apiUrl}/${id}`, recurso);
  }

  /**
   * DELETE api/recursos_hospitalarios/{id} - Eliminar un recurso hospitalario
   * @param id ID del recurso hospitalario a eliminar
   */
  eliminarRecurso(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
