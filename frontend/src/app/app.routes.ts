import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Donation } from './pages/donation/donation';
import { Register } from './pages/register/register';
import { About } from './pages/about/about'; // <--- 1. Importar

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'donar', component: Donation },
    { path: 'registro', component: Register },
    { path: 'nosotros', component: About } // <--- 2. Nueva ruta
]; 