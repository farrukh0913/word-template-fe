import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'home',
    component: HomeComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'template',
    component: TemplateComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'addPatient',
    component: AddPatientComponent,
  },
  {
    canActivate: [AuthGuard],
    path: "addPatient/:id",
    component: AddPatientComponent
  },
];
