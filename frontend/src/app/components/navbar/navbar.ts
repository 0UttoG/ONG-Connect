import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <--- 1. IMPORTAR ESTO

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // <--- 2. AGREGARLO AQUÍ
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}