import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError = ""

  loginForm=this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private _snackBar: MatSnackBar) {

  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          if (userData.message == "El usuario no existe" || userData.message == "Contraseña incorrecta"){
            this._snackBar.open(userData.message, "X");
            this.router.navigateByUrl('/login');
          } else {
          this.loginService.storeToken(userData.token);
          this.router.navigateByUrl('/inicio');
          }  
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
          this._snackBar.open(errorData, 'Cerrar', {
            duration: 3000, 
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('error');
    }
  }

}
