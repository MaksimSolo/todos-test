import {addTodoAC, removeTodoAC, todolistID1, todolistID2} from "../../todos-reducer";
import {v1} from "uuid";

//enum
export enum TaskStatuses {
  New = 0,
  Completed = 1,
}

const initialState = {
  [todolistID1]: [
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.New,
      todoListId: todolistID1,
    },
    {
      id: v1(),
      title: "JS/TS",
      status: TaskStatuses.New,
      todoListId: todolistID1,
    },
    {
      id: v1(),
      title: "ReactJS",
      status: TaskStatuses.New,
      todoListId: todolistID1,
    },
    {
      id: v1(),
      title: "Rest API",
      status: TaskStatuses.New,
      todoListId: todolistID1,
    },
    {
      id: v1(),
      title: "GraphQL",
      status: TaskStatuses.New,
      todoListId: todolistID1,
    },
  ],
  [todolistID2]: [
    {
      id: v1(),
      title: "Milk",
      status: TaskStatuses.New,
      todoListId: todolistID2,
    },
    {
      id: v1(),
      title: "Beer",
      status: TaskStatuses.New,
      todoListId: todolistID2,
    },
    {
      id: v1(),
      title: "Fish",
      status: TaskStatuses.New,
      todoListId: todolistID2,
    },
    {
      id: v1(),
      title: "Book",
      status: TaskStatuses.New,
      todoListId: todolistID2,
    },
    {
      id: v1(),
      title: "Bread",
      status: TaskStatuses.New,
      todoListId: todolistID2,
    },
  ]
};

export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.id)}
    case 'ADD-TASK': {
      const copyState = {...state}
      let tasks = {...state}[action.todoID]
      const newTask = {id: v1(), title: action.newTaskTitle, status: TaskStatuses.New, todoListId: action.todoID,}
      copyState[action.todoID] = [newTask, ...tasks]
      return copyState;
    }
    case "UPDATE_TASK":
      return {
        ...state,
        [action.todoID]: state[action.todoID].map(t => t.id === action.taskID ? {
          ...t,
          ...action.payload
        } : t)
      }
    case "ADD-TODOLIST":
      return {...state, [action.todoID]: []}
    case "REMOVE_TODOLIST":
      const copyTasks = {...state}
      delete copyTasks[action.id]
      return (copyTasks)
    default:
      return state
  }
}

//action-creators
export const removeTaskAC = (todoID: string, id: string,) => ({type: 'REMOVE-TASK', todoID, id,} as const)
export const addTaskAC = (todoID: string, newTaskTitle: string) => ({type: 'ADD-TASK', todoID, newTaskTitle} as const)
export const updateTaskAC = (todoID: string, taskID: string, payload: UpdateTaskType) =>
  ({type: 'UPDATE_TASK', todoID, taskID, payload,} as const)


//types
export type TasksStateType = typeof initialState;
export type TaskType = {
  id: string,
  title: string,
  status: number,
  todoListId: string,
}
export type UpdateTaskType = {
  status?: number
  title?: string
}

export type TasksActionType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof addTodoAC>



