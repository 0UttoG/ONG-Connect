import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private apiUrl = 'http://localhost:8080/api/donaciones';

  constructor(private http: HttpClient) { }

  registrarDonacion(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, payload);
  }
}