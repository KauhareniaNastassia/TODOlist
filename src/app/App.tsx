import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    addTodolistAC, addTodolistsThunkCreator,
    changeTodolistFilterACType,
    changeTodolistTitleAC, changeTodolistTitleThunkCreator,
    FilterPropsType,
    getTodolistsThunkCreator,
    removeTodolistAC, removeTodolistsThunkCreator,
    TodolistDomainType
} from "../features/TodolistsList/todolist-reducer";
import {
    addTasksThunkCreator,
    changeTaskTitleAC,
    deleteTasksThunkCreator,
    updateTaskThunkCreator
} from "../features/TodolistsList/task-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {useAppDispatch} from "../state/hooks";
import {TodolistList} from "../features/TodolistsList/TodolistList";

function App() {
    return (
        <div className="App">
            <TodolistList/>
        </div>
    );
}



export default App;
