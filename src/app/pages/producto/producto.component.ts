import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/Inventario/productos.service';
import { Producto } from 'src/app/models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from 'src/app/models/marca';
import { Categoria } from 'src/app/models/categoria';
import { Usuarios } from 'src/app/models/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductoDialogComponent } from 'src/app/producto-dialog/producto-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';


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

  constructor(private productoService: ProductosService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

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

  verProducto(producto: Producto) {
    const marca = producto.marca__marca;
    const categoria = producto.categoria__categoria;
    const proveedor = producto.proveedor__first_name;
  
    const productoDetallado = { ...producto, marca, categoria, proveedor };
  
    this.dialog.open(ProductoDialogComponent, { data: { producto: productoDetallado } });
  }

  obtenerNombreProveedor(id: number): string {
    const proveedorEncontrado = this.proveedores.find(proveedor => proveedor.id === id);
    return proveedorEncontrado ? proveedorEncontrado.first_name : '';
  }
  
  obtenerNombreMarca(id: number): string {
    const marcaEncontrada = this.marcas.find(marca => marca.id === id);
    return marcaEncontrada ? marcaEncontrada.marca : '';
  }
  
  obtenerNombreCategoria(id: number): string {
    const categoriaEncontrada = this.categorias.find(categoria => categoria.id === id);
    return categoriaEncontrada ? categoriaEncontrada.categoria : '';
  }
  
  editarProducto(producto: Producto) {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      data: { producto, isEditing: true }, // Asegúrate de que 'producto' tenga los datos actualizados.
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Resultado del diálogo:', result);
      if (result && result.isEditing) {
        // Lógica de actualización del producto aquí
        this.productoService.actualizarProducto(result.producto).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open('Producto editado satisfactoriamente', 'X');
            // Actualizar la lista de productos después de editar uno.
            this.productoService.getProductos().subscribe((data) => {
              this.productos = data.productos;
            });
          },
          (error) => {
            console.error('Error al editar el producto:', error);
            this._snackBar.open(error, 'X');
          }
        );
      }
    });
  }
  
  eliminarProducto(producto: Producto) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Seguro que deseas eliminar este producto?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productoService.eliminarProducto(producto.id).subscribe(
          (data) => {
            console.log(data);
            this._snackBar.open('Producto eliminado satisfactoriamente', 'X');
            // Vuelve a cargar la lista de productos después de eliminar uno.
            this.productoService.getProductos().subscribe((data) => {
              this.productos = data.productos;
            });
          },
          (error) => {
            console.error('Error al eliminar el producto:', error);
            this._snackBar.open(error, 'X');
          }
        );
      }
    });
  }

}


