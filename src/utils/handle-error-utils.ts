import {setAppErrorAC, setAppErrorACType, setAppStatusAC, setAppStatusACType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<setAppErrorACType | setAppStatusACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}


export const handleServerNetworkError = (error: any, dispatch: Dispatch<setAppErrorACType | setAppStatusACType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some message occurred"))
    dispatch(setAppStatusAC('failed'))
}
