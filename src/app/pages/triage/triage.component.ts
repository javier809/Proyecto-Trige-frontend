import { Component } from '@angular/core';

@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [],
  templateUrl: './triage.component.html',
  styleUrl: './triage.component.css'
})
export class TriageComponent {

  fecha: string = new Date().toLocaleDateString('es-ES');
  hora: string = new Date().toLocaleTimeString('es-ES');

  limpiar(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    target.value = '';
  }
}
