export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}



export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', status
} as const)
export const setAppErrorAC = (error: string|null) => ({
    type: 'APP/SET-ERROR', error
} as const)

export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type InitialStateType = typeof initialState
type ActionsType = setAppStatusACType | setAppErrorACType