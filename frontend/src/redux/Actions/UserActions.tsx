
import type { ApiResult, Dispatch, User, userForm } from "../../types/Types"
import { reqApi, reqApiFailure, userReqSuccess } from "../Reducers/UserReducer";
import { axiosInstance } from "../../utils/axiosInstance";





export const handlRegister =
    (e: React.MouseEvent<HTMLButtonElement>, formBody: userForm) =>

        async (dispatch: Dispatch): Promise<void> => {
            e.preventDefault()
            try {
                dispatch(reqApi())
                const res = await axiosInstance.post<ApiResult<User>>("/api/user/register", formBody)
                if (res.status === 200 && res.data.payload) {
                    console.log(res.data.payload)
                    dispatch(userReqSuccess(res.data.payload))
                } else {
                    throw new Error("Network Error !")
                }
            } catch (error) {
                dispatch(reqApiFailure())
                throw new Error("Network Error !")
            }
        }




export const handlLogin =
    (e: React.MouseEvent<HTMLButtonElement>, formBody: userForm) =>
        async (dispatch: Dispatch): Promise<void> => {

            e.preventDefault()

            try {
                dispatch(reqApi())
                const res = await axiosInstance.post<ApiResult<User>>("/api/user/login", formBody)

                if (res.status === 200 && res.data.payload) {

                    dispatch(userReqSuccess(res.data.payload))

                } else {
                    throw new Error("Network Error !")
                }

            } catch (error) {
                dispatch(reqApiFailure())
                console.log(error)
            }
        }




export const fetchUser = () => async (dispatch: Dispatch): Promise<void> => {


    try {

        dispatch(reqApi())

        const res = await axiosInstance.get<ApiResult<User>>("/api/user/fetch")

        if (res.status === 200 && res.data.payload) {

            dispatch(userReqSuccess(res.data.payload))
        }

    } catch (error) {
        dispatch(reqApiFailure())
        console.log(error)
    }





}