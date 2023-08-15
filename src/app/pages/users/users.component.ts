import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/Inventario/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usuarios: Usuarios[] = [];

  constructor(private usuariosService: UsuariosService) { }

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
}
