import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'
import DrawerMenu from './DrawerMenu'

export default function MainMenu() {
  const {
    user,
    logout,
    setStage,
    setIndiceEscena,
    reiniciarPaso,
    elecciones,
    idioma
  } = useActua()

  const { greeting, logout: logoutText, menu } = textos[idioma].ui
  const escenas = textos[idioma].escenas

  const handleSelect = idx => {
    setIndiceEscena(idx)
    reiniciarPaso()
    setStage('escenario')
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          {greeting} {user.name}
        </Typography>
        <Button variant="outlined" onClick={logout}>
          {logoutText}
        </Button>
      </Stack>

      <DrawerMenu
        items={escenas}
        currentIndex={-1}
        completed={elecciones}
        categories={textos[idioma].ui.categories}
        onSelect={handleSelect}
      />
    </Box>
  )
}
