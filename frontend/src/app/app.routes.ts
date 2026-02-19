import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
// CORRECCIÓN: Importamos 'Donation' desde el archivo 'donation'
import { Donation } from './pages/donation/donation'; 

export const routes: Routes = [
    { path: '', component: Home },          // Ruta raíz (Home)
    { path: 'donar', component: Donation }  // Ruta /donar
];