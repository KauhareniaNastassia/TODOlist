import axios, {AxiosResponse} from 'axios'

/*const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '29ceddd9-9101-4a31-9b64-db4216d3334c',
    },
}*/

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '29ceddd9-9101-4a31-9b64-db4216d3334c',
    }
})


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<T = {}> = {
    data: T,
    messages: string[],
    resultCode: number,
    fieldsError: string[]
}


export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}



type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskModuleType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<{taskTitle: string}, AxiosResponse<ResponseType<{ item: TaskType}>>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModuleType) {
        return instance.put<UpdateTaskModuleType, AxiosResponse<ResponseType<{item: TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
