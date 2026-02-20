import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Donation } from './pages/donation/donation';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { ProjectDetails } from './pages/project-details/project-details';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminProyectos } from './pages/admin-proyectos/admin-proyectos'; 
import { AdminSucursales } from './pages/admin-sucursales/admin-sucursales'; // <--- 1. Importado aquí

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'donar', component: Donation },
    { path: 'registro', component: Register },
    { path: 'nosotros', component: About },
    { path: 'login', component: Login },
    { path: 'perfil', component: Profile },
    { path: 'proyecto/:id', component: ProjectDetails },
    { path: 'admin', component: AdminDashboard },
    { path: 'admin/proyectos', component: AdminProyectos },
    { path: 'admin/sucursales', component: AdminSucursales } // <--- 2. Ruta de sucursales lista
];