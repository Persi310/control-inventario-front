import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from 'src/app/models/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getTiendas(): Observable<{ message: string, tiendas: Tienda[] }> {
      return this.http.get<{ message: string, tiendas: Tienda[] }>(`${this.apiUrl}/tiendas`);
    }
}
