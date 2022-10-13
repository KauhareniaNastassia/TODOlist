import React, {useReducer} from 'react';
import './App.css';

import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";

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


function AppWithReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
            {todoId: todolistId1, todoTitle: 'What to learn', filter: 'all'},
            {todoId: todolistId2, todoTitle: 'What to buy', filter: 'all'},
        ]
    )

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
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
        let action = removeTaskAC(todoId, id)
        dispatchToTasks(action)
    }

    function changeFilter(todoId: string, value: FilterPropsType) {
        let action = changeTodolistFilterAC(todoId, value)
        dispatchToTodolists(action)

    }

    function addTask(title: string, todoId: string) {
        let action = addTaskAC(title, todoId)
        dispatchToTasks(action)
    }

    function changeStatus(todoId: string, id: string, isDone: boolean) {
        let action = changeTaskStatusAC(todoId, id, isDone)
        dispatchToTasks(action)
    }

    function removeTodolist(todoId: string) {
        let action = removeTodolistAC(todoId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function addTodoList(newTodoTitle: string) {
        let action = addTodolistAC(newTodoTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTaskTitle(todoId: string, id: string, inputTitle: string) {
        let action = changeTaskTitleAC(todoId, id, inputTitle)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(todoId: string, newTodotitle: string) {
        let action = changeTodolistTitleAC(todoId, newTodotitle)
        dispatchToTodolists(action)
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

export default AppWithReducer;
