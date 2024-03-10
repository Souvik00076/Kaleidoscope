import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        processStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        signInSuccess:(state,actions)=>{
            state.loading=false,
            state.currentUser=actions.payload,
            state.error=null
        },
        processFailure:(state,actions)=>{
            state.loading=false,
            state.error=actions.payload
        },
        updationSuccess:(state,actions)=>{
            state.loading=false,
            state.currentUser=actions.payload,
            state.error=false
        }

    }
})

export const {processStart,signInSuccess,processFailure,updationSuccess}=UserSlice.actions
export default UserSlice.reducer