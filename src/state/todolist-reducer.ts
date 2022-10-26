import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "./store";


export type TodolistActionType = removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterACType
    | setTodolistsACType


let todolistId1 = v1()
let todolistId2 = v1()

export type FilterPropsType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterPropsType
}


const initialState: Array<TodolistDomainType> = []


export const todolistReducer = (state = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todoId)
        }

        case 'ADD-TODOLIST': {
            let newTodolist: TodolistDomainType = {
                id: action.payload.newTodolistId,
                title: action.payload.newTodoTitle,
                filter: 'all',
                addedDate: '',
                order: 0,
            }
            return [newTodolist, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todoId ? {
                ...tl,
                todoTitle: action.payload.newTodoTitle
            } : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.payload.todoId);
            if (todolist) {
                todolist.filter = action.payload.value;
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        }

        default:
            return state
    }

}


export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoId
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodoTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistId: v1(),
            newTodoTitle
        }
    } as const
}

export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todoId: string, newTodoTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoId,
            newTodoTitle
        }
    } as const
}

export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterACType>
export const changeTodolistFilterACType = (todoId: string, value: FilterPropsType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoId,
            value
        }
    } as const
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {todolists}
    } as const
}


//==========================THUNK=========================


export const getTodolistsThunkCreator = (): AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

/*
export const getTodolistsThunkCreator = (): AppThunkType => async dispatch => {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
}
*/




