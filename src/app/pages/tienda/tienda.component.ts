import { Component } from '@angular/core';
import { TiendasService } from 'src/app/services/Inventario/tiendas.service';
import { Tienda } from 'src/app/models/tienda';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  tiendas: Tienda[] = [];

  constructor(private tiendaService: TiendasService) { }

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
}
