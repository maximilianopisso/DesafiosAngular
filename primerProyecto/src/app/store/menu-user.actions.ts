import { createAction, props } from "@ngrx/store";

export const userDiplay = createAction(
  'User - Set username and role',     //  String con Nombre de la Accion , debe ser unico e irrepetible
  props<{username:string,role: string}>()
);

export const userClear = createAction(
  'User - Clear Data',     //  String con Nombre de la Accion , debe ser unico e irrepetible

);
