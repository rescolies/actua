import React, { useState } from 'react'
import { Stack, Typography, TextField, Button } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim())

export default function IngresoAlumno() {
  const { login, idioma } = useActua()
  const { ingresoPrompt, ingresoLabel, ingresoError, ingresoButton } = textos[idioma].ui

  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const handleNext = () => {
    if (isValidName(name)) {
      login(name.trim())
    } else {
      setError(true)
    }
  }

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 8 }}>
      <Typography variant="h5">{ingresoPrompt}</Typography>
      <TextField
        label={ingresoLabel}
        value={name}
        onChange={e => { setName(e.target.value); setError(false) }}
        error={error}
        helperText={error ? ingresoError : ''}
      />
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={!name.trim()}
      >
        {ingresoButton}
      </Button>
    </Stack>
  )
}
