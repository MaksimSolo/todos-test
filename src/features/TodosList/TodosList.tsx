import {Todo} from "./Todo/Todo";
import {useCallback, useMemo} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../common/components/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../store/store";
import s from './TodosList.module.scss';
import {addTodoAC} from "./todos-reducer";
import {v1} from "uuid";

export const TodosList = () => {

  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch();

  const addTodo = useCallback((newTodoTitle: string) => {
    let newTodoId = v1();
    dispatch(addTodoAC(newTodoTitle, newTodoId))
  }, [dispatch]);

  const todosForRender = useMemo(() => todos.map(t => {
    return (
      <Grid item
            key={t.id}>
        <Paper elevation={5}
               style={{
                 padding: '15px',
                 minWidth: '300px',
                 maxWidth: '300px',
                 minHeight: '100px',
                 backgroundColor: 'lightgrey',
               }}>
          < Todo
            key={t.id}
            todoID={t.id}
          />
        </Paper>
      </Grid>
    )
  }), [todos]);


  return (
    <main>
      <Grid container className={s.container}>
        <Grid item>
          <AddItemForm addItem={addTodo}/>
        </Grid>
      </Grid>
      <Grid container spacing={5} justifyContent={'center'}>
        {todosForRender}
      </Grid>
    </main>
  );
};
