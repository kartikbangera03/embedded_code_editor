import React from 'react'
import { useEffect } from 'react';
import useTheme from '../context/theme';
import confetti, { create } from 'canvas-confetti'
import { updateStoredCode , getStoredCode , loadSavedCode } from '../scripts';

function IframeContainer({iframeRefProp , reloadIframe}) {

    const {themeMode , lightTheme , darkTheme  } = useTheme() 
    const lightModeUrl = "https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideRun=true"
    const darkModeUrl = "https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideRun=true&theme=dark"
    
    const iframeUrl = (themeMode === 'light' ? lightModeUrl : darkModeUrl )
    
    useEffect(() => {
        const confettiExplosion = () => {
            confetti({
              particleCount: 300,
              spread: 300,
            })
        };

        const handleMessage = (event) => {
          if (event.origin !== 'https://onecompiler.com') return; // Check the origin of the message
          
          if (event.data.action === "codeUpdate") {
            updateStoredCode(event.data.files[0].content);  
          } 
          if (event.data.result && event.data.action == "runComplete" && event.data.result.success == true) {
            confettiExplosion()
          }
        };
        

        window.addEventListener('message', handleMessage, false);
        
        return () => {
            window.removeEventListener('message', handleMessage, false);
        };
      }, []);

    return (
        <iframe
            key={reloadIframe}
            id='embeddedIframe'
            ref={iframeRefProp}
            src={iframeUrl}
            height="1000px"
            width="100%"
            onLoad={loadSavedCode}
        ></iframe>
    )
}

export default IframeContainer