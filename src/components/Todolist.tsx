import React, {useCallback} from 'react';
import {FilterPropsType, TaskPropsType} from "../AppWithReduser";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {TaskWithRedux} from "./TaskWithRedux";
import {Task} from "./Task";

type TodolistPropsType = {
    todoId: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (todoId: string, id: string) => void
    changeFilter: (todoId: string, value: FilterPropsType) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (todoId: string, id: string, isDone: boolean) => void
    filter: FilterPropsType
    removeTodolist: (todoId: string) => void
    changeTaskTitle: (todoId: string, id: string, inputTitle: string) => void
    changeTodolistTitle: (todoId: string, newTodotitle: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    /* let [title, setTitle] = useState('')
     let [error, setError] = useState<string | null>(null)*/

    let onClickAllHandler = () => {
        props.changeFilter(props.todoId, 'all')
    }
    let onClickActiveHandler = () => {
        props.changeFilter(props.todoId, 'active')
    }
    let onClickCompletedHandler = () => {
        props.changeFilter(props.todoId, 'completed')
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
        tasks = tasks.filter(task => task.isDone === false)
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(task => task.isDone === true)
    }

    let removeTask = useCallback((id: string) => {
        props.removeTask(props.todoId, id)
    }, [props.removeTask, props.todoId])

    let changeStatus = useCallback((id: string, newIsDoneTask: boolean) => {
        props.changeStatus(props.todoId, id, newIsDoneTask)
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

