import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Donation } from './pages/donation/donation';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { ProjectDetails } from './pages/project-details/project-details'; // <--- 1. Importar

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'donar', component: Donation },
    { path: 'registro', component: Register },
    { path: 'nosotros', component: About },
    { path: 'login', component: Login },
    { path: 'perfil', component: Profile },
// Solo cambia la línea del proyecto, dejándola así:
{ path: 'proyecto/:id', component: ProjectDetails }];