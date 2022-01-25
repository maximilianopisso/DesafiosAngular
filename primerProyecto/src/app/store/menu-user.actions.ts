import { createAction, props } from "@ngrx/store";

export const userDiplay = createAction(
  'Menu-Bar display name and role',     //  String con Nombre de la Accion , debe ser unico e irrepetible
  props<{username:string,role: string}>()
);

export const cleanStore = createAction(
  'Clean Store States',     //  String con Nombre de la Accion , debe ser unico e irrepetible

);
