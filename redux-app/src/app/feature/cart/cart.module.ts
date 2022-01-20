import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createReducer, StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { CartComponent } from './cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    //CartRoutingModule,
    StoreModule.forFeature('cart',cartReducer)
  ]
})
export class CartModule { }



