import { Component } from '@angular/core';
import { TiendasService } from 'src/app/services/Inventario/tiendas.service';
import { Tienda } from 'src/app/models/tienda';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  tiendas: Tienda[] = [];
  nuevaTienda: { tienda: string, direccion: string } = { tienda: '', direccion: '' };

  constructor(private tiendaService: TiendasService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.tiendaService.getTiendas().subscribe(
      (data) => {
        this.tiendas = data.tiendas;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

  agregarTienda() {
    if (!this.nuevaTienda || !this.nuevaTienda.tienda || !this.nuevaTienda.direccion) {
      console.error('Debes completar ambos campos');
      return;
    }
  
    this.tiendaService.agregarTienda(this.nuevaTienda).subscribe(
      (data) => {
        console.log(data);
        this._snackBar.open("Tienda agregada satisfactoriamente", "X");
      },
      (error) => {
        console.error('Error al agregar la tienda:', error);
        this._snackBar.open(error, "X");
      }
    );
  
    // Reiniciar los campos después de agregar la tienda
    this.nuevaTienda = { tienda: '', direccion: '' };
  }
  
}
