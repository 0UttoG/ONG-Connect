import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <-- 1. Importamos map

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient) { }

  // Obtiene todos los proyectos (El que usaste para el Home)
  obtenerTarjetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tarjetas`);
  }

  // NUEVO: Obtiene un solo proyecto buscando por su ID
  // NUEVO: Pide al backend el paquete con los cálculos ya hechos
  obtenerDetallesProyecto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/detalles`);
  }

  // POST: Crear nuevo proyecto
  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, proyecto);
  }

  // PUT: Actualizar proyecto existente
  actualizarProyecto(id: number, proyecto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, proyecto);
  }

  // DELETE: Eliminar proyecto
  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  obtenerProyectoPorId(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}
  }
  