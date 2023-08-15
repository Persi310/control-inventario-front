import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

    private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getMarcas(): Observable<{ message: string, marcas: Marca[] }> {
      return this.http.get<{ message: string, marcas: Marca[] }>(`${this.apiUrl}/marcas`);
    }
  }