import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {taskReducer} from './task-reducer'
import {todolistReducer} from "./todolist-reducer";



const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {todoId: 'todolistId1', todoTitle: 'What to learn', filter: 'all'},
        {todoId: 'todolistId2', todoTitle: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storeFn: () =>  JSX.Element) => {
    return <Provider store={storyBookStore}> {storeFn()} </Provider>
}