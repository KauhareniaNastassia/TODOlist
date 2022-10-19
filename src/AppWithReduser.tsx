import React, {useReducer} from 'react';
import './App.css';

import {v1} from "uuid";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterPropsType,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

/*export type TasksPropsType = {
    [key: string]: Array<TaskType>
}*/


function AppWithReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
            {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
        ]
    )

    let [tasks, dispatchToTasks] = useReducer(taskReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},

                {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},

                {id: v1(), title: "ReactJS", status: TaskStatuses.New, todoListId: todolistId1,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
            ],
            [todolistId2]: [
                {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistId2,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},

                {id: v1(), title: 'GraphQL', status: TaskStatuses.New, todoListId: todolistId2,description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            ]
        }
    )


    function removeTask(todoId: string, id: string)  {
        let action = removeTaskAC(todoId, id)
        dispatchToTasks(action)
    }

    function changeFilter(todoId: string, value: FilterPropsType) {
        let action = changeTodolistFilterAC(todoId, value)
        dispatchToTodolists(action)

    }

    function addTask(title: string, todoId: string) {
        let action = addTaskAC(title, todoId)
        dispatchToTasks(action)
    }

    function changeStatus(todoId: string, id: string, status: TaskStatuses) {
        let action = changeTaskStatusAC(todoId, id, status)
        dispatchToTasks(action)
    }

    function removeTodolist(todoId: string) {
        let action = removeTodolistAC(todoId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function addTodoList(newTodoTitle: string) {
        let action = addTodolistAC(newTodoTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTaskTitle(todoId: string, id: string, inputTitle: string) {
        let action = changeTaskTitleAC(todoId, id, inputTitle)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(todoId: string, newTodotitle: string) {
        let action = changeTodolistTitleAC(todoId, newTodotitle)
        dispatchToTodolists(action)
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.New)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.Completed)
                    }

                    return <Todolist
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
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

export default AppWithReducer;
