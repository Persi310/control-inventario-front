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
  inventarios: any[];
  nuevaInventario: string = '';

  constructor(private inventarioService: InventarioService, private _snackBar: MatSnackBar, ) {
    this.inventarios = [
      {
        id: 1,
        producto__nombre: 'Product 1',
        cantidad_stock: 10,
        tienda__tienda: 'Store 1',
        fecha_ultima_actualizacion: '2023-10-22'
      },
      // Add more inventory items here
    ];
   }
  
  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe(
      (data) => {
        console.log(data.inventario)
        this.inventarios = data.inventario;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );
  }

}
