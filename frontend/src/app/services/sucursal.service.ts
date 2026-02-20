import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private apiUrl = 'http://localhost:8080/api/sedes'; // Ruta estándar que usaría Nestor

  constructor(private http: HttpClient) { }

  getSucursales(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}