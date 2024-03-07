import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer  from './user/UserSlice'
import themeReducer from './theme/ThemeSlice'
const rootReducer=combineReducers({
    user:userReducer,
    theme:themeReducer
})
export const store=configureStore({
    reducer:rootReducer
})
