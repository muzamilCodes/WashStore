
import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./Reducers/UserReducer"
import { productReducer } from "./Reducers/ProductReducer";




const store = configureStore({

    reducer: {
        loggedInUser: userReducer ,
        products : productReducer
    }
})


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store