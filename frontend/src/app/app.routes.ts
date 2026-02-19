import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Donation } from './pages/donation/donation';
import { Register } from './pages/register/register'; // <--- 1. IMPORTAR

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'donar', component: Donation },
    { path: 'registro', component: Register } // <--- 2. NUEVA RUTA
];