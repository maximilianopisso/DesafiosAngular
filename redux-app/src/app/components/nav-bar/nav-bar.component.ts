import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { appTitleSelector } from 'src/app/store/app.selectors';
import {AppState} from '../../store/app-state.model'


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  //title = "Redux App";
  title$: Observable<String> = of('')
  
  ngOnInit(): void {

    this.title$ = this.store.pipe(
      select(appTitleSelector)
    )

  }

}
