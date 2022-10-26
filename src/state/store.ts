import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer, TasksActionType} from "./task-reducer";
import {TodolistActionType, todolistReducer} from "./todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppRootStateType = ReturnType<typeof rootReducer> //<typeof store.getState>

export type AppActionsType = TodolistActionType | TasksActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

//@ts-ignore
window.store = store