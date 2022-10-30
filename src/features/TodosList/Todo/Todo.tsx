import {Delete} from "@mui/icons-material";
import {memo, useCallback, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {Button, ButtonGroup, IconButton, Typography} from "@mui/material";
import {AddItemForm} from "../../../common/components/AddItemForm";
import s from './Todo.module.scss';
import {EditableSpan} from "../../../common/components/EditableSpan";
import {Task} from "./Task/Task";
import {FilterType, removeTodoAC, updateTodoAC} from "../todos-reducer";
import {addTaskAC, TaskStatuses, TaskType} from "./Task/tasks-reducer";


type PropsType = {
  todoID: string
}

export const Todo = memo(({todoID}: PropsType) => {


  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.todos.filter(t => t.id === todoID)[0])
  const tasks = useAppSelector(state => state.tasks[todoID])

  const filteredTasks = (filter: FilterType, tasks: Array<TaskType>) => {
    switch (filter) {
      case "completed":
        return tasks.filter(t => t.status === TaskStatuses.Completed)
      case "active":
        return tasks.filter(t => t.status !== TaskStatuses.Completed)
      default:
        return tasks
    }
  }
  const tasksForRender = useMemo(() => filteredTasks(todo.filter, tasks)
    .map(t => <Task
      key={t.id}
      todoID={todoID}
      taskID={t.id}/>), [todoID, tasks, todo.filter]);

  const addTask = useCallback((newTaskTitle: string) => dispatch(addTaskAC(todoID, newTaskTitle)), [dispatch, todoID]);
  const changeTodoTitle = useCallback((title: string) => {
    dispatch(updateTodoAC(todoID, {title},));
  }, [dispatch, todoID,]);
  const removeTodo = useCallback(() => dispatch(removeTodoAC(todoID)), [dispatch, todoID]);

  const onAllFilter = useCallback(() => dispatch(updateTodoAC(todoID, {filter: "all"})), [dispatch, todoID]);
  const onActiveFilter = useCallback(() => dispatch(updateTodoAC(todoID, {filter: "active"})), [dispatch, todoID]);
  const onCompletedFilter = useCallback(() => dispatch(updateTodoAC(todoID, {filter: "completed"})), [dispatch, todoID]);


  return (
    <section className={s.sectionTodo}>
      <Typography
        variant={'h5'}
        align={'center'}
        style={{fontWeight: 'normal'}}>
        <EditableSpan title={todo.title} changeTitle={changeTodoTitle}/>
        <IconButton onClick={removeTodo}>
          <Delete/>
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask}/>
      <ul>
        {tasksForRender}
      </ul>
      <div>
        <ButtonGroup
          variant={"contained"}
          size={'small'}>
          <Button
            style={{borderColor: 'inherit'}}
            color={todo.filter === "all" ? 'secondary' : "inherit"}
            onClick={onAllFilter}>All
          </Button>
          <Button
            style={{borderColor: 'inherit'}}
            color={todo.filter === "active" ? 'secondary' : "inherit"}
            onClick={onActiveFilter}>Active
          </Button>
          <Button
            style={{borderColor: 'inherit'}}
            color={todo.filter === "completed" ? 'success' : "inherit"}
            onClick={onCompletedFilter}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </section>
  )
});