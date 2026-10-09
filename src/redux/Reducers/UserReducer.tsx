import { createAction, createReducer, type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { User } from "../../types/Types"



const intialState : User = {
    userId : "",
    username: "",
    email: "",
    role: 0,
    loading: false,
    profilePicUrl : "",
    phone : ""

}


export const reqApi = createAction("REQ_API");    // only action name is mentioned 

export const userReqSuccess = createAction<User>("USER_REQ_SUCCESS");   // 

export const reqApiFailure = createAction("REQ_API_FAILURE");

// export const updateMessage = createAction<string>("UPDATE_MESSAGE");



export const userReducer = createReducer(intialState, (builder : ActionReducerMapBuilder<User> ) => {

    builder.addCase(reqApi, (state  ) => {
        state.loading =  true
    })

    builder.addCase( userReqSuccess, (state, action ) => {
        // state = action.payload
        Object.assign(state , action.payload)
        state.loading = false
    })

    builder.addCase(reqApiFailure, (state) => {
        state.loading = false
    })

})







      // state.userId = action.userId
        // state.username = action.username
        // state.email = action.email
        // state.isAdmin = action.isAdmin
        // state.role = action.role
        // state.loading = false