import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CartEffects } from './store/cart.effect';
import { cartReducer } from './store/cart.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    HttpClientModule,
    EffectsModule.forFeature([CartEffects]),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('cart',cartReducer),
  ]
})
export class CartModule { }
