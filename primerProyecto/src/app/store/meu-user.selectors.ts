import { createSelector } from "@ngrx/store";
import { userState } from "./user-state.model";



export const appSelector = (state: any) => state.app;

export const userDisplaySelector = createSelector(
  appSelector,
  (state: userState) => state.username
);
