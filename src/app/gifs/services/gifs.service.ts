import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'EdT0FqLUd3lq10w0eL5z0FIvvAe3fn5u';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = []; // es publica porque no importa que se modifique fuera de esta clase

  constructor(private http: HttpClient){ // para hacer peticiones http en base a observables
    // como el constructor solo se ejecuta una vez se puede usar para cargar la data de localStorage
    if (localStorage.getItem('historial')){ // validar si el elemento no es nulo
      // tslint:disable-next-line: no-non-null-assertion
      this._historial = JSON.parse(localStorage.getItem('historial')!); // ! indica que se obvie el error
      // ya que se ha validado que el objeto no es nulo
    }
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || []; otra forma de obtener la data del localStorage

    // tslint:disable-next-line: no-non-null-assertion
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || []; // recuperar ultima busqueda al recargar el navegador
  }

  get historial(): string[]{
    return [...this._historial]; // rompe la refrencia para devolver una copia de ese arreglo
  }

  buscarGifs(query: string): void{

    const params = new HttpParams()
          .set('api_key', this.apiKey.trim())
          .set('q', query)
          .set('limit', '10');

    query = query.trim().toLowerCase(); // para que todo se procese en minusculas
    if (!this._historial.includes(query)){ // metodo que busca si este elemento ya existe en el arreglo
      this._historial.unshift(query); // inserta el elemento en la primera posición
      localStorage.setItem('historial', JSON.stringify(this._historial)); // para que se persista la información localmente
      // el metodo JSON.stringfy genera un string de un objeto
    }
    this._historial = this._historial.splice(0, 10); // corta el arreglo para que tenga 10 elementos
    // el modulo http retorna un observable
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params}) // ajuste para construir de mejor manera la url
      .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultados)); // persistir el resultado localmente
      console.log(resp.data);
    }); // el subscribe se ejecuta cuando se tenga la resolución del get

    // la peticion tambien se puede ejecutar con una promesa, pero es más sencillo usar el subscribe

    console.log(this._historial);
  }

}
