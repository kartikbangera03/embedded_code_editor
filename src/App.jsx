
import {useState , useEffect , useRef, useDebugValue } from 'react'
import FormatButton from './components/FormatButton'
import RunButton from './components/RunButton'
import IconLogo from './components/IconLogo'
import ToggleThemeSwitch from './components/ToggleThemeSwitch'
import IframeContainer from './components/IframeContainer'
import MUINavBar from './components/MUINavBar'
import { ThemeProvider } from './context/theme'
import useMediaQuery from '@mui/material/useMediaQuery';


function App(){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme:dark)');
  const [themeMode , setThemeMode ] = useState(prefersDarkMode ? 'dark' : 'light')
  const iframeRef = useRef(null);


  const darkTheme = () =>{
    setThemeMode('dark');
  }

  const lightTheme = () =>{
    setThemeMode('light');
  }


  useEffect(()=>{
    document.querySelector('html').classList.remove("dark","light");
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])


  return(
      <ThemeProvider value={{themeMode , darkTheme, lightTheme} }>
        <MUINavBar>
          <IconLogo/>
          <div className='flex gap-5'>
            <FormatButton/>
            <RunButton
            iframeRefProp = {iframeRef}
            />
          </div>
          <ToggleThemeSwitch />
        </MUINavBar>
        <IframeContainer
            iframeRefProp = {iframeRef}
            reloadIframe
        /> 
      </ThemeProvider>
    )

}

export default App 