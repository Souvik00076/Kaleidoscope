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
        signInStart:(state)=>{
            state.loading=true,
            state.error=null
        },
        signInSuccess:(state,actions)=>{
            state.loading=false,
            state.currentUser=actions.payload,
            state.error=null
        },
        signInFailure:(state,actions)=>{
            state.loading=false,
            state.error=actions.payload
        }
    }
})

export const {signInStart,signInSuccess,signInFailure}=UserSlice.actions
export default UserSlice.reducer