import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';





const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)   // importante
    ],
   })
export class LoginRoutinModule {}
