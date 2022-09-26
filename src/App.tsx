import React, {useState} from 'react';
import './App.css';

import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";

export type TasksPropsType = {
    [key: string]: Array<TaskPropsType>
}
export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistType = {
    todoId: string,
    todoTitle: string,
    filter: FilterPropsType
}

export type FilterPropsType = 'all' | 'completed' | 'active'


export function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {todoId: todolistId1, todoTitle: 'What to learn', filter: 'all'},
            {todoId: todolistId2, todoTitle: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState<TasksPropsType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},
            ]
        }
    )


    function removeTask(todoId: string, id: string)  {
        let todolistTasks = tasks[todoId]
        tasks[todoId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
        /*let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)*/
    }

    function changeFilter(todoId: string, value: FilterPropsType) {
        let todolist = todolists.find(tl => tl.todoId === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todoId: string) {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks , [todoId]: [task, ...tasks[todoId]]})
        /*setTasks([task, ...tasks])*/
    }

    function changeStatus(todoId: string, id: string, isDone: boolean) {
        let todolistTasks = tasks[todoId]
        let task = todolistTasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
        /*
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }*/
    }

    function removeTodolist(todoId: string) {
        setTodolists(todolists.filter(tl => tl.todoId !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    function addTodoList(newTodoTitle: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {todoId: newTodolistId, todoTitle: newTodoTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: []})
    }

    function changeTaskTitle(todoId: string, id: string, inputTitle: string) {
        setTasks({ ...tasks, [todoId]: tasks[todoId].map(t => t.id == id ? {...t, title: inputTitle} : t)})
    }

    function changeTodolistTitle(todoId: string, newTodotitle: string) {
        const todolist = todolists.find(tl => tl.todoId === todoId)
        if(todolist) {
            todolist.todoTitle = newTodotitle
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.todoId]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => task.isDone === true)
                    }

                    return <Todolist
                        key={tl.todoId}
                        todoId={tl.todoId}
                        title={tl.todoTitle}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle = {changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}


