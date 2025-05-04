import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [DatePipe]
})
export class InicioComponent implements OnInit {
  usuarioEncontrado: Usuario | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {this.verificarSesion();}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    // Primero intentamos obtener el usuario del localStorage
    const usuarioGuardado = localStorage.getItem('currentUser');
    
    if (usuarioGuardado) {
      try {
        this.usuarioEncontrado = JSON.parse(usuarioGuardado);
        this.isLoading = false;
        return; // Salimos si encontramos el usuario en localStorage
      } catch (e) {
        console.error('Error al parsear usuario de localStorage:', e);
        // Continuamos con la carga desde API si hay error en el parseo
      }
    }

    // Si no hay usuario en localStorage, intentamos por ID de ruta
    const userId = this.route.snapshot.paramMap.get('id');
    
    if (!userId) {
      this.errorMessage = 'No se encontró sesión activa ni ID de usuario';
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.getUsuario(userId).subscribe({
      next: (usuario) => {
        this.usuarioEncontrado = usuario;
        localStorage.setItem('currentUser', JSON.stringify(usuario)); // Guardamos en localStorage
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        
        if (err.status === 401) {
          // No autorizado - redirigir a login
          this.errorMessage = 'Sesión expirada, por favor inicie sesión nuevamente';
          this.router.navigate(['/login']);
        } else if (err.status === 404) {
          this.errorMessage = `Usuario con ID ${userId} no encontrado`;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = 'Error al cargar datos del usuario. Por favor intente más tarde.';
          console.error('Error detallado:', err);
        }
      }
    });
  }

  formatearFecha(fecha: string | undefined): string {
    if (!fecha) return 'No disponible';
    return this.datePipe.transform(fecha, 'mediumDate') || 'Formato inválido';
  }
  verificarSesion(): void {
    const usuarioGuardado = localStorage.getItem('currentUser');
  
    if (!usuarioGuardado) {
      this.router.navigate(['/login']);
    }
  }
  
  cerrarSesion(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}