import { createSlice } from "@reduxjs/toolkit";

const initialState={
    theme_style:'light',
    bg_styles:"bg-white text-gray-700"
}

const ThemeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggle:(state)=>{
            state.theme_style=state.theme_style==='light'?'dark':'light'
            state.bg_styles=state.theme_style==='light'?'bg-white text-gray-700':
                                        'text-gray-200 bg-[rgb(16,23,42)] h-screen'
            }
        }
    }
)
export const{toggle}=ThemeSlice.actions
export default ThemeSlice.reducer
