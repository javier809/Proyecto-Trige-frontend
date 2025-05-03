import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario'; // 👈 Asegurate que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8000/api/usuarios';
  //private apiUrl = 'https://a9c2-2800-cd0-5421-6a00-acd5-a383-ce83-24ad.ngrok-free.app/api/usuarios';
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
