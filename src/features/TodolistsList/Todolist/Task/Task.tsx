import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";


export type TaskPropsType = {
    task: TaskType
    removeTask: (id: string) => void
    changeStatus: (id: string, status: TaskStatuses) => void
    changeTaskTitle: (id: string, inputTitle: string) => void
}


export const Task = React.memo(({task, removeTask, changeTaskTitle, changeStatus}: TaskPropsType) => {

    let removeTaskHandler =useCallback( () => {
        removeTask(task.id)
    }, [task.id])

    let changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneTask = e.currentTarget.checked
        changeStatus(task.id, newIsDoneTask ? TaskStatuses.Completed : TaskStatuses.New)
    }, [task.id])

    let onChangeEditableSpanHandler =useCallback( (inputTitle: string) => {
        changeTaskTitle(task.id, inputTitle)
    }, [task.id])


    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={task.status === TaskStatuses.Completed }
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

