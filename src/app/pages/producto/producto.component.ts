import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/Inventario/productos.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  productos: Producto[] = [];

  constructor(private prodcutoService: ProductosService) { }

  ngOnInit(): void {
    this.prodcutoService.getProductos().subscribe(
      (data) => {
        this.productos = data.productos;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }
}
