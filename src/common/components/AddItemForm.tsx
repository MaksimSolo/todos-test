import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {pink} from "@mui/material/colors";
import {AddBox} from "@mui/icons-material";


export type AddItemFormType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(({addItem, disabled}: AddItemFormType) => {

  const [newTitle, setNewTitle] = useState("")
  const [error, setError] = useState<boolean>(false)

  const onEventAddItem = () => {
    if (newTitle.trim()) {
      addItem(newTitle.trim());
    } else {
      setError(true)
    }
    setNewTitle("")
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
    setError(false);
  }
  const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEventAddItem()
    }
  }
  const helperText = error && 'Error! Typing is expected'
  return (
    <div style={{textAlign: 'center'}}>
      <TextField
        disabled={disabled}
        variant={'outlined'}
        size={'small'}
        label={'enter item title'}
        helperText={helperText}
        value={newTitle}
        onChange={changeTitle}
        onKeyDown={onKeyPressAddItem}
        error={error}
      />
      <IconButton
        disabled={disabled}
        onClick={onEventAddItem} sx={{color: pink[500]}}>
        <AddBox/>
      </IconButton>
    </div>
  );
});

