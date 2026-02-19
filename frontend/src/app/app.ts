import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home'; // <--- CAMBIO IMPORTANTE

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home], // <--- AGREGAMOS HOME AQUÍ
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}