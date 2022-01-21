import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loginReducer } from './store/login.reducer';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutinModule } from './login-routing.module';




@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    CommonModule,
    StoreModule.forFeature('user', loginReducer),
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutinModule,
  ]
})

export class LoginModule { }



