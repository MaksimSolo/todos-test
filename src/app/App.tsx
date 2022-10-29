import React from 'react';
import s from './App.module.scss';
import {AppBar, Typography} from "@mui/material";


function App() {
  return (
    <div className={s.app}>
      <AppBar className={s.header} position={'static'}>
        <Typography className={s.title} variant='h1'>
          todos
        </Typography>
      </AppBar>
    </div>
  );
}

export default App;
