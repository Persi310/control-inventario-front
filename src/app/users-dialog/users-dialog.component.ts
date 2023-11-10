import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuarios } from '../models/usuarios';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent {
  usuario: Usuarios;
  userId: number;

  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.usuario = { ...data.usuario };
    this.userId = data.userId; // Asignar userId recibido

    // Puedes utilizar this.userId en tu lógica para actualizar el usuario
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    // Puedes utilizar this.userId para enviar la actualización con el ID
    this.usuario.id = this.userId; // Asignar el ID al usuario
    this.dialogRef.close({ usuario: this.usuario, isEditing: true });
  }
}
