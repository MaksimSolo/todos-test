import {combineReducers, Dispatch, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {TodosActionType, todosReducer} from "../features/TodosList/todos-reducer";
import {TasksActionType, tasksReducer} from "../features/TodosList/Todo/Task/tasks-reducer";

const reducers = combineReducers({
  todos: todosReducer,
  tasks: tasksReducer,
})

export const store = createStore(reducers);

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

//types
type ReducersType = typeof reducers;
export type AppStateType = ReturnType<ReducersType>;
export type AppActionsType = TodosActionType | TasksActionType;
export type AppDispatch = Dispatch<AppActionsType>;
