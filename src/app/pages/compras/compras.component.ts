import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComprasService } from 'src/app/services/Inventario/compras.service';
import { Compra } from 'src/app/models/compra';
import { ProductosService } from 'src/app/services/Inventario/productos.service';
import { Producto } from 'src/app/models/producto';
import { DetalleCompra } from 'src/app/models/detalle-compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  compras: Compra[] = [];
  productos: Producto[] = [];
  nuevaCompra: { producto_id: number, cantidad: number , precio: number} = { producto_id: 0.0, cantidad: 0.0 , precio: 0.0};
  productosAgregados: DetalleCompra[] = [];

  constructor(private comprasService: ComprasService, private _snackBar: MatSnackBar, private productoService: ProductosService) { }

  ngOnInit(): void {
    this.comprasService.getCompras().subscribe(
      (data) => {
        this.compras = data.compras;
      },
      (error) => {
        console.error('Error al obtener las categorias:', error);
      }
    );

    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data.productos;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarCompras() {
    if (!this.nuevaCompra || this.nuevaCompra.producto_id == 0) {
      console.error('El nombre de la marca no puede estar vacío');
      return;
    }
  
    this.comprasService.agregarCompras(this.nuevaCompra).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Marca agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevaCompra = {producto_id: 0, cantidad: 0.0 , precio: 0.0};
  }

  finalizarCompra() {
    console.log('====================================');
    console.log("funciona");
    console.log('====================================');
  }

}
