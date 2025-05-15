import React from 'react'
import { Stack, Typography, Button, Box } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

export default function Portada() {
  const { setStage, idioma } = useActua()
  const { portadaTitle, portadaButton } = textos[idioma].ui

  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ height: '80vh' }}
    >
      <Typography variant="h2" align="center">
        {portadaTitle}
      </Typography>

      <Box
        component="img"
        src="/portada.png"
        alt="Portada Actua"
        sx={{ width: '60%', maxWidth: 300 }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={() => setStage('ingreso')}
      >
        {portadaButton}
      </Button>
    </Stack>
  )
}
