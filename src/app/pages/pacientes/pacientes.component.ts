// pacientes.component.ts
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacientesService } from '../../servicios/pacientes.service';
import { InterfacePaciente } from '../../modelos/InterfacePaciente';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  paciente: InterfacePaciente = {
    documento_identidad: '',
    fecha_nacimiento: '',
    genero: 'masculino',
    alergias: [],
    contacto_emergencia: ''
  };
  nuevaAlergia: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private pacientesService: PacientesService,
    private router: Router
  ) {this.verificarSesion();}

  agregarAlergia(): void {
    if (this.nuevaAlergia.trim()) {
      this.paciente.alergias.push(this.nuevaAlergia.trim());
      this.nuevaAlergia = '';
    }
  }

  eliminarAlergia(index: number): void {
    this.paciente.alergias.splice(index, 1);
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
  onSubmit(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    this.pacientesService.crearPaciente(this.paciente).subscribe({
      next: (response) => {
        this.mensajeExito = 'Paciente creado exitosamente';
        
        // Resetear formulario
        this.paciente = {
          documento_identidad: '',
          fecha_nacimiento: '',
          genero: 'masculino',
          alergias: [],
          contacto_emergencia: '',
          
        };
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.mensajeError = 'Error al crear paciente: ' + (err.error?.message || err.message);
      }
    });
  }
}