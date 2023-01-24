import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material';


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, inputTitle: string, todolistId: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {

    let removeTaskHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId])

    let changeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneTask = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneTask ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id,  props.todolistId])

    let changeTaskTitleHandler = useCallback((inputTitle: string) => {
        props.changeTaskTitle(props.task.id, inputTitle, props.todolistId)
    }, [props.task.id, props.todolistId])


    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>

            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={changeStatusHandler}
            />
            <EditableSpan
                value={props.task.title}
                onChange={changeTaskTitleHandler}
            />
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>

        </div>
    );
})

