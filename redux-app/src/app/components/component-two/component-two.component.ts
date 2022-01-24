import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSetTitle } from 'src/app/store/app.actions';

@Component({
  selector: 'app-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss']
})
export class ComponentTwoComponent implements OnInit {

  constructor(
    private store:Store
  ) { }

    ngOnInit(): void {
      this.store.dispatch(AppSetTitle ({title:"Componente Two"}))
    }

}
