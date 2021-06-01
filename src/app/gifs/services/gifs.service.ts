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
    query = query.trim().toLowerCase(); // para que todo se procese en minusculas
    if (!this._historial.includes(query)){ // metodo que busca si este elemento ya existe en el arreglo
      this._historial.unshift(query); // inserta el elemento en la primera posición
    }
    this._historial = this._historial.splice(0, 10); // corta el arreglo para que tenga 10 elementos

    console.log(this._historial);
  }

}
