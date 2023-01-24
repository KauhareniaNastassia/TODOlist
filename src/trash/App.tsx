import React, {useState} from 'react';
import '../app/App.css';

import {v1} from "uuid";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterPropsType, TodolistDomainType} from "../features/TodolistsList/todolist-reducer";


export type TasksPropsType = {
    [key: string]: Array<TaskType>
}

export function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>(
        [
            {
                id: todolistId1,
                title: 'What to learn',
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "idle"
            },
            {
                id: todolistId2,
                title: 'What to buy',
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "idle"
            },
        ]
    )

    let [tasks, setTasks] = useState<TasksPropsType>({
            [todolistId1]: [
                {
                    id: v1(),
                    title: "HTML&CSS",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId1,
                    description: '',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                },
                {
                    id: v1(),
                    title: "ReactJS",
                    status: TaskStatuses.New,
                    todoListId: todolistId1,
                    description: '',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                }
            ],
            [todolistId2]: [
                {
                    id: v1(),
                    title: "Rest API",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    description: '',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                },
                {
                    id: v1(),
                    title: "GraphQL",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    description: '',
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low
                }
            ]
        }
    )


    function removeTask(todoId: string, id: string) {
        let todolistTasks = tasks[todoId]
        tasks[todoId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function changeFilter(todoId: string, value: FilterPropsType) {
        let todolist = todolists.find(tl => tl.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, id: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId1,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        setTasks({...tasks, [id]: [task, ...tasks[id]]})
    }

    function changeStatus( id: string, status: TaskStatuses, todoId: string) {
        let todolistTasks = tasks[todoId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }

    function removeTodolist(todoId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    function addTodoList(newTodoTitle: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: newTodoTitle, filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTaskTitle(todoId: string, id: string, inputTitle: string) {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id == id ? {...t, title: inputTitle} : t)})
    }

    function changeTodolistTitle(todoId: string, newTodotitle: string) {
        const todolist = todolists.find(tl => tl.id === todoId)
        if (todolist) {
            todolist.title = newTodotitle
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.New)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.Completed)
                    }

                    return <Todolist
                        key={tl.id}
                        todolist={tl}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}

                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}


