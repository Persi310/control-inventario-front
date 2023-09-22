import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventarioService } from 'src/app/services/Inventario/inventario.service';
import { Inventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  inventarios: Inventario[] = [];
  nuevaInventario: string = '';

  constructor(private inventarioService: InventarioService, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe(
      (data) => {
        this.inventarios = data.inventario;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

}
