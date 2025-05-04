import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    // Validación básica de campos
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese ambos campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.email,
      contraseña: this.password
    };

    this.usuarioService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.usuario) {
          // Guardar datos de usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.usuario));
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
          
          // Redirigir según el rol del usuario
          this.redirectByRole(response.usuario.rol);
        } else {
          this.errorMessage = response.message || 'Credenciales incorrectas';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Error al conectar con el servidor';
        console.error('Error en login:', err);
      }
    });
  }

  private redirectByRole(rol: string): void {
    switch(rol) {
      case 'ADMINISTRADOR':
        this.router.navigate(['/inicio']);
        break;
      case 'MEDICO':
        this.router.navigate(['/inicio']);
        break;
      case 'ENFERMERO':
        this.router.navigate(['/inicio']);
        break;
      default:
        this.router.navigate(['/inicio']);
    }
  }
}