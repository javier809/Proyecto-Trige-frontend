// reportes.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriajeService } from '../../servicios/triage.service';
import { InterfaceTriaje } from '../../modelos/InterfaceTriage';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  triajes: InterfaceTriaje[] = [];
  cargando: boolean = true;
  error: string | null = null;

  // Filtros
  filtroPrioridad: string = '';
  filtroEstado: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private triajeService: TriajeService) {}

  ngOnInit(): void {
    this.cargarTriajes();
  }

  cargarTriajes(): void {
    this.cargando = true;
    this.error = null;

    this.triajeService.getTriajes().subscribe({
      next: (data) => {
        this.triajes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los triajes: ' + 
          (err.error?.message || err.message || 'Error desconocido');
        this.cargando = false;
        console.error('Error al cargar triajes:', err);
      }
    });
  }

  get triajesFiltrados(): InterfaceTriaje[] {
    return this.triajes.filter(triaje => {
      const cumplePrioridad = !this.filtroPrioridad || triaje.prioridad === this.filtroPrioridad;
      const cumpleEstado = !this.filtroEstado || triaje.estado === this.filtroEstado;
      const cumpleFecha = this.filtrarPorFecha(triaje.fecha_hora);
      
      return cumplePrioridad && cumpleEstado && cumpleFecha;
    });
  }

  private filtrarPorFecha(fechaTriaje: string): boolean {
    if (!this.fechaInicio && !this.fechaFin) return true;
    
    const fecha = new Date(fechaTriaje).getTime();
    const inicio = this.fechaInicio ? new Date(this.fechaInicio).getTime() : 0;
    const fin = this.fechaFin ? new Date(this.fechaFin + 'T23:59:59').getTime() : Date.now();

    return fecha >= inicio && fecha <= fin;
  }

  actualizarFiltroPrioridad(event: Event): void {
    this.filtroPrioridad = (event.target as HTMLSelectElement).value;
  }

  actualizarFiltroEstado(event: Event): void {
    this.filtroEstado = (event.target as HTMLSelectElement).value;
  }

  actualizarFechaInicio(event: Event): void {
    this.fechaInicio = (event.target as HTMLInputElement).value;
  }

  actualizarFechaFin(event: Event): void {
    this.fechaFin = (event.target as HTMLInputElement).value;
  }

  limpiarFiltros(): void {
    this.filtroPrioridad = '';
    this.filtroEstado = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }
}