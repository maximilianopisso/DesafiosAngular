import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from './app-state.model';
import { AppSetTitle } from './app.actions';

export const appInitialState: AppState = { title: "Redux App (from State)" }


const _appReducer = createReducer(
  appInitialState,
  on(AppSetTitle, (state, { title }) => {
    return {
      ...state,
      title: title
    };
  })
);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}