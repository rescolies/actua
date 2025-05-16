import React, { useState, useEffect } from 'react'
import { Stack, Typography, TextField, Button, Box } from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim())

export default function IngresoAlumno() {
  const { login, idioma } = useActua()
  const ui = textos[idioma].ui

  const [usuarios, setUsuarios] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // ▶️ Al montar, recupera la lista de alumnos del servidor
  useEffect(() => {
    fetch('/api/getAlumnos')
      .then(res => res.json())
      .then(json => setUsuarios(json.map(a => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false))
  }, [])

  // ▶️ Crear alumno nuevo
  const handleNew = async () => {
    if (!isValidName(name)) {
      setError(true)
      return
    }
    setError(false)
    // Llamada al servidor
    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: name.trim() })
    })
    if (res.ok) {
      // Añádelo a la lista y dispara login
      setUsuarios([...usuarios, name.trim()])
      login(name.trim())
    } else {
      // mostrar error si quieres…
      console.error('Error al crear alumno')
    }
  }

  return (
    <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
      {/* 1) Lista de usuarios existentes */}
      {!loading && usuarios.length > 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {ui.ingresoPrompt}:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
            {usuarios.map(u => (
              <Button key={u} variant="outlined" onClick={() => login(u)}>
                {u}
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {/* 2) Entrada de nombre nuevo */}
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

      {/* 3) Acceso Admin */}
      <Button variant="text" color="secondary" onClick={() => login('admin')}>
        ADMIN
      </Button>
    </Stack>
  )
}
