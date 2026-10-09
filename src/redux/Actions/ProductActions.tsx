
import type { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import type { ApiResult, Dispatch, Product } from "../../types/Types"
import { axiosInstance } from "../../utils/axiosInstance"
import {  featuredProductsSuccess, onSaleProductsSuccess, productReqApi, productReqApiFailure } from "../Reducers/ProductReducer"




const fetchProducts = async (url: string, actionSuccess: ActionCreatorWithPayload<Product[]> , dispatch : Dispatch) =>{
    try {
        dispatch(productReqApi())
        const res = await axiosInstance.get<ApiResult<Product[]>>(url)
        if (res.status === 200 && res.data.payload) {
           dispatch(actionSuccess(res.data.payload))
        }
    } catch (error : any) {
        dispatch(productReqApiFailure(error.message))
    }
}

export const fetchOnSaleProducts =  () => (dispatch : Dispatch) =>{ (fetchProducts("/api/product/OnSale" ,  onSaleProductsSuccess , dispatch ) )}
export const fetchFeaturedProducts =  () => (dispatch : Dispatch) =>{ (fetchProducts("/api/product/Featured" ,  featuredProductsSuccess , dispatch ) )}