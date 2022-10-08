import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskPropsType} from "../AppWithRedux";


export type TaskType = {
    task: TaskPropsType
    removeTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, inputTitle: string) => void
}


export const Task = React.memo(({task, removeTask, changeTaskTitle, changeStatus}: TaskType) => {

    let removeTaskHandler = () => {
        removeTask(task.id)
    }

    let changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneTask = e.currentTarget.checked
        changeStatus(task.id, newIsDoneTask)
    }

    let onChangeEditableSpanHandler = (inputTitle: string) => {
        changeTaskTitle(task.id, inputTitle)
    }


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

