import React from 'react'
import { Button } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// 
function RunButton({iframeRefProp}) {
    const runCode = ()=>{
        const iframeRef = iframeRefProp.current;
        // console.log("RUNNING CODE .....")
        console.log(iframeRef)
        if (iframeRef && iframeRef.contentWindow) {

            iframeRef.contentWindow.postMessage({
              eventType: 'triggerRun'
            }, "*");
        }    
    }


    return (
    <Button 
    variant="contained" 
    color='error' 
    startIcon={<PlayArrowIcon />} 
    onClick={runCode} >
            Run
    </Button>
    )
}

export default RunButton