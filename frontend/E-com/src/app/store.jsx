import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reduxslice/productSlicer";
import userReducer from "../reduxslice/userslice"
import reviewReducer from "../reduxslice/ReviewSlice"
import cartReducer from "../reduxslice/cartSlice"
import orderReducer from "../reduxslice/orderSlice"

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        review: reviewReducer,
        cart: cartReducer,
        order: orderReducer
    },
});