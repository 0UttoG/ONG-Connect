import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Apuntamos al controlador de Dashboard que hizo Nestor
  private apiUrl = 'http://localhost:8080/api/dashboard'; 

  constructor(private http: HttpClient) { }

  getEstadisticasGlobales(): Observable<any> {
    // Esto jalará el conteo total de tu base de datos
    return this.http.get(`${this.apiUrl}/estadisticas`);
  }

  getDonacionesRecientes(): Observable<any[]> {
    // Esto jalará los datos de la tabla 'donacion'
    return this.http.get<any[]>(`${this.apiUrl}/donaciones-recientes`);
  }
}