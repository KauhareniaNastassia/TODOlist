import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodolistList} from "../features/TodolistsList/TodolistList";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material';
import CustomizedSnackbars from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useAppDispatch} from "../state/hooks";
import {logoutThunkCreator} from "../features/Login/login-reducer";

type PropsType = {
    demo?: boolean
}

export function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logoutThunkCreator())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div style={{position: 'fixed', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <CustomizedSnackbars/>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            MY TODOLIST
                        </Typography>
                        {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>

                <Container fixed>
                    <Routes>
                        <Route path={process.env.PUBLIC_URL + '/'} element={<TodolistList demo={demo}/>}>
                        </Route>
                        <Route path='/login' element={<Login/>}/>

                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to='/404'/>}/>
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
}


