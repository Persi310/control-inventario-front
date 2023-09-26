import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/Inventario/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { Categoria } from 'src/app/models/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from 'src/app/users-dialog/users-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usuarios: Usuarios[] = [];
  nuevoUsuarios: { first_name: string, username: string, last_name: string, is_superuser: boolean, is_staff: boolean, is_active: boolean,date_joined: string, email: string, password: string, direccion: string, telefono: string, nombre_empresa: string} = {  first_name: '', username: '', last_name: '', is_superuser: true, is_staff: true, is_active: true,date_joined: '', email: '', password: '', direccion: '', telefono: '', nombre_empresa: '' };

  constructor(private usuariosService: UsuariosService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuariosService.getUsers().subscribe(
      (data) => {
        this.usuarios = data.usuarios;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarUsuarios() {
    if (!this.nuevoUsuarios || !this.nuevoUsuarios.email || !this.nuevoUsuarios.password) {
      console.error('Alguno de los campos estan vacios');
      return;
    }
    console.log(this.nuevoUsuarios)
    this.usuariosService.agregarUsuarios(this.nuevoUsuarios).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Producto agregado satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevoUsuarios = { first_name: '', username: '', last_name: '', is_superuser: true, is_staff: true, is_active: true,date_joined: '', email: '', password: '', direccion: '', telefono: '', nombre_empresa: ''};
  }

  verUsers(usuarios: Usuarios) {
    this.dialog.open(UsersDialogComponent, {
      data: { usuarios },
    });
  }
  
  editarUsers(usuarios: Usuarios) {
    this.dialog.open(UsersDialogComponent, {
      data: { usuarios, isEditing: true },
    });
  }
  
  eliminarUsers(usuarios: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar esta categoría?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para eliminar la categoría aquí.
        // Implementa la lógica de eliminación de la categoría.
        // Por ejemplo, this.categoriasService.eliminarCategoria(categoria.id);
      }
    });
  }
}
