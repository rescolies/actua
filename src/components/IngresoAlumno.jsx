// src/components/IngresoAlumno.jsx
import React, { useState } from 'react'
import { Stack, Typography, TextField, Button, Box } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim())

export default function IngresoAlumno() {
  const { login, perfiles, idioma, setStage } = useActua()
  const ui = textos[idioma].ui

  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const handleNew = () => {
    if (isValidName(name)) {
      login(name.trim())
    } else {
      setError(true)
    }
  }

  return (
    <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
      {/* Selección de usuario existente */}
      {Object.keys(perfiles).length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {ui.ingresoPrompt}:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
            {Object.keys(perfiles).map(u => (
              <Button
                key={u}
                variant="outlined"
                onClick={() => login(u)}
              >
                {u}
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {/* Crear nuevo usuario */}
      <Typography variant="h6">{ui.ingresoPrompt}</Typography>
      <TextField
        label={ui.ingresoLabel}
        value={name}
        onChange={e => { setName(e.target.value); setError(false) }}
        error={error}
        helperText={error ? ui.ingresoError : ''}
      />
      <Button
        variant="contained"
        onClick={handleNew}
        disabled={!name.trim()}
      >
        {ui.ingresoButton}
      </Button>

      {/* Acceso ADMIN */}
      <Button
        variant="text"
        color="secondary"
        onClick={() => setStage('admin')}
      >
        ADMIN
      </Button>
    </Stack>
  )
}
