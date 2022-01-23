import { RouteConfigLoadEnd } from '@angular/router';
import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from './app-state.model';
import { AppSetTitle } from './app.actions';

export const appInitialState: AppState = { title: "", role: "" }


const _appReducer = createReducer(
  appInitialState,
  on(AppSetTitle, (state, { title, role }) => {
    return {
      ...state,
      title: title,
      role: role
    };
  })
);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}
