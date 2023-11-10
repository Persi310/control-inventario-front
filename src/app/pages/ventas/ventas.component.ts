import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentasService } from 'src/app/services/Inventario/ventas.service';
import { Venta } from 'src/app/models/venta';
import { ProductosService } from 'src/app/services/Inventario/productos.service';
import { Producto } from 'src/app/models/producto';
import { MatDialog } from '@angular/material/dialog';
import { Usuarios } from 'src/app/models/usuarios';
import { VentaDialogComponent } from 'src/app/venta-dialog/venta-dialog.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  productosAgregados: any[] = [];
  productosSeleccionados: any[] = [];
  agregandoProducto = false;
  ventas: any[];
  productos: Producto[] = [];
  nuevaCompra: { fecha: string, cantidad: number, producto_id: number, precio: number, usuario_id: number} = {  fecha: "" ,usuario_id: 0, cantidad: 0, producto_id: 0, precio: 0};
  proveedores: Usuarios[] = [];
  agregarProductosFormVisible = false;
  
  constructor(private ventaService: VentasService, private _snackBar: MatSnackBar, private productoService: ProductosService, private dialog: MatDialog) {
    this.ventas = [
      {
        id: 1,
        fecha: 'Product 1',
        monto_total: 10,
        user__first_name: 'Store 1',
      },
      // Add more inventory items here
    ];
   }

  ngOnInit(): void {
    this.ventaService.getVentas().subscribe(
      (data) => {
        console.log(data.ventas)
        this.ventas = data.ventas;
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
        console.error('Error al obtener los productos:', error);
      }
    );

    this.productoService.getProveedores().subscribe(
      (data) => {
        this.proveedores = data.usuarios; 
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  mostrarFormularioProductos() {
    this.agregarProductosFormVisible = true;
  }

  finalizarCompra() {
    if (this.productosSeleccionados.length === 0) {
      // Agrega una validación si no hay productos seleccionados
      this._snackBar.open("No hay productos seleccionados", "X");
      return;
    }
  
    const primeraCompra = this.productosSeleccionados[0]; // Acceder al primer producto seleccionado
    const compra = {
      fecha: primeraCompra.fecha,
      usuario_id: primeraCompra.usuario_id,
      productos: this.productosSeleccionados.map(producto => ({
        cantidad: producto.cantidad,
        producto_id: producto.producto_id,
        precio: producto.precio
      }))
    };
  
    this.ventaService.agregarVenta(compra).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Venta creada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la compra:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    this.productosSeleccionados = [];
    this.nuevaCompra = { fecha: "", usuario_id: 0, cantidad: 0, producto_id: 0, precio: 0 };
  }
  

  agregarProducto() {
    const nuevoProducto = {
      fecha: this.nuevaCompra.fecha,
      usuario_id: this.nuevaCompra.usuario_id,
      cantidad: this.nuevaCompra.cantidad,
      producto_id: this.nuevaCompra.producto_id,
      precio: this.nuevaCompra.precio
    };
  
    // Asegúrate de que todos los campos necesarios estén completos antes de agregar el producto
    if (
      nuevoProducto.producto_id === 0 ||
      nuevoProducto.cantidad <= 0 ||
      nuevoProducto.precio <= 0
    ) {
      this._snackBar.open("Por favor, complete todos los campos", "X");
      return;
    }
  
    // Agregar el nuevo producto al array de productos seleccionados
    this.productosSeleccionados.push(nuevoProducto);
  
    // Restablecer el objeto nuevaCompra
    this.nuevaCompra = {
      fecha: "",
      usuario_id: 0,
      cantidad: 0,
      producto_id: 0,
      precio: 0
    };
  
    // Cerrar el formulario de producto
    this.agregandoProducto = false;
  }

  verProductos(compra: Venta) {
    this.dialog.open(VentaDialogComponent, {
      data: { compra },
    });
  }

}
