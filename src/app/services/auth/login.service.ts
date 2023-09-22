import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from './loginRequest'; // Asumiendo que tienes una clase LoginRequest

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error && error.error.message ? error.error.message : 'Error desconocido';
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  logout(): Observable<any> {
    localStorage.removeItem('jwt'); 
    this.router.navigate(['/login']);
    return new Observable(observer => {
      observer.next(); 
      observer.complete(); 
    });
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  storeToken(token: string): void {
    localStorage.setItem('jwt', token);
  }
}

