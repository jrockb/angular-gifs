import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; // va a buscar en el html un elemento con esa referencia
  // !: indica que el objeto nunca será nulo, para que no se tenga el error

  constructor(private gifsService: GifsService){} // inyección del servicio GifsService

  buscar(): void{
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim().length > 0){ // validar si el texto a buscar viene vacio
      this.gifsService.buscarGifs(valor); // llamada al metodo buscar del servicio
      this.txtBuscar.nativeElement.value = '';
    }

    // document.querySelector('input').value = ''; usando javascript para borrar la caja de texto cuando se realiza la busqueda

  }


}
