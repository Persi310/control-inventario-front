import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getProductos(): Observable<{ message: string, productos: Producto[] }> {
      return this.http.get<{ message: string, productos: Producto[] }>(`${this.apiUrl}/productos`);
    }
}
