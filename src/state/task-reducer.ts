import {TasksPropsType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";


type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addTodolistACType | removeTodolistACType

let todolistId1 = v1()
let todolistId2 = v1()

let initialState: TasksPropsType = {}



export const taskReducer = (state = initialState, action: ActionType): TasksPropsType => {
    switch (action.type) {
        case 'REMOVE-TASKS':{
            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todoId]
            const newTasks = tasks.filter(t => t.id != action.payload.id);
            stateCopy[action.payload.todoId] = newTasks;
            return stateCopy
        }
        case 'ADD-TASKS': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todoId]
            let newTask: TaskType = {id: v1(), title: action.payload.title, status: TaskStatuses.New, todoListId: action.payload.todoId,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
            stateCopy[action.payload.todoId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS':{
            let todolistTasks = state[action.payload.todoId];
            let newTasksArray = todolistTasks.map(t => t.id === action.payload.id ? {...t, isDone: action.payload.status} : t);

            state[action.payload.todoId] = newTasksArray;
            return ({...state});
        }

        case 'CHANGE-TASK-TITLE': {
            return {
            ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.id ? {...task, title: action.payload.inputTitle} : task)
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

        default:
            return state
    }

}


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoId: string, id: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            todoId,
            id
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoId: string) => {
    return {
        type: 'ADD-TASKS',
        payload: {
            todoId,
            title
        }
    } as const
}

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoId: string, id: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoId,
            id,
            status
        }
    } as const
}

export type changeTaskTitleACType =  ReturnType<typeof changeTaskTitleAC>
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

