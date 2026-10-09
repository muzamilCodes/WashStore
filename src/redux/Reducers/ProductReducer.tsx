import { createAction, createReducer, type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { Product } from "../../types/Types"
import { featuredProducts, onSaleProducts } from "../../data/Products"





interface IOnSaleProducts {
    onSaleProducts: Product[]
    featuredProducts: Product[]
    loading: boolean
    message: string
}


const intialState: IOnSaleProducts = {
    onSaleProducts: onSaleProducts,   // data seeding 
    featuredProducts: featuredProducts,
    loading: false,
    message: ""
}





export const productReqApi = createAction("PRODUCT_REQ_API");    // only action name is mentioned 

export const onSaleProductsSuccess = createAction<Product[]>("ONSALE_PRODUCTS_SUCCESS");   // 

export const featuredProductsSuccess = createAction<Product[]>("FEATURED_PRODUCTS_SUCCESS");   // 

export const productReqApiFailure = createAction<string>("PRODUCT_REQ_API_FAILURE");



export const productReducer = createReducer(intialState, (builder: ActionReducerMapBuilder<IOnSaleProducts>) => {

    builder.addCase(productReqApi, (state) => {
        state.loading = true
    })
    builder.addCase(onSaleProductsSuccess, (state, action) => {
        state.onSaleProducts = action.payload
        state.loading = false
    })
    
    builder.addCase(featuredProductsSuccess, (state, action) => {
        state.featuredProducts = action.payload
        state.loading = false
    })
    builder.addCase(productReqApiFailure, (state, action) => {
        state.loading = false
        state.message = action.payload ?? "Network Error ! "
    })

})