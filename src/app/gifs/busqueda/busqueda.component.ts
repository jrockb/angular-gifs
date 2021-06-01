import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; // va a buscar en el html un elemento con esa referencia
  // !: indica que el objeto nunca será nulo, para que no se tenga el error
  buscar(): void{
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    this.txtBuscar.nativeElement.value = '';
    // document.querySelector('input').value = ''; usando javascript para borrar la caja de texto cuando se realiza la busqueda

  }


}
