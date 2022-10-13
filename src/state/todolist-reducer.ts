import {FilterPropsType, TodolistType} from "../AppWithReduser";
import {v1} from "uuid";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterAC

let todolistId1 = v1()
let todolistId2 = v1()

const initialState: Array<TodolistType> = [
    /*{todoId: todolistId1, todoTitle: 'What to learn', filter: 'all'},
    {todoId: todolistId2, todoTitle: 'What to buy', filter: 'all'},*/
]


export const todolistReducer = (state = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.todoId !== action.payload.todoId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {todoId: action.payload.newTodolistId, todoTitle: action.payload.newTodoTitle, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.todoId === action.payload.todoId ? {...tl, todoTitle: action.payload.newTodoTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            const todolist = state.find(tl => tl.todoId === action.payload.todoId);
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