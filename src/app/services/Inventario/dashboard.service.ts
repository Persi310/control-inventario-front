import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Marca } from 'src/app/models/marca';
import { catchError } from 'rxjs/operators';
import { ProductosVendidos, ProductosStock } from 'src/app/models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }

    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Obtén el token desde localStorage
      }),
    };

    getProductosmasVendidos(): Observable<{ message: string, top_products: ProductosVendidos[] }> {
      return this.http.get<{ message: string, top_products: ProductosVendidos[] }>(`http://127.0.0.1:8000/api/productos_vendidos/top5`);
    }

    getProductosmenosStock(): Observable<{ message: string, top_products: ProductosStock[] }> {
      return this.http.get<{ message: string, top_products: ProductosStock[] }>(`http://127.0.0.1:8000/api/productos_stock/top5`);
    }
}
