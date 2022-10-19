import {v1} from "uuid";
import {TodolistType} from "../api/todolist-api";



type ActionType = removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeTodolistFilterAC

let todolistId1 = v1()
let todolistId2 = v1()

export type FilterPropsType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterPropsType
}


const initialState: Array<TodolistDomainType> = []


export const todolistReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todoId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.payload.newTodolistId,
                title: action.payload.newTodoTitle,
                filter: 'all',
                addedDate: '',
                order: 0,
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todoId ? {...tl, todoTitle: action.payload.newTodoTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            const todolist = state.find(tl => tl.id === action.payload.todoId);
            if (todolist) {
                todolist.filter = action.payload.value;
            }
            return [...state]
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

export type changeTodolistFilterAC =  ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todoId: string, value: FilterPropsType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoId,
            value
        }
    } as const
}