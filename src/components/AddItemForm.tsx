import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addItemHandler = () => {
            if (title.trim() !== '') {
                props.addItem(title.trim())
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
            <input
                value={title}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className='error-message'> {error} </div>}
        </div>
    );
})

