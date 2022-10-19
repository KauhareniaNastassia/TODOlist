import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',

}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '29ceddd9-9101-4a31-9b64-db4216d3334c'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

        /*axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })*/
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)


    const createTodolistHandler = () => {

        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={title}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
            <button onClick={createTodolistHandler}> Create Todolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolistHandler = () => {

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={deleteTodolistHandler}> Delete Todolist</button>
        </div>
    </div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTodolistHandler = () => {

        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTodolistHandler}> Update Todolist</button>
        </div>
    </div>
}


//--------------------------

export const GetTasks = () => {
    const [state, setState] = useState<any>()
    const [todolistId, setTodolistId] = useState<any>()

    const getTasksHandler = () => {

        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={getTasksHandler}> Create Tasks</button>
        </div>
    </div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)

    const createTasksHandler = () => {

        todolistAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={'taskTitle'}
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.currentTarget.value)}
            />
            <button onClick={createTasksHandler}> Create Tasks</button>
        </div>
    </div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <button onClick={deleteTask}> Delete task</button>
        </div>
    </div>

}


export const UpdateTasks = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)

    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    const updateTaskHandler = () => {

        todolistAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''

        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
            <input
                placeholder={'taskTitle'}
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
            <input
                placeholder={'description'}
                value={description}
                onChange={(e) => {
                    setDescription(e.currentTarget.value)
                }}/>
            <input
                placeholder={'status'}
                value={status}
                type="number"
                onChange={(e) => {
                    setStatus(+e.currentTarget.value)
                }}/>
            <input
                placeholder={'priority'}
                value={priority}
                type="number"
                onChange={(e) => {
                    setPriority(+e.currentTarget.value)
                }}/>
            {/*
            <input
                placeholder={'taskTitle'}
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>
            <input
                placeholder={'taskTitle'}
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.currentTarget.value)
                }}/>*/}
            <button onClick={updateTaskHandler}> Update Task</button>
        </div>
    </div>
}
