import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TriageComponent } from './pages/triage/triage.component';
import { UsuarioService } from './servicios/usuario.service';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { ReportesComponent } from './pages/reportes/reportes.component';


export const routes: Routes = [
 {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent},
  {path:'triage',component:TriageComponent},
  {path:'paciente',component:PacientesComponent},
  {path:'reporte',component:ReportesComponent},
 {path:'**',component:LoginComponent},
];
