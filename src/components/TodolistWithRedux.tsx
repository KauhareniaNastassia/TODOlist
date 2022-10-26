import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC} from "../state/task-reducer";
import {
    changeTodolistFilterACType,
    changeTodolistTitleAC,
    FilterPropsType,
    removeTodolistAC,
    TodolistDomainType
} from "../state/todolist-reducer";
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskStatuses, TaskType, TodolistType} from "../api/todolist-api";

type TodolistPropsType = {
    todolist: TodolistDomainType
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
/*

export const TodolistWithRedux =  React.memo(({todolist}: TodolistPropsType) => {

    const {id, title, filter, addedDate, order} = todolist

    let state = useSelector<AppRootStateType, AppRootStateType>(state => state)
    let tasks = state.tasks[id]

    const dispatch = useDispatch()

    /!* let [title, setTitle] = useState('')
     let [error, setError] = useState<string | null>(null)*!/


    let onClickAllHandler = useCallback (() => {
        let action = changeTodolistFilterACType(id, 'all')
        dispatch(action)
    }, [dispatch] )

    let onClickActiveHandler = useCallback (() => {
        let action = changeTodolistFilterACType(id, 'active')
        dispatch(action)
    }, [dispatch] )
    let onClickCompletedHandler = useCallback(() => {
        let action = changeTodolistFilterACType(id, 'completed')
        dispatch(action)
    }, [dispatch] )

    /!* let addTaskHandler = () => {
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
     }*!/

    const addTask = useCallback((title: string) => {
        let action = addTaskAC(title, id)
        dispatch(action)
    }, [dispatch])

    let removeTodolistHandler = useCallback(() => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const onChangeTodolistTitleHandler =useCallback( (newTodoTitle: string) => {
        let action = changeTodolistTitleAC(id, newTodoTitle)
        dispatch(action)
    }, [dispatch])



    if (filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={onChangeTodolistTitleHandler} />
                <button onClick={removeTodolistHandler}> ✖</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    tasks.map((task) => {

                    return (
                        <TaskWithRedux
                            task={task}
                            todoId={id}
                        />
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
});

*/
