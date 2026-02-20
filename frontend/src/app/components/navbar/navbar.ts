import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // <-- Importamos las rutas
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}