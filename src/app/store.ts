import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer, TasksActionType} from "../features/TodolistsList/task-reducer";
import {TodolistActionType, todolistReducer} from "../features/TodolistsList/todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {LoginActionsType, authReducer} from "../features/Login/login-reducer";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootStateType = ReturnType<typeof rootReducer> //<typeof store.getState>

export type AppActionsType = TodolistActionType | TasksActionType | LoginActionsType | AppReducerActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store