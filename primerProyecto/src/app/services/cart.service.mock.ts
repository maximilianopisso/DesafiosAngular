import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";



export const CartServiceMock = {

  clearCart(): Observable<[]> {
    return of([]);
  }

}

