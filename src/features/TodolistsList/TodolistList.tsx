import {
    addTodolistsThunkCreator,
    changeTodolistFilterACType,
    changeTodolistTitleThunkCreator,
    FilterPropsType,
    getTodolistsThunkCreator,
    removeTodolistsThunkCreator,
    TodolistDomainType
} from "./todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useAppDispatch} from "../../state/hooks";
import React, {useCallback, useEffect} from "react";
import {addTasksThunkCreator, deleteTasksThunkCreator, TasksPropsType, updateTaskThunkCreator} from "./task-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";


type TodolistListPropsType = {
    todolists: Array<TodolistDomainType>
}

type PropsType = {
    demo?: boolean
}


export const TodolistList: React.FC<PropsType> = ({demo=false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()




    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTasksThunkCreator(taskId, todolistId))
        /*let action = removeTaskAC(todoId, id)
        dispatch(action)*/
    }, [dispatch])

    const changeFilter = useCallback((todoId: string, value: FilterPropsType) => {
        let action = changeTodolistFilterACType(todoId, value)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTasksThunkCreator(todolistId, taskTitle))
        /*let action = addTaskAC(title, todoId)
        dispatch(action)*/
    }, [dispatch])


    /*const changeStatus = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskThunkCreator(todoId, taskId, status))
       /!* let action = changeTaskStatusAC(todoId, id, status)
        dispatch(action)*!/
    }, [])*/


    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoId: string) => {
        dispatch(updateTaskThunkCreator(taskId, {status}, todoId))
    }, [dispatch])


    const removeTodolist = useCallback((todoId: string) => {
        dispatch(removeTodolistsThunkCreator(todoId))
        /* let action = removeTodolistAC(todoId)
         dispatch(action)*/
    }, [dispatch])

    const addTodoList = useCallback((newTodoTitle: string) => {
        dispatch(addTodolistsThunkCreator(newTodoTitle))
        /*let action = addTodolistAC(newTodoTitle)
        dispatch(action)*/
    }, [dispatch])

    const changeTaskTitle = useCallback(( id: string, inputTitle: string, todoId: string) => {

        dispatch(updateTaskThunkCreator(id, {title: inputTitle}, todoId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoId: string, newTodoTitle: string) => {
        dispatch(changeTodolistTitleThunkCreator(todoId, newTodoTitle))
        /*let action = changeTodolistTitleAC(todoId, newTodoTitle)
        dispatch(action)*/
    }, [dispatch])


    useEffect(() => {
        if(demo || !isLoggedIn) {
            return
        }
        dispatch(getTodolistsThunkCreator())
    }, [dispatch, demo, isLoggedIn])



    if(!isLoggedIn) {
        return < Navigate to='/'/>
    }



    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>

            <Grid container spacing={3}>

                {todolists.map(tl => {

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                tasks={tasks[tl.id]}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </div>
    )

}