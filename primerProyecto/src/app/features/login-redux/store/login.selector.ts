import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userState } from "./login.state";





export const loginStateSelector = createFeatureSelector<userState>('user');

export const logintSelector = createSelector(
  loginStateSelector,
  (state: userState) => state.user
);
