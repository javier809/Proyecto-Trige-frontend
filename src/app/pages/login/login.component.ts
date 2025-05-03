import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuarios: Usuario[] = [];
  email: string = '';
  password: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', data);
      },
      error: (err) => {
        if (err.status === 200 && typeof err.error === 'string' && err.error.startsWith('<!DOCTYPE html>')) {
          console.error("Error: La API está devolviendo HTML en lugar de JSON. ¿El backend está corriendo?");
        } else {
          console.error('Error al cargar usuarios:', err);
        }
      }
    });
  }
  
  iniciarSesion(): void {
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.email === this.email && u.contraseña === this.password
    );

    if (usuarioEncontrado) {
      console.log('Usuario accedió:', usuarioEncontrado);
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}
