import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (inputTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false
    )
    const [inputTitle, setInputTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setInputTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(inputTitle)
    }

    const onChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    return editMode
        ? <input
            value={inputTitle}
            onBlur={activateViewMode}
            onChange={onChangeInputTitleHandler}
            autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

});

