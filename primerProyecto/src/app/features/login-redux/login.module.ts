import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginReducer } from './store/login.reducer';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('user', loginReducer)
  ]
})

export class LoginModule { }
