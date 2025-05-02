import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    loading: false,
    data: [],
    error: null,    
}

const apiSlice= createSlice({
    name: 'api',
    initialState,
    reducers: {
        onApiLoading: (state)=> {
            state.loading= true,
            state.error= null
        },
        
        onApiSuccessResponse: (state, action) => {
            state.loading= false,
            state.data= action.payload,
            state.error= null
        },

        onApiErrorResponse: (state, action) => {
            state.loading= false,
            state.error= action.payload
        }
    }
});

export const { onApiLoading, onApiErrorResponse, onApiSuccessResponse }= apiSlice.actions;
export default apiSlice.reducer;