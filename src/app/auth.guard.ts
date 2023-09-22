import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.loginService.isUserLoggedIn()) {
      return true; // Permite el acceso si el usuario ha iniciado sesión
    } else {
      this.router.navigate(['login']); // Redirige al usuario al inicio de sesión si no ha iniciado sesión
      return false;
    }
  }
}

