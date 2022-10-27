import {TasksPropsType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModuleType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "./store";


export type TasksActionType =
    removeTaskACType
    | addTaskACType
    | /*changeTaskStatusACType*/ updateTaskACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType
    | setTasksACType

let todolistId1 = v1()
let todolistId2 = v1()

let initialState: TasksPropsType = {}


export const taskReducer = (state = initialState, action: TasksActionType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASKS': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todoId]
            const newTasks = tasks.filter(t => t.id != action.payload.id);
            stateCopy[action.payload.todoId] = newTasks;
            return stateCopy
        }

        /*case 'ADD-TASKS': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todoId]
            let newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                status: TaskStatuses.New,
                todoListId: action.payload.todoId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
            stateCopy[action.payload.todoId] = [newTask, ...tasks]
            return stateCopy
        }*/

        case 'ADD-TASKS': {
            return {
                ...state,
                [action.payload.todoId]: [action.payload.task, ...state[action.payload.todoId]]
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
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map( (el) => el.id === action.payload.task.id ? {...el, ...action.payload.task} : el )
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.id ? {
                    ...task,
                    title: action.payload.inputTitle
                } : task)
            }
        }

        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.payload.newTodolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoId]
            return stateCopy
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS': {
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }

        default:
            return state
    }
}


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, id: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            id,
            todoId
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, task: TaskType) => {
    return {
        type: 'ADD-TASKS',
        payload: {
            todoId,
            task
        }
    } as const
}

/*export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = ( id: string, status: TaskStatuses, todoId: string,) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            status,
            todoId,
            id
        }
    } as const
}*/

//AC for updateTaskTH
export type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = ( id: string, task: TaskType, todoId: string,) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            task,
            todoId,
            id
        }
    } as const
}




export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoId: string, id: string, inputTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoId,
            id,
            inputTitle
        }
    } as const
}

export type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks, todolistId
    } as const
}


//==========================THUNK=========================



export const getTasksThunkCreator = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const deleteTasksThunkCreator = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTasksThunkCreator = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                dispatch(addTaskAC(todolistId, res.data.data.item))
            })
    }
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


//update любое значение в таске

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


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