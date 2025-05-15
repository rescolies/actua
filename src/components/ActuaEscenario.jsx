import React, { useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import escenas from '../escenas'

const ActuaEscenario = () => {
  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const [eleccion, setEleccion] = useState('')
  const [elecciones, setElecciones] = useState({}) // <- Guarda todas las elecciones

  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length

  const avanzar = (op = '') => {
    if (pasoActual.tipo === 'eleccion') {
      if (!op) return
      const nuevasElecciones = { ...elecciones, [indiceEscena]: op }
      setElecciones(nuevasElecciones)
      setEleccion(op)
    }

    if (paso < totalPasos - 1) {
      setPaso(paso + 1)
    } else if (indiceEscena < escenas.length - 1) {
      const nuevaEscena = indiceEscena + 1
      setIndiceEscena(nuevaEscena)
      setPaso(0)
      setEleccion(elecciones[nuevaEscena] || '')
    }
  }

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1)
    } else if (indiceEscena > 0) {
      const nuevaEscena = indiceEscena - 1
      const pasosPrevios = escenas[nuevaEscena].pasos
      setIndiceEscena(nuevaEscena)
      setPaso(pasosPrevios.length - 1)
      setEleccion(elecciones[nuevaEscena] || '')
    }
  }

  const renderProgreso = () => (
    <Box display="flex" justifyContent="center" gap={1} mt={4}>
      {Array.from({ length: totalPasos }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: i <= paso ? '#333' : '#ccc'
          }}
        />
      ))}
    </Box>
  )

  const renderContenido = () => {
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center">
          <img
            src={`/${pasoActual.imagen}`}
            alt="Escena"
            style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
          />
          <Typography mt={2}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    } else if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2}>
          {pasoActual.opciones.map((op) => (
            <Grid item xs={12} sm={6} key={op.texto}>
              <Box
                onClick={() => avanzar(op.texto)}
                sx={{
                  border: '1px solid #aaa',
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                <img src={`/${op.imagen}`} alt={op.texto} style={{ maxWidth: '100%' }} />
                <Typography mt={1}>{op.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    } else if (pasoActual.tipo === 'resultado') {
      const resultado = pasoActual.resultados[eleccion]
      if (!resultado) {
        return (
          <Box textAlign="center" mt={4}>
            <Typography color="error">No hay resultado disponible. Vuelve a hacer una elección.</Typography>
          </Box>
        )
      }
      return (
        <Box textAlign="center">
          <img
            src={`/${resultado.imagen}`}
            alt={resultado.texto}
            style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 200px)', objectFit: 'contain' }}
          />
          <Typography mt={2}>{resultado.texto}</Typography>
        </Box>
      )
    }
  }

  return (
    <Box sx={{ mt: 4, mx: { xs: '60px', sm: '80px' }, position: 'relative', pb: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {escena.titulo}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        {pasoActual.titulo}
      </Typography>

      {renderContenido()}
      {renderProgreso()}

      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        Paso {paso + 1} de {totalPasos}
      </Typography>

      {!(indiceEscena === 0 && paso === 0) && (
        <Button
          onClick={retroceder}
          startIcon={<ArrowBackIosNewIcon />}
          variant="outlined"
          sx={{
            position: 'fixed',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)',
            zIndex: 10,
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          ATRÁS
        </Button>
      )}

      {(pasoActual.tipo === 'situacion' ||
        (pasoActual.tipo === 'resultado' && indiceEscena < escenas.length - 1)) && (
        <Button
          onClick={() => avanzar()}
          endIcon={<ArrowForwardIosIcon />}
          variant="contained"
          sx={{
            position: 'fixed',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)',
            zIndex: 10,
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          SIGUIENTE
        </Button>
      )}
    </Box>
  )
}

export default ActuaEscenario
