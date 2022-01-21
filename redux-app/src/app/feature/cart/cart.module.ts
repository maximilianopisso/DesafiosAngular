import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cartReducer } from './store/cart.reducer';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    StoreModule.forFeature('cart',cartReducer)
  ]
})
export class CartModule { }



