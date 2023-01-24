import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModuleType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";
import {
    setAppErrorAC, setAppErrorACType,
    setAppStatusAC, setAppStatusACType,

} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handle-error-utils";


let todolistId1 = v1()
let todolistId2 = v1()

let initialState: TasksPropsType = {}

export const taskReducer = (state = initialState, action: TasksActionType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.todoId]:state[action.todoId].filter(t => t.id !== action.id)
            }

        case 'ADD-TASKS': {
            return {
                ...state,
                [action.todoId]: [action.task, ...state[action.todoId]]
            }
        }

        /*case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.payload.todoId];
            let newTasksArray = todolistTasks.map(t => t.id === action.payload.id ? {
                ...t,
                isDone: action.payload.status
            } : t);

            state[action.payload.todoId] = newTasksArray;
            return ({...state});
        }*/
        //case for updateTaskTH
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map( (el) => el.id === action.id ? {...el, ...action.model} : el )
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(task => task.id === action.id ? {
                    ...task,
                    title: action.inputTitle
                } : task)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.newTodolistId]: []}


        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.todoId]
            return stateCopy

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }

        default:
            return state
    }
}


//==========================ACTION CREATORS=========================


export const removeTaskAC = (id: string, todoId: string) =>
    ({type: 'REMOVE-TASKS', id, todoId} as const)

export const addTaskAC = (todoId: string, task: TaskType) =>
    ({type: 'ADD-TASKS', todoId, task}as const)

/*
export const changeTaskStatusAC = ( id: string, status: TaskStatuses, todoId: string,) => ({type: 'CHANGE-TASK-STATUS', status, todoId, id} as const)
*/
//AC for updateTaskTH
export const updateTaskAC = ( id: string,  model: UpdateModelTaskType, todoId: string,) =>
    ({type: 'UPDATE-TASK', model, todoId, id} as const)

export const changeTaskTitleAC = (todoId: string, id: string, inputTitle: string) =>
    ({type: 'CHANGE-TASK-TITLE', todoId, id, inputTitle} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


//==========================THUNK=========================

export const getTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch<AppActionsType | setAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }

export const deleteTasksThunkCreator = (taskId: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }

export const addTasksThunkCreator = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<AppActionsType | setAppErrorACType | setAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(addTaskAC(todolistId, res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

/*export const updateTaskThunkCreator = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const task = getState().tasks[todolistId].find((t) => t.id === taskId)

    if (task) {
        const model: UpdateTaskModuleType = {
            ...task,
            status
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}*/

//how to update любое значение в таске
export const updateTaskThunkCreator = (taskId: string, value: UpdateModelTaskType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (task) {
        const model: UpdateTaskModuleType = {
            ...task,
            ...value
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}



//==========================TYPES=========================

export type TasksPropsType = {
    [key: string]: Array<TaskType>
}

export type UpdateModelTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    /*ReturnType<typeof changeTaskStatusAC>*/
    | ReturnType<typeof changeTaskTitleAC>
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType
    | ReturnType<typeof setTasksAC>

export type ThunkDispatch = Dispatch<AppActionsType | setAppStatusACType | setAppErrorACType>