import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import ActuaEscenario from './components/ActuaEscenario'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f6f5f1' },
    primary: { main: '#6a5d4d' },
    secondary: { main: '#a39e8e' },
    text: { primary: '#333' }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: { textTransform: 'uppercase' }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <ActuaEscenario />
      </Container>
    </ThemeProvider>
  )
}

export default App
