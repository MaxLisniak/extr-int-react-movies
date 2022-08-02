import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MoviesState {
    list: [];
    status: 'idle' | 'loading';
}

const initialState: MoviesState = {
    list: [],
    status: 'idle'
}



export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers(builder) {
        
    },
})