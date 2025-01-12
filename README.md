Code Editor Web App
Overview

This project implements a web-based code editor using OneCompiler's Embeddable Editor API, built with React and Material-UI (MUI). The editor allows users to write, run, and format code with the following functionalities:

    Restore previously written code on page refresh.
    Autosave code on every keystroke, not just on the "Run" event.
    Trigger a confetti animation upon successful code execution.
    Dark theme toggle for the web app and the editor, along with customizable web app colors.
    External "Run" button for executing the code.
    "Format Code" button to auto-format the code in the editor.

Features

    Restore Code on Page Refresh
        Code is stored locally using localStorage, so the editor restores the last written code when the page is refreshed.

    Autosave Code
        Every key stroke in the editor is saved automatically, ensuring that the user doesn't lose any progress.

    Confetti Animation on Successful Execution
        Upon successful code execution, a confetti animation is triggered as a fun feedback mechanism.

    Dark Theme Toggle
        A toggle switch to enable/disable dark mode for both the web app and the embedded code editor.

    External "Run" Button
        The "Run" button is placed outside the editor, allowing users to execute the code without navigating inside the embedded editor.

    "Format Code" Button
        Users can format the code in the editor by clicking the "Format Code" button, ensuring proper code styling.

Tech Stack

    Frontend: React
    UI Components: Material-UI (MUI)
    Code Execution: OneCompiler Embeddable Editor API
    State Management: React's built-in state and localStorage
    Deployment: Static hosting service (e.g., Netlify, Vercel)
    Code Formatting: Integrated code formatting functionality using suitable libraries (Third party libraries are not used for code formatting)