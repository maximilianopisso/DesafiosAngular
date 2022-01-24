import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";



export const CartServiceMock = {



  //private urlCart = environment.urlLocalCart;


  // // METODO PARA OBTENER EL LISTADO COMPLETO DE PELICULAS EN EL CARRITO DE COMPRAS (DESDE LA API)
  // getCart(): Observable<MovieAPI[]> {
  //   return this.httpClient.get<MovieAPI[]>(`${this.urlCart}`);
  // }

  // // METODO PARA AGREGAR UNA NUEVA PELICULA AL CARRITO DE COMPRAS (DESDE LA API)
  // addMovie(movie: MovieAPI): Observable<any> {
  //   return this.httpClient.post<any>(this.urlCart, movie)
  // }

  
  clearCart(): Observable<[]> {
    return of([]);
  }
  // // METODO ELIMINAR UNA PELICULA DEL CARRITO (DESDE LA API)
  // removeMovie(movie: MovieAPI): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.urlCart}/?id=${movie.id}`)
  // }

}

