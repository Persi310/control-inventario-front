import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from 'src/app/models/inventario';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getInventario(): Observable<{ message: string, inventario: Inventario[] }> {
      return this.http.get<{ message: string, inventario: Inventario[] }>(`${this.apiUrl}/inventario`);
    }

}
