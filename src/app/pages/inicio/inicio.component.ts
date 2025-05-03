import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'; // Importamos DatePipe para formatear fechas

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [DatePipe] // Proveemos DatePipe para usarlo en el componente
})
export class InicioComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioEncontrado: Usuario | null = null; // Mejor usar null para estado inicial
  isLoading: boolean = true; // Para manejar estado de carga
  errorMessage: string | null = null; // Para mostrar mensajes de error
  
  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe // Inyectamos DatePipe
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    const userId = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', userId);

    if (!userId) {
      this.errorMessage = 'No se proporcionó ID de usuario';
      this.isLoading = false;
      return;
    }

    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuarioEncontrado = this.usuarios.find(u => u.id === +userId) || null;
        
        if (!this.usuarioEncontrado) {
          this.errorMessage = `No se encontró usuario con ID: ${userId}`;
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        
        if (err.status === 200 && typeof err.error === 'string' && err.error.startsWith('<!DOCTYPE html>')) {
          this.errorMessage = "Error: La API está devolviendo HTML. Verifica si el backend está corriendo";
        } else {
          this.errorMessage = 'Error al cargar usuarios. Por favor intente más tarde.';
          console.error('Error detallado:', err);
        }
        
        setTimeout(() => {
          this.router.navigate(['/error'], { 
            state: { error: this.errorMessage } 
          });
        }, 3000);
      }
    });
  }

  // Función para formatear fechas
  formatearFecha(fecha: string | undefined): string {
    if (!fecha) return 'No disponible';
    return this.datePipe.transform(fecha, 'mediumDate') || 'Formato inválido';
  }

  cerrarSesion(): void {
    // Lógica para cerrar sesión
    this.router.navigate(['/login']);
  }
}