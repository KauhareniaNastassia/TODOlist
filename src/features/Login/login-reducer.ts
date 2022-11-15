import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType} from "../../app/store";
import {setAppErrorACType, setAppStatusAC, setAppStatusACType,} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handle-error-utils";


let initialState = {
    isLoggedIn: false
}

export const authReducer = (state: LoginStateType = initialState, action: LoginActionsType): LoginStateType => {
    switch (action.type) {
        case 'login/SET-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


//==========================ACTION CREATORS=========================


export const setLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-LOGGED-IN', value} as const)


//==========================THUNK=========================

export const loginThunkCreator = (data: LoginParamsType) => (dispatch:ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


export const logoutThunkCreator = () => (dispatch:ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//==========================TYPES=========================

export type LoginStateType = typeof initialState

export type LoginActionsType = ReturnType<typeof setLoggedInAC> | setAppStatusACType | setAppErrorACType

export type ThunkDispatch = Dispatch<AppActionsType | setAppStatusACType | setAppErrorACType>