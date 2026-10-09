import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/UserReducer";
import { productReducer } from "./Reducers/ProductReducer";
import { cartReducer } from "./Reducers/CartReducer";
import { wishlistReducer } from "./Reducers/WishlistReducer";

const store = configureStore({
  reducer: {
    loggedInUser: userReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;