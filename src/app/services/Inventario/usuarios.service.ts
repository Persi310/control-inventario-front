import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://127.0.0.1:8000/api';
  
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<{ message: string, usuarios: Usuarios[] }> {
      return this.http.get<{ message: string, usuarios: Usuarios[] }>(`${this.apiUrl}/users`);
    }
}
