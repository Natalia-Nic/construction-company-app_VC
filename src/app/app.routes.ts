// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ProjectList } from './components/project-list/project-list';
import { MyApplications } from './components/my-applications/my-applications';
import { ContractorDashboard } from './components/contractor-dashboard/contractor-dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', component: ProjectList, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectList, canActivate: [AuthGuard] },
  { path: 'my-applications', component: MyApplications, canActivate: [AuthGuard] },
  { 
    path: 'contractor', 
    component: ContractorDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Contractor' } 
  },
  { path: '**', redirectTo: '' }
];