import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';

// Interface para las credenciales de login
interface LoginCredentials {
  email: string;
  contraseña: string;
}

// Interface para la respuesta del login
interface AuthResponse {
  usuario?: Usuario;
  token?: string;
  message?: string;
  success?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuarios';
  //private apiUrl = 'https://a9c2-2800-cd0-5421-6a00-acd5-a383-ce83-24ad.ngrok-free.app/api/usuarios';

  constructor(private http: HttpClient) {}

  // Método para inicio de sesión
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  // GET api/usuarios - Listar todos los usuarios
  getUsuarios(params?: any): Observable<Usuario[]> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }

    return this.http.get<Usuario[]>(this.apiUrl, { params: httpParams });
  }

  // POST api/usuarios - Crear un nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // GET api/usuarios/{usuario} - Obtener un usuario específico
  getUsuario(id: number | string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // PUT|PATCH api/usuarios/{usuario} - Actualizar un usuario
  actualizarUsuario(id: number | string, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE api/usuarios/{usuario} - Eliminar un usuario
  eliminarUsuario(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}