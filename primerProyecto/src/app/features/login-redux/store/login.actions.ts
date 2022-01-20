import { createAction, props } from "@ngrx/store";
import { userDisplay } from "../../login-redux/user..model";


export const showUser = createAction(
'Login - Show data user',
props<{usertoDisplay: userDisplay}>()

)
