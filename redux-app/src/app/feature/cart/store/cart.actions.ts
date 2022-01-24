import { createAction, props } from "@ngrx/store";
import { CartItem } from "./cart.model";

export const cartAddItem = createAction(
    'Cart - Add item',
    props<{item:CartItem}>()
);

export const cartDeleteItem= createAction(
    'Cart - Delete item',
    props<{itemId:string}>()
);

export const cartClear = createAction(
    'Cart - Clear Cart',
);

