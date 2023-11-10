import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentasService } from '../services/Inventario/ventas.service';

@Component({
  selector: 'app-venta-dialog',
  templateUrl: './venta-dialog.component.html',
  styleUrls: ['./venta-dialog.component.css']
})
export class VentaDialogComponent {
  compra: any = {}; // Objeto para almacenar la compra
  productosCompra: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<VentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private comprasService: VentasService
  ) {
    this.compra = { ...data.compra }; // Copia la compra para evitar cambios en el objeto original
  }

  ngOnInit() {
    // Llamar a la función para obtener los productos de la compra al inicializar el diálogo
    this.obtenerProductosCompra(this.compra.id);
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }

  obtenerProductosCompra(compraId: number): void {
    console.log(compraId)
    this.comprasService.getProductosVenta(compraId).subscribe(
      (data) => {
        console.log(data.detalles_compra)
        this.productosCompra = data.detalles_venta;
      },
      (error) => {
        console.error('Error al obtener los productos de la compra:', error);
      }
    );
  }
}
