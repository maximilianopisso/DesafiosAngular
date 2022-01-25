import { Action, createReducer, on } from '@ngrx/store';
import { userState } from './user-state.model';
import { cleanStore, userDiplay } from './menu-user.actions';

export const userInitialState: userState = { username: "", role: "" }


const _appReducer = createReducer(
  userInitialState,
  on(userDiplay, (state, { username, role }) => {
    return {
      ...state,
      username: username,
      role: role
    };
  }),

  on(cleanStore, () => ({
    ...userInitialState
  }))

);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}
