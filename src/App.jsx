import { useState, useEffect, useRef } from 'react'
import { Button, Paper, Switch, ThemeProvider, createTheme } from '@mui/material';
import confetti, { create } from 'canvas-confetti'
import useMediaQuery from '@mui/material/useMediaQuery';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme:dark)');
  const lightModeUrl = "https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideRun=true"
  const darkModeUrl  = "https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideRun=true&theme=dark"
  const [hashMap, setHashMap] = useState({});
  const [mode , setMode ] = useState(prefersDarkMode);
  const [iframeUrl , setIframeUrl] = useState(prefersDarkMode ? darkModeUrl:lightModeUrl ) 
  const iframeRef = useRef(null);

  
  
  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const changeTheme = () =>{
    if(mode) {
      setIframeUrl(lightModeUrl)
      setMode(false);
    }else {
      setIframeUrl(darkModeUrl)
      setMode(true);
    }
  };


  const confettiExplosion = () => {
    confetti({
      particleCount: 150,
      spread: 100,
    })
  };

  const runCode = () =>{
    const iframe = iframeRef.current;
    iframe.contentWindow.postMessage({
      eventType: 'triggerRun'
  }, "*");
  };

  useEffect(() => {

    const iframe = iframeRef.current;
    const savedCode = localStorage.getItem("main.py");
    const onIframeLoad = () => {
      console.log("Iframe loaded. Ready to post message.");
      if (savedCode) {
        console.log("Replacing Code.....")
        iframe.contentWindow.postMessage({
          eventType: 'populateCode',
          language: "python",
          files: [
            {
              "name": "main.py",
              "content": savedCode
            }
          ]
        }, "*");
      }// Post message after iframe is ready
    };

    iframe.addEventListener("load", onIframeLoad);


    window.onmessage = function (e) {
      if (e.data && e.data.language) {
        console.log("Display Message")
        console.log(e.data)
        if (e.data.action === "codeUpdate") {
          setHashMap({ ...hashMap, [e.data.language]: e.data.files[0].content })
          localStorage.setItem(e.data.files[0].name, e.data.files[0].content);
        }
        if (e.data.result && e.data.action == "runComplete" && e.data.result.success == true) {
          confettiExplosion()
        }
      }
    };

    // Cleanup function (optional)
    return () => {
      console.log("Cleanup before component unmounts");
      iframe.removeEventListener("load", onIframeLoad);
    };
  }, []);


  return (
    <ThemeProvider theme={appTheme}>
      <Paper elevation={0} sx={{height:"100vh"}} square> 
        <div className='flex justify-between'>
          <h1 className='h-16'>Code Editor</h1>
          <Switch
            checked = {mode} 
            onChange = {changeTheme} 
            inputProps = {{'aria-label' : 'controlled' }}
          >
          </Switch>
        </div>
        <div>
          <Button variant="contained" color='error' startIcon={<PlayArrowIcon />} onClick={runCode}>
            Run
          </Button>
        </div>
        
        <iframe
          ref={iframeRef}

          height="760px"
          src={iframeUrl}
          width="100%"
        ></iframe>
      </Paper>  
    </ThemeProvider>
  )
}

export default App
