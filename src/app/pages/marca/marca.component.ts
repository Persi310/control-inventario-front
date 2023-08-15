import { Component } from '@angular/core';
import { MarcaService } from 'src/app/services/Inventario/marca.service';
import { Marca } from 'src/app/models/marca';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {

  marcas: Marca[] = [];

  constructor(private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.marcaService.getMarcas().subscribe(
      (data) => {
        this.marcas = data.marcas;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
      }
    );
  }

}
