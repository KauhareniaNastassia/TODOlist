import React from 'react';
import {TaskType} from "../api/todolist-api";


export type TaskPropsType = {
    task: TaskType
    todoId: string
}


/*
export const TaskWithRedux = React.memo(({task, todoId}: TaskPropsType) => {

    console.log('Task')

    const dispatch = useDispatch()



    let removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(task.id, todoId))
    }, [dispatch, task.id, todoId])

    let changeStatusHandler =useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneTask = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, todoId, newIsDoneTask ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, task.id, todoId])

    let onChangeEditableSpanHandler = useCallback((inputTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, todoId, inputTitle))
    }, [dispatch, task.id, todoId])


    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={task.status === TaskStatuses.Completed}
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



*/
