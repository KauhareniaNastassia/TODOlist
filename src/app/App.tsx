import React from 'react';
import './App.css';
import {TodolistList} from "../features/TodolistsList/TodolistList";
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import CustomizedSnackbars from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <CustomizedSnackbars/>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>

            <Container fixed>
                <TodolistList demo={demo}/>
            </Container>


        </div>
    );
}

export default App;
