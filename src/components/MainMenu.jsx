import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'
import DrawerMenu from './DrawerMenu'

export default function MainMenu() {
  const {
    user,
    perfiles,
    logout,
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua()

  const ui = textos[idioma].ui
  const escenas = textos[idioma].escenas

  // Arranca la primera situación
  const handleStart = () => {
    setIndiceEscena(0)
    reiniciarPaso()
    setStage('escenario')
  }

  // Va a una situación concreta
  const handleSelect = idx => {
    setIndiceEscena(idx)
    reiniciarPaso()
    setStage('escenario')
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      {/* Título */}
      <Typography variant="h4" align="center" gutterBottom>
        {ui.inicioTitle}
      </Typography>

      {/* Saludo y botones admin/logout */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          {ui.greeting} {user.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {user.name === 'admin' && (
            <Button variant="outlined" onClick={() => setStage('admin')}>
              {ui.adminPanelTitle}
            </Button>
          )}
          <Button variant="outlined" onClick={logout}>
            {ui.logout}
          </Button>
        </Stack>
      </Stack>

      {/* Botón EMPEZAR */}
      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" onClick={handleStart}>
          {ui.empezar}
        </Button>
      </Box>

      {/* Lista de situaciones */}
      <DrawerMenu
        items={escenas}
        currentIndex={-1}
        completed={elecciones}
        categories={ui.categories}
        onSelect={handleSelect}
      />
    </Box>
  )
}
