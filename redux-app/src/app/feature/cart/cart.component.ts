import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSetTitle } from 'src/app/store/app.actions';
import { cartAddItem, cartClear, cartDeleteItem } from './store/cart.actions';
import { CartItem } from './store/cart.model';
import { cartItemsSelector, cartSelector } from './store/cart.selectors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private idSeed = 1
  cartItems$! : Observable<CartItem[]>
  constructor( 
    private store: Store
  ) { }

  ngOnInit(): void {
    //this.store.dispatch(AppSetTitle({{title: 'cart'}}))
    this.cartItems$ = this.store.pipe(
      select(cartItemsSelector)
    )
  }



  addOneItem() {
    const item: CartItem = { id: String(this.idSeed), item: { name: `item ${this.idSeed}` } }
    this.idSeed++;
    this.store.dispatch(cartAddItem({ item }))
  }

  // removeItem(id: string) {
  //   this.store.dispatch(cartDeleteItem,)
  // }

  // clearCart() {
  //   this.store.dispatch(cartClear)
  // }
}
