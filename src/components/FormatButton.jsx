import React from 'react'
import { Button } from '@mui/material'
import { updateStoredCode, getStoredCode, loadSavedCode } from '../scripts';
function FormatButton() {

  const formatCode = () => {
    const savedCode = getStoredCode()

    // Basic Formatting Done Here 
    let formattedCode = savedCode
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
    updateStoredCode(formattedCode)
    loadSavedCode()
  }

  return (

    <Button variant="contained" color='success' onClick={formatCode} >
      Format
    </Button>

  )
}

export default FormatButton