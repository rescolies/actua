import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { useActua } from '../context/ActuaContext'
import textos from '../textos'

export default function AdminPanel() {
  const { setStage, logout, perfiles, idioma } = useActua()
  const ui = textos[idioma].ui

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alumnos')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => {
        // fallback a perfiles locales
        const arr = Object.entries(perfiles).map(([nombre, p]) => ({
          nombre,
          fechaRegistro: p.date,
          respuestas: p.elecciones
        }))
        setData(arr)
      })
      .finally(() => setLoading(false))
  }, [perfiles])

  if (loading) return <CircularProgress sx={{ mt: 4 }} />

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      <Button onClick={logout} sx={{ mr: 1 }}>
        {ui.volverPortada}
      </Button>
      <Button onClick={() => setStage('ingreso')}>
        {ui.cambiarUsuario}
      </Button>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {ui.adminPanelTitle}
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alumno</TableCell>
            <TableCell>Fecha Registro</TableCell>
            <TableCell>Respuestas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(alum => (
            <TableRow key={alum.nombre}>
              <TableCell>{alum.nombre}</TableCell>
              <TableCell>{alum.fechaRegistro}</TableCell>
              <TableCell>
                {alum.respuestas &&
                  Object.entries(alum.respuestas).map(([sit, resp]) => (
                    <Box key={sit} component="div">
                      {sit}: {resp}
                    </Box>
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
