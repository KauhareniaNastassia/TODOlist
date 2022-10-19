import React, {useCallback} from 'react';
import './App.css';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterPropsType,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksPropsType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback((todoId: string, id: string) => {
        let action = removeTaskAC(todoId, id)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((todoId: string, value: FilterPropsType) => {
        let action = changeTodolistFilterAC(todoId, value)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoId: string) => {
        let action = addTaskAC(title, todoId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((todoId: string, id: string, status: TaskStatuses) => {
        let action = changeTaskStatusAC(todoId, id, status)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todoId: string) => {
        let action = removeTodolistAC(todoId)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((newTodoTitle: string) => {
        let action = addTodolistAC(newTodoTitle)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todoId: string, id: string, inputTitle: string) => {
        let action = changeTaskTitleAC(todoId, id, inputTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoId: string, newTodoTitle: string) => {
        let action = changeTodolistTitleAC(todoId, newTodoTitle)
        dispatch(action)
    }, [dispatch])


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(tl => {

                    return <Todolist
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default AppWithRedux;
