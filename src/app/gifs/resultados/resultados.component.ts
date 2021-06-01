import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados(): any[] {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { } // inyección del servicio


}
