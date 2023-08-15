import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getCategorias(): Observable<{ message: string, categorias: Categoria[] }> {
      return this.http.get<{ message: string, categorias: Categoria[] }>(`${this.apiUrl}/categorias`);
    }
}
