import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "../../app/store";
import {RequestStatusType, setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/handle-error-utils";


let todolistId1 = v1()
let todolistId2 = v1()

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: TodolistActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoId)

        case 'ADD-TODOLIST':
            return [{
                id: action.newTodolistId,
                title: action.newTodoTitle,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]

        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todoId ? {...tl, title: action.status} : tl)

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todoId ? {...tl, title: action.newTodoTitle} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todoId ? {...tl, filter: action.value} : tl)

        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        default:
            return state
    }

}

//==========================ACTION CREATORS=========================
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todoId: string) => ({type: 'REMOVE-TODOLIST', todoId} as const)

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodoTitle: string) => ({
    type: 'ADD-TODOLIST',
    newTodolistId: v1(),
    newTodoTitle
} as const)

export const changeTodolistTitleAC = (todoId: string, newTodoTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todoId,
    newTodoTitle
} as const)

export const changeTodolistFilterACType = (todoId: string, value: FilterPropsType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todoId,
    value
} as const)

export const changeTodolistEntityStatusACType = (todoId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todoId,
    status
} as const)

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)


//==========================THUNK=========================

export const getTodolistsThunkCreator = (): AppThunkType => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch( error => {
                handleServerNetworkError(error,dispatch)
            })
    }
}

export const removeTodolistsThunkCreator = (todolistId: string): AppThunkType => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusACType(todolistId, 'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodolistsThunkCreator = (title: string): AppThunkType => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(title))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleThunkCreator = (todoId: string, newTodoTitle: string): AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.updateTodolist(todoId, newTodoTitle)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todoId, newTodoTitle))
            })
    }
}


//==========================TYPES=========================

export type TodolistActionType =
    | removeTodolistACType
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterACType>
    | setTodolistsACType
    | ReturnType<typeof changeTodolistEntityStatusACType>

export type FilterPropsType = 'all' | 'completed' | 'active'
export type TodolistDomainType = TodolistType & {
    filter: FilterPropsType
    entityStatus: RequestStatusType
}
export type ThunkDispatch = Dispatch<AppActionsType | setAppStatusACType>
