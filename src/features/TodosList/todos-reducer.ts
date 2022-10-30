import {v1} from "uuid";

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: TodoType[] = [
  {id: todolistID1, title: 'What to learn', filter: 'all',},
  {id: todolistID2, title: 'What to buy', filter: 'all',},
];

export const todosReducer = (state = initialState, action: TodosActionType): TodoType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      const newTodo: TodoType = {id: action.todoID, title: action.newTodoTitle, filter: 'all',}
      return [newTodo, ...state]
    case 'UPDATE-TODOLIST':
      return state.map(tl => tl.id === action.id ? {...tl, ...action.payload} : tl)
    default:
      return state
  }
}

//action-creators
export const removeTodoAC = (id: string) => ({type: 'REMOVE_TODOLIST', id} as const)
export const addTodoAC = (newTodoTitle: string, todoID: string) => ({
  type: 'ADD-TODOLIST',
  newTodoTitle,
  todoID
} as const)
export const updateTodoAC = (id: string, payload: UpdateTodoType) =>
  ({type: 'UPDATE-TODOLIST', id, payload} as const)


//types
export type FilterType = "all" | "active" | "completed";
export type TodoType = {
  id: string
  title: string
  filter: "all" | "active" | "completed"
}
export type UpdateTodoType = {
  title?: string
  filter?: FilterType
}
export type TodosActionType =
  ReturnType<typeof removeTodoAC>
  | ReturnType<typeof addTodoAC>
  | ReturnType<typeof updateTodoAC>

