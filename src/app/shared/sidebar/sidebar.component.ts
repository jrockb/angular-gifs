import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { } // inyección del servicio

  get historial(): string[]{ // obtiene el arreglo de string historial del servicio, historial de busquedas
    return this.gifsService.historial;
  }

  buscar(termino: string): void{
    console.log(termino);
    this.gifsService.buscarGifs(termino);
  }

}
