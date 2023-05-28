import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token:localStorage.getItem("token"),
    progress:[],
    websocketStatus:-1//https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
}

export const connectionSlice = createSlice({   
    name: 'connection',
    initialState: initialState,
    reducers: {
        setWebsocketStatus:(state, action) => {
            state.websocketStatus = action.payload
        },
        setToken:(state, action) => {
            state.token = action.payload
        },
        startProgress: (state, action) => {
            const name = action.payload

            state.progress.push(name)                           
        },
        stopProgress: (state, action) => {
            const name = action.payload

            const index = state.progress.findIndex((p) => p === name)

            if (index === -1)
                console.error('progress not exist')

            else
                state.progress.splice(index, 1)

        }
    }
})



// Action creators are generated for each case reducer function
export const { startProgress,stopProgress,setToken,setWebsocketStatus } = connectionSlice.actions

export default connectionSlice.reducer


