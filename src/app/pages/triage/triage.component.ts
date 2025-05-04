// triage.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TriajeService } from '../../servicios/triage.service';
import { InterfaceTriaje } from '../../modelos/InterfaceTriage';
import { Router } from '@angular/router';
import { PacientesService } from '../../servicios/pacientes.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { RecursoHospitalarioService } from '../../servicios/recurso-hopitalario.service';

@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.css']
})
export class TriageComponent implements OnInit {
  triaje: InterfaceTriaje = {
    paciente_id: 0,
    personal_salud_id: 0,
    recurso_hospitalario_id: 0,
    fecha_hora: new Date().toISOString().slice(0, 16),
    signos_vitales: {
      presion_arterial: '',
      frecuencia_cardiaca: 0,
      temperatura: 0,
      frecuencia_respiratoria: 0,
      saturacion_oxigeno: 0,
      glucosa: 0
    },
    sintomas: [],
    prioridad: 'AMARILLO',
    estado: 'EN_ESPERA'
  };
  
  // Datos para los selectores
  pacientes: any[] = [];
  personalSalud: any[] = [];
  recursosHospitalarios: any[] = [];
  
  nuevoSintoma: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  cargando: boolean = true;

  constructor(
    private triajeService: TriajeService,
    private pacientesService: PacientesService,
    private usuarioService: UsuarioService,
    private recursoService: RecursoHospitalarioService,
    private router: Router
  ) {this.verificarSesion();}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.cargando = true;
    
    // Cargar pacientes
    this.pacientesService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.verificarCargaCompleta();
      },
      error: (err) => {
        console.error('Error al cargar pacientes:', err);
        this.verificarCargaCompleta();
      }
    });

    // Cargar personal de salud (filtrando por rol si es necesario)
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        // Filtrar solo personal de salud (ajusta según tu lógica)
        this.personalSalud = usuarios.filter(u => u.rol === 'MEDICO' || u.rol === 'ADMINISTRADOR');
        this.verificarCargaCompleta();
      },
      error: (err) => {
        console.error('Error al cargar personal de salud:', err);
        this.verificarCargaCompleta();
      }
    });

    // Cargar recursos hospitalarios
    this.recursoService.getRecursos().subscribe({
      next: (recursos) => {
        this.recursosHospitalarios = recursos;
        this.verificarCargaCompleta();
      },
      error: (err) => {
        console.error('Error al cargar recursos hospitalarios:', err);
        this.verificarCargaCompleta();
      }
    });
  }

  verificarCargaCompleta(): void {
    // Verificar que todas las peticiones hayan terminado (éxito o error)
    if (this.pacientes.length >= 0 && 
        this.personalSalud.length >= 0 && 
        this.recursosHospitalarios.length >= 0) {
      this.cargando = false;
    }
  }

  agregarSintoma(): void {
    if (this.nuevoSintoma.trim()) {
      this.triaje.sintomas.push(this.nuevoSintoma.trim());
      this.nuevoSintoma = '';
    }
  }

  eliminarSintoma(index: number): void {
    this.triaje.sintomas.splice(index, 1);
  }

  onSubmit(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    // Asegurar que recurso_hospitalario_id sea null si es 0
    const payload = {
      ...this.triaje,
      recurso_hospitalario_id: this.triaje.recurso_hospitalario_id || null
    };

    this.triajeService.crearTriaje(payload).subscribe({
      next: (response) => {
        this.mensajeExito = 'Triaje registrado exitosamente';
        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 2000);
      },
      error: (err) => {
        this.mensajeError = this.obtenerMensajeError(err);
        console.error('Error detallado:', err);
      }
    });
  }

  private obtenerMensajeError(err: any): string {
    if (err.error?.errors) {
      // Manejar errores de validación de Laravel
      return Object.values(err.error.errors).flat().join(', ');
    }
    return err.error?.message || err.message || 'Error desconocido al registrar triaje';
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