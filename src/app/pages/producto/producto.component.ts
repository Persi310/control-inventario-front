import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/Inventario/productos.service';
import { Producto } from 'src/app/models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/models/marca';
import { Categoria } from 'src/app/models/categoria';
import { Usuarios } from 'src/app/models/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  

  private apiUrl = 'http://127.0.0.1:8000/api';
  productos: Producto[] = [];
  nuevoProducto: { nombre: string, descripcion: string, precio: number, cantidad_minima: number, categoria_id: number, marca_id: number, proveedor_id: number } = {  nombre:'', descripcion: '', precio: 0.00, cantidad_minima: 0, categoria_id: 0, marca_id: 0, proveedor_id: 0 };
  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  proveedores: Usuarios[] = [];

  constructor(private productoService: ProductosService, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data.productos;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );

    this.productoService.getCategorias().subscribe(
      (data) => {
        this.categorias = data.categorias; 
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
      }
    );

    this.productoService.getMarcas().subscribe(
      (data) => {
        this.marcas = data.marcas; 
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );

    this.productoService.getProveedores().subscribe(
      (data) => {
        this.proveedores = data.usuarios; 
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarProducto() {
    if (!this.nuevoProducto || !this.nuevoProducto.nombre || !this.nuevoProducto.descripcion) {
      console.error('Alguno de los campos estan vacios');
      return;
    }
  
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Producto agregado satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.nuevoProducto = { nombre:'', descripcion: '', precio: 0.00, cantidad_minima: 0, categoria_id: 0, marca_id: 0, proveedor_id: 0};
  }

}


