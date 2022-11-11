import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addItemHandler = () => {
            if (title.trim() !== '') {
                addItem(title.trim())
                setTitle('')
            } else {
                setError('Title is required')
            }
        }


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>

            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressInputHandler}
                       label="Title"
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
                <AddBox/>
            </IconButton>

        </div>
    );
})

