import { createReducer, on } from "@ngrx/store";
import { showUser } from "./login.actions";
import { userState } from "./login.state";

export const userIntialState: userState = {
  user: { email: "",
  apellido: "",
  nombre: "",
  role: "",
  token: ""
}
}


const _loginReducer = createReducer(
  userIntialState,

  on(showUser, (state, {usertoDisplay}) => {
        return {
      ...state,
      usertoDisplay
    };
  }),

);


export function loginReducer(state: any, action: any) {
  return _loginReducer(state, action);
}
