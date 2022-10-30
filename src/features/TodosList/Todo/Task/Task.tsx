import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../../../common/components/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {removeTaskAC, TaskStatuses, updateTaskAC} from "./tasks-reducer";
import s from './Task.module.scss'

export type TaskPropsType = {
  todoID: string
  taskID: string
}

export const Task = memo(({todoID, taskID,}: TaskPropsType) => {

  const dispatch = useAppDispatch();
  const task = useAppSelector(state => state.tasks[todoID].filter(t => t.id === taskID)[0])

  const getClasses = () => task.status === TaskStatuses.Completed ? s.isDone : s.listItem

  const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskAC(todoID, taskID, {status}));
  }, [dispatch, todoID, taskID,]);

  const changeTaskTitle = useCallback((title: string) => {
    dispatch(updateTaskAC(todoID, taskID, {title}))
  }, [dispatch, todoID, taskID,]);

  const removeTask = useCallback(() => {
    dispatch(removeTaskAC(todoID, taskID,));
  }, [dispatch, todoID, taskID]);
  return (
    <ListItem
      key={taskID}
      className={getClasses()}
      style={{justifyContent: 'space-between'}}
      divider
      disableGutters>

      <div>
        <Checkbox
          size={'small'}
          color={'success'}
          onChange={changeStatus}
          checked={task.status === TaskStatuses.Completed}
          style={{marginRight: '15px'}}
        />
        {task.status === TaskStatuses.Completed
          ? <span>{task.title}</span>
          : <EditableSpan
            title={task.title}
            changeTitle={changeTaskTitle}/>}
      </div>
      <IconButton onClick={removeTask}>
        <Delete/>
      </IconButton>
    </ListItem>
  );
});


