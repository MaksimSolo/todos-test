import React from 'react';
import s from './App.module.scss';
import {AppBar, Container, Typography} from "@mui/material";
import {TodosList} from "../features/TodosList/TodosList";


function App() {
  return (
    <div className={s.app}>
      <AppBar className={s.header} position={'static'}>
        <Typography className={s.title} variant='h1'>
          todos
        </Typography>
      </AppBar>
      <Container fixed>
        <TodosList/>
      </Container>
    </div>
  );
}

export default App;
