import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app-state.model";

export const appSelector = (state: any) => state.app;

export const appTitleSelector = createSelector(
  appSelector,
  (state: AppState) => state.title
);