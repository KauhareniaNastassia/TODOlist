import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TodolistType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolist-reducer";

type TodolistPropsType = {
    todolist: TodolistType
    /*title: string
    tasks: Array<TaskPropsType>
    removeTask: (todoId: string, id: string) => void
    changeFilter: (todoId: string, value: FilterPropsType) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (todoId: string, id: string, isDone: boolean) => void
    filter: FilterPropsType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (todoId: string, id: string, inputTitle: string) => void
    changeTodolistTitle: (todoId: string, newTodotitle: string) => void*/
}

export const TodolistWithRedux = ({todolist}: TodolistPropsType) => {

    const {todoId, todoTitle, filter} = todolist
    //let tasks = useSelector<AppRootStateType, Array<TaskPropsType>>(state => state.tasks[todoId])

    let state = useSelector<AppRootStateType, AppRootStateType>(state => state)
    let tasks = state.tasks[todoId]

    const dispatch = useDispatch()

    /* let [title, setTitle] = useState('')
     let [error, setError] = useState<string | null>(null)*/

    let onClickAllHandler = () => {
        let action = changeTodolistFilterAC(todoId, 'all')
        dispatch(action)
    }
    let onClickActiveHandler = () => {
        let action = changeTodolistFilterAC(todoId, 'active')
        dispatch(action)
    }
    let onClickCompletedHandler = () => {
        let action = changeTodolistFilterAC(todoId, 'completed')
        dispatch(action)
    }

    /* let addTaskHandler = () => {
         if (title.trim() !== '') {
             props.addTask(props.todoId, title.trim())
             setTitle('')
         } else {
             setError('Title is required')
         }
     }

     let onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
     let onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
         setError(null)
         if (e.key === 'Enter') {
             addTaskHandler()
         }
     }*/

    const addTask = (title: string) => {
        let action = addTaskAC(title, todoId)
        dispatch(action)
    }

    let removeTodolistHandler = () => {
        let action = removeTodolistAC(todoId)
        dispatch(action)
    }

    const onChangeTodolistTitleHandler = (newTodoTitle: string) => {
        let action = changeTodolistTitleAC(todoId, newTodoTitle)
        dispatch(action)
    }



    if (filter === 'active') {
        tasks = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone === true)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={todoTitle} onChange={onChangeTodolistTitleHandler} />
                <button onClick={removeTodolistHandler}> ✖</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'> {error} </div>}
            </div>*/}
            <ul>
                {
                    tasks.map((task) => {

                    let removeTaskHandler = () => {
                        let action = removeTaskAC(todoId, task.id)
                        dispatch(action)
                    }

                    let changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneTask = e.currentTarget.checked
                        let action = changeTaskStatusAC(todoId, task.id, newIsDoneTask)
                        dispatch(action)
                    }

                    let onChangeEditableSpanHandler = (inputTitle: string) => {
                        let action = changeTaskTitleAC(todoId, task.id, inputTitle)
                        dispatch(action)
                    }

                    return (
                        <li
                            key={task.id}
                            className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={changeStatusHandler}
                            />
                            <EditableSpan
                                value={task.title}
                                onChange={onChangeEditableSpanHandler}
                            />
                            <button onClick={removeTaskHandler}> ✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onClickAllHandler}>All
                </button>
                <button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onClickActiveHandler}>Active
                </button>
                <button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    );
};

