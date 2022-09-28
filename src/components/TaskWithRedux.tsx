import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskPropsType} from "../AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/task-reducer";


export type TaskType = {
    task: TaskPropsType
    todoId: string
}


export const TaskWithRedux = React.memo(({task, todoId}: TaskType) => {

    console.log('Task')

    const dispatch = useDispatch()


    let removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todoId))
    }

    let changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneTask = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, todoId, newIsDoneTask))
    }

    let onChangeEditableSpanHandler = useCallback((inputTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, todoId, inputTitle))
    }, [dispatch, task.id, todoId])


    return (
        <div className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeStatusHandler}
                />
                <EditableSpan
                    value={task.title}
                    onChange={onChangeEditableSpanHandler}
                />
                <button onClick={removeTaskHandler}> ✖</button>
        </div>
    );
})



