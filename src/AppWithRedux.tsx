import React, {useCallback} from 'react';
import './App.css';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";

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


function AppWithRedux() {

    /*let todolistId1 = v1()
    let todolistId2 = v1()*/

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useDispatch()

    /*let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
            {todoId: todolistId1, todoTitle: 'What to learn', filter: 'all'},
            {todoId: todolistId2, todoTitle: 'What to buy', filter: 'all'},
        ]
    )*/

    /*let [tasks, dispatchToTasks] = useReducer(taskReducer, {
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
    )*/

    const removeTask = useCallback((todoId: string, id: string) => {
        let action = removeTaskAC(todoId, id)
        dispatch(action)
    }, [])

    const changeFilter = useCallback ((todoId: string, value: FilterPropsType) => {
        let action = changeTodolistFilterAC(todoId, value)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoId: string) => {
        let action = addTaskAC(title, todoId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((todoId: string, id: string, isDone: boolean) => {
        let action = changeTaskStatusAC(todoId, id, isDone)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todoId: string) =>  {
        let action = removeTodolistAC(todoId)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((newTodoTitle: string) => {
        let action = addTodolistAC(newTodoTitle)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todoId: string, id: string,inputTitle: string) => {
        let action = changeTaskTitleAC(todoId, id, inputTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback ((todoId: string, newTodoTitle: string) => {
        let action = changeTodolistTitleAC(todoId, newTodoTitle)
        dispatch(action)
    }, [dispatch])


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todolists.map(tl => {

                    /*let allTodolistTasks = tasks[tl.todoId]
                    let tasksForTodolist = allTodolistTasks
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.todoId].filter(task => task.isDone === true)
                    }*/

                    return <Todolist
                            key={tl.todoId}
                            //todolist={tl}
                            todoId={tl.todoId}
                            title={tl.todoTitle}
                            tasks={tasks[tl.todoId]}
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

export default AppWithRedux;
