import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {taskReducer} from '../features/TodolistsList/task-reducer'
import {todolistReducer} from "../features/TodolistsList/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/login-reducer";



const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, todoListId: 'todolistId1',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.New, todoListId: 'todolistId1',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: 'todolistId2',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'React Book', status: TaskStatuses.New, todoListId: 'todolistId2',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        error: null,
        status: "idle",
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState,  applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (storeFn: () =>  JSX.Element) => {
    return <Provider store={storyBookStore}> {storeFn()} </Provider>
}