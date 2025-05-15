import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { useActua } from './context/ActuaContext'

import Portada from './components/Portada'
import IngresoAlumno from './components/IngresoAlumno'
import MainMenu from './components/MainMenu'
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

function AppContent() {
  const { stage } = useActua()
  switch (stage) {
    case 'portada':    return <Portada />
    case 'ingreso':    return <IngresoAlumno />
    case 'menu':       return <MainMenu />
    case 'escenario':  return <ActuaEscenario />
    default:           return null
  }
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <AppContent />
      </Container>
    </ThemeProvider>
  )
}
