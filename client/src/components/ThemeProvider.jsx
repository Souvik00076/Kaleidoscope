import React from 'react'
import { useSelector } from 'react-redux'
const ThemeProvider = ({children}) => {
  const {theme_style,bg_styles}=useSelector(state=>state.theme)
  return (
    <div className={theme_style}>
        <div className={bg_styles}>
               {children}
        </div>
    </div>
  )
}

export default ThemeProvider
