import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, Navbar, RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails implements OnInit {
  proyecto: any;

  // BASE DE DATOS SIMULADA (Historias largas y coherentes con el Home)
  proyectosDB = [
    {
      id: 1, titulo: 'Educación Digital Rural', categoria: 'Educación',
      descripcionLarga: 'Llevaremos tablets con contenido educativo pre-cargado e internet satelital a 5 escuelas en zonas montañosas. Más de 300 niños tendrán acceso a una biblioteca global de conocimiento, cerrando la brecha digital y abriendo puertas a mejores oportunidades futuras.',
      metaMonto: 5000, montoRecaudado: 3500, donantes: 120, diasRestantes: 15,
      imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2, titulo: 'Agua Limpia para Todos', categoria: 'Salud',
      descripcionLarga: 'En muchas comunidades, el acceso a agua potable es un lujo. Construiremos sistemas de captación de agua de lluvia y plantas purificadoras comunitarias. Más de 500 familias tendrán acceso a agua segura, reduciendo drásticamente las enfermedades gastrointestinales.',
      metaMonto: 8000, montoRecaudado: 2000, donantes: 45, diasRestantes: 22,
imagen: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=1200&q=80'    },
    {
      id: 3, titulo: 'Reforestación El Imposible', categoria: 'Medio Ambiente',
      descripcionLarga: 'Plantaremos 10,000 árboles de especies nativas en zonas afectadas por incendios forestales. Este proyecto no solo devuelve el verde a nuestros bosques, sino que protege fuentes de agua subterránea y da refugio a decenas de especies animales en peligro.',
      metaMonto: 3000, montoRecaudado: 2800, donantes: 210, diasRestantes: 3,
      imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4, titulo: 'Comedores Infantiles', categoria: 'Nutrición',
      descripcionLarga: 'Garantizaremos alimentos balanceados para 150 niños en situación vulnerable durante todo el año escolar. Un niño bien alimentado aprende mejor, crece sano y rompe el ciclo de la pobreza. Los fondos cubren ingredientes, cocineras locales y gas.',
      metaMonto: 6000, montoRecaudado: 1500, donantes: 30, diasRestantes: 40,
      imagen: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5, titulo: 'Refugio Animal La Esperanza', categoria: 'Bienestar Animal',
      descripcionLarga: 'Ampliación de instalaciones para albergar a 50 perros y gatos más. Incluye una clínica de esterilización gratuita para la comunidad. Con tu aporte compramos alimento, medicinas y material de construcción para los nuevos corrales.',
      metaMonto: 4000, montoRecaudado: 3900, donantes: 350, diasRestantes: 2,
      imagen: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6, titulo: 'Techos Seguros', categoria: 'Vivienda',
      descripcionLarga: 'Antes de que llegue la época de lluvias, reemplazaremos láminas oxidadas y techos de plástico por estructuras de zinc reforzado en 40 hogares. Evitaremos enfermedades respiratorias y daños a los pocos muebles de estas familias.',
      metaMonto: 10000, montoRecaudado: 4500, donantes: 85, diasRestantes: 28,
      imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 7, titulo: 'Becas Universitarias', categoria: 'Educación',
      descripcionLarga: 'El talento está en todas partes, las oportunidades no. Este fondo cubre matrícula, transporte y libros para 10 jóvenes sobresalientes de zonas rurales que cursarán carreras STEM. Conviértete en el padrino de sus sueños.',
      metaMonto: 15000, montoRecaudado: 8000, donantes: 60, diasRestantes: 60,
imagen: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80'    },
    {
      id: 8, titulo: 'Clínica Móvil Comunitaria', categoria: 'Salud',
      descripcionLarga: 'Equipamiento de un microbús como consultorio médico itinerante. Llevará atención primaria, jornadas de vacunación y medicinas esenciales a 12 cantones que quedan a más de 3 horas del hospital más cercano.',
      metaMonto: 12000, montoRecaudado: 1000, donantes: 15, diasRestantes: 45,
      imagen: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 9, titulo: 'Mujeres Emprendedoras', categoria: 'Desarrollo Económico',
      descripcionLarga: 'Capital semilla de $500 y 3 meses de capacitaciones financieras para 15 mujeres jefas de hogar. Crearán negocios de panadería, costura y huertos caseros, logrando independencia económica para sostener a sus hijos.',
      metaMonto: 7500, montoRecaudado: 5200, donantes: 95, diasRestantes: 10,
      imagen: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Inyectamos la herramienta de Rutas para leer el URL
  constructor(private route: ActivatedRoute) {}

  // Cuando la página carga, lee el ID del enlace y busca el proyecto
  ngOnInit() {
    const idUrl = Number(this.route.snapshot.paramMap.get('id'));
    this.proyecto = this.proyectosDB.find(p => p.id === idUrl);
  }

  get porcentaje(): number {
    if (!this.proyecto) return 0;
    return Math.min((this.proyecto.montoRecaudado / this.proyecto.metaMonto) * 100, 100);
  }
}