// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ProjectList } from './components/project-list/project-list';
import { MyApplications } from './components/my-applications/my-applications';
import { ContractorPanel } from './components/contractor-panel/contractor-panel';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home'; // 🔥 ДОБАВИТЬ

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', component: Home }, // 🔥 ГЛАВНАЯ СТРАНИЦА
  { path: 'projects', component: ProjectList },
  { path: 'my-applications', component: MyApplications, canActivate: [AuthGuard] },
  { 
    path: 'contractor', 
    component: ContractorPanel,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Contractor' } 
  },
  { 
    path: 'admin', 
    component: AdminPanel,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'Admin' } 
  },
  { path: '**', redirectTo: '' }
];