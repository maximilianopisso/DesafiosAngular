import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieAPI } from "src/app/models/movieAPI.model";
import { CartState } from "./cart-store.state";


export const cartStateSelector = createFeatureSelector<CartState>('cart');

export const cartItemsSelector = createSelector (
    cartStateSelector,
    (state: CartState) => state
);
