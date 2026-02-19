import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // LISTA DE 9 PROYECTOS PARA EL DASHBOARD
  proyectos = [
    {
      id: 1,
      titulo: 'Educación Digital Rural',
      descripcion: 'Llevando tablets e internet satelital a escuelas en zonas de difícil acceso.',
      metaMonto: 5000,
      montoRecaudado: 3500,
      imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      titulo: 'Agua Limpia para Todos',
      descripcion: 'Construcción de sistemas de captación y purificación de agua comunitaria.',
      metaMonto: 8000,
      montoRecaudado: 2000,
      // FOTO CORREGIDA:
      imagen: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      titulo: 'Reforestación El Imposible',
      descripcion: 'Plantación de 10,000 árboles nativos para recuperar áreas dañadas.',
      metaMonto: 3000,
      montoRecaudado: 2800,
      imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      titulo: 'Comedores Infantiles',
      descripcion: 'Garantizando al menos una comida nutritiva al día para niños en riesgo.',
      metaMonto: 6000,
      montoRecaudado: 1500,
      imagen: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      titulo: 'Refugio Animal La Esperanza',
      descripcion: 'Rescate, esterilización y adopción de perritos y gatitos en situación de calle.',
      metaMonto: 4000,
      montoRecaudado: 3900,
      imagen: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      titulo: 'Techos Seguros',
      descripcion: 'Sustitución de techos de lámina dañados por estructuras seguras antes del invierno.',
      metaMonto: 10000,
      montoRecaudado: 4500,
      imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 7,
      titulo: 'Becas Universitarias',
      descripcion: 'Fondo de apoyo para jóvenes talentos que no pueden costear su educación superior.',
      metaMonto: 15000,
      montoRecaudado: 8000,
      // FOTO CORREGIDA:
      imagen: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      titulo: 'Clínica Móvil Comunitaria',
      descripcion: 'Atención médica básica y medicamentos para comunidades sin centros de salud cercanos.',
      metaMonto: 12000,
      montoRecaudado: 1000,
      imagen: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 9,
      titulo: 'Mujeres Emprendedoras',
      descripcion: 'Capital semilla y capacitaciones para mujeres que inician sus propios micronegocios.',
      metaMonto: 7500,
      montoRecaudado: 5200,
      imagen: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80'
    }
  ];
}