import React from 'react'
import useTheme from '../context/theme';
import {MaterialUISwitch} from '../assets/MUISwitch'

function ToggleThemeSwitch() {
    const {themeMode , lightTheme , darkTheme  } = useTheme()

    const onThemeChange = (e) =>{
        const darkModeStatus = e.currentTarget.checked 
        if(darkModeStatus){
            darkTheme()
        }else{
            lightTheme()
        }
    }

  return (
    <MaterialUISwitch 
        checked = {themeMode ==='dark'} 
        onChange = {onThemeChange}  
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{ m: 1 }}  />
  )
}

export default ToggleThemeSwitch