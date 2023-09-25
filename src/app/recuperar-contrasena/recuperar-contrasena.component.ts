import { Component } from '@angular/core';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor() {}

  enviarCorreo() {
    // Aquí puedes implementar la lógica para enviar un correo de recuperación de contraseña
    // Puedes utilizar un servicio para esta funcionalidad.

    // Lógica de envío de correo...
    console.log(`Se ha enviado un correo de recuperación a: ${this.email}`);
  }
}
