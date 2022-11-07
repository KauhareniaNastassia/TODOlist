import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModuleType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";


let todolistId1 = v1()
let todolistId2 = v1()

let initialState: TasksPropsType = {}

export const taskReducer = (state = initialState, action: TasksActionType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.todoId]:state[action.todoId].filter(t => t.id != action.id)
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
                [action.todoId]: state[action.todoId].map( (el) => el.id === action.task.id ? {...el, ...action.task} : el )
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


export const removeTaskAC = (todoId: string, id: string) =>
    ({type: 'REMOVE-TASKS', id, todoId} as const)

export const addTaskAC = (todoId: string, task: TaskType) =>
    ({type: 'ADD-TASKS', todoId, task}as const)

/*
export const changeTaskStatusAC = ( id: string, status: TaskStatuses, todoId: string,) => ({type: 'CHANGE-TASK-STATUS', status, todoId, id} as const)
*/
//AC for updateTaskTH
export const updateTaskAC = ( id: string, task: TaskType, todoId: string,) =>
    ({type: 'UPDATE-TASK', task, todoId, id} as const)

export const changeTaskTitleAC = (todoId: string, id: string, inputTitle: string) =>
    ({type: 'CHANGE-TASK-TITLE', todoId, id, inputTitle} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


//==========================THUNK=========================

export const getTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }

export const deleteTasksThunkCreator = (taskId: string, todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }

export const addTasksThunkCreator = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(todolistId, res.data.data.item))
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
export const updateTaskThunkCreator = (todolistId: string, taskId: string, value: UpdateTaskType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (task) {
        const model: UpdateTaskModuleType = {
            ...task,
            ...value
        }
        todolistAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
            })
    }
}



//==========================TYPES=========================

export type TasksPropsType = {
    [key: string]: Array<TaskType>
}

export type UpdateTaskType = {
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