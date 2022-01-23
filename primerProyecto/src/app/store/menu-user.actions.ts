import { createAction, props } from "@ngrx/store";

export const userDiplay = createAction(
  'Application Set Title',     //  String con Nombre de la Accion , debe ser unico e irrepetible
  props<{username:string,role: string}>()

);
