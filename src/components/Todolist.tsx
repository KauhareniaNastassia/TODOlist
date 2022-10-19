import React, {useCallback} from 'react';

import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterPropsType} from "../state/todolist-reducer";

type TodolistPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoId: string, id: string) => void
    changeFilter: (todoId: string, value: FilterPropsType) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (todoId: string, id: string, status: TaskStatuses) => void
    filter: FilterPropsType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (todoId: string, id: string, inputTitle: string) => void
    changeTodolistTitle: (todoId: string, newTodotitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {


    let onClickAllHandler = useCallback(() => {
        props.changeFilter(props.todoId, 'all')
    }, [props.todoId, props.changeFilter])
    let onClickActiveHandler = useCallback (() => {
        props.changeFilter(props.todoId, 'active')
    }, [props.todoId, props.changeFilter])
    let onClickCompletedHandler = useCallback(() => {
        props.changeFilter(props.todoId, 'completed')
    }, [props.todoId, props.changeFilter])



    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoId)
    }, [props.addTask, props.todoId])

    let removeTodolistHandler = () => {
        props.removeTodolist(props.todoId)
    }

    const onChangeTodolistTitleHandler = useCallback((newTodoTitle: string) => {
        props.changeTodolistTitle(props.todoId, newTodoTitle)
    }, [props.changeTodolistTitle, props.todoId])

    let tasks =[...props.tasks]
    if (props.filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    let removeTask = useCallback((id: string) => {
        props.removeTask(props.todoId, id)
    }, [props.removeTask, props.todoId])

    let changeStatus = useCallback((id: string, newStatusTask: TaskStatuses) => {
        props.changeStatus(props.todoId, id, newStatusTask)
    }, [props.todoId, props.changeStatus])

    let changeTaskTitle = useCallback ((id: string, inputTitle: string) => {
        props.changeTaskTitle(props.todoId, id, inputTitle)
    }, [props.changeTaskTitle, props.todoId])



    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={onChangeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}> ✖</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                task = {task}
                                removeTask={removeTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}

                            />
                        )
                    })}
            </div>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickAllHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickActiveHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
})

