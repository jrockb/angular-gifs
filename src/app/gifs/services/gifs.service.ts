import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'EdT0FqLUd3lq10w0eL5z0FIvvAe3fn5u';
  private _historial: string[] = [];

  get historial(): string[]{
    return [...this._historial]; // rompe la refrencia para devolver una copia de ese arreglo
  }

  constructor(private http: HttpClient){} // para hacer peticiones http en base a observables

  buscarGifs(query: string): void{
    query = query.trim().toLowerCase(); // para que todo se procese en minusculas
    if (!this._historial.includes(query)){ // metodo que busca si este elemento ya existe en el arreglo
      this._historial.unshift(query); // inserta el elemento en la primera posición
    }
    this._historial = this._historial.splice(0, 10); // corta el arreglo para que tenga 10 elementos
    // el modulo http retorna un observable
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=EdT0FqLUd3lq10w0eL5z0FIvvAe3fn5u&q=simpsons&limit=2')
      .subscribe( (resp: any) => {
      console.log(resp.data);
    }); // el subscribe se ejecuta cuando se tenga la resolución del get

    // la peticion tambien se puede ejecutar con una promesa, pero es más sencillo usar el subscribe

    console.log(this._historial);
  }

}
