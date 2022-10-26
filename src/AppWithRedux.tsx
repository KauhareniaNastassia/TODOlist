import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    addTodolistAC,
    changeTodolistFilterACType,
    changeTodolistTitleAC,
    FilterPropsType, getTodolistsThunkCreator,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {
    addTaskAC, addTasksThunkCreator,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTasksThunkCreator,
    removeTaskAC
} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./state/store";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {TaskStatuses, TaskType, todolistAPI} from "./api/todolist-api";
import {useAppDispatch} from "./state/hooks";

export type TasksPropsType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useAppDispatch()


    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTasksThunkCreator(todolistId, taskId))
        /*let action = removeTaskAC(todoId, id)
        dispatch(action)*/
    }, [])

    const changeFilter = useCallback((todoId: string, value: FilterPropsType) => {
        let action = changeTodolistFilterACType(todoId, value)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTasksThunkCreator(todolistId, taskTitle))

        /*let action = addTaskAC(title, todoId)
        dispatch(action)*/
    }, [])

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



    useEffect( () => {
        dispatch(getTodolistsThunkCreator())
    }, [] )


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
