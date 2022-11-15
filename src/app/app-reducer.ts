import {Dispatch} from "redux";
import {AppActionsType} from "./store";
import {authAPI} from "../api/todolist-api";
import {setLoggedInAC} from "../features/Login/login-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}



export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', status
} as const)
export const setAppErrorAC = (error: string|null) => ({
    type: 'APP/SET-ERROR', error
} as const)
export const setAppInitializedAC = (value: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED', value
} as const)


export const initializedAppTC = () => (dispatch: ThunkDispatch) => {
    authAPI.me()
        .then( res => {
            if(res.data.resultCode === 0) {
                dispatch(setLoggedInAC(true))

            } else {

            }
            dispatch(setAppInitializedAC(true))
        })


}



export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type InitialStateType = typeof initialState
export type AppReducerActionsType = setAppStatusACType | setAppErrorACType | setAppInitializedACType
export type ThunkDispatch = Dispatch<AppActionsType>