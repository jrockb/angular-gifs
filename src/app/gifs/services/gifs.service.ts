import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(): string[]{
    return [...this._historial]; // rompe la refrencia para devolver una copia de ese arreglo
  }

  buscarGifs(query: string): void{
    this._historial.unshift(query); // inserta el elemento en la primera posición
    console.log(this._historial);
  }

}
