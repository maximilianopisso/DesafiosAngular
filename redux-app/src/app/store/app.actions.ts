import { createAction, props } from "@ngrx/store";

export const AppSetTitle = createAction(
  'Application Set Title',     //  String con Nombre de la Accion , debe ser unico e irrepetible
  props<{title:string}>()
  
);
