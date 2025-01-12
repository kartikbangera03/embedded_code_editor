import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


function MUINavBar({children}) {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className='flex justify-between px-4 py-2 dark:bg-slate-800'>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MUINavBar