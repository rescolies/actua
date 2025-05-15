import React, { useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import escenas from '../escenas'

const ActuaEscenario = () => {
  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const [eleccion, setEleccion] = useState('')

  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]

  const avanzar = (op = '') => {
    if (pasoActual.tipo === 'eleccion' && !op) return
    if (pasoActual.tipo === 'eleccion') setEleccion(op)
    if (paso < escena.pasos.length - 1) {
      setPaso(paso + 1)
    } else if (indiceEscena < escenas.length - 1) {
      setIndiceEscena(indiceEscena + 1)
      setPaso(0)
      setEleccion('')
    }
  }

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1)
    } else if (indiceEscena > 0) {
      setIndiceEscena(indiceEscena - 1)
      setPaso(escenas[indiceEscena - 1].pasos.length - 1)
    }
  }

  const renderContenido = () => {
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center">
          <img src={`/${pasoActual.imagen}`} alt="Escena" style={{ maxWidth: '100%' }} />
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
      return (
        <Box textAlign="center">
          <img src={`/${resultado.imagen}`} alt={resultado.texto} style={{ maxWidth: '100%' }} />
          <Typography mt={2}>{resultado.texto}</Typography>
        </Box>
      )
    }
  }

  const hayOtraEscena = indiceEscena < escenas.length - 1

  return (
    <Box sx={{ mt: 4, mb: 8, mx: { xs: '60px', sm: '80px' }, position: 'relative' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {escena.titulo}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        {pasoActual.titulo}
      </Typography>

      {renderContenido()}

      <Typography align="center" variant="body2" sx={{ mt: 4 }}>
        Paso {paso + 1} de {escena.pasos.length}
      </Typography>

      {paso > 0 && (
        <Button
          onClick={retroceder}
          startIcon={<ArrowBackIosNewIcon />}
          variant="outlined"
          sx={{ position: 'fixed', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 999 }}
        >
          ATRÁS
        </Button>
      )}

      {(pasoActual.tipo === 'situacion' ||
        (pasoActual.tipo === 'resultado' && hayOtraEscena)) && (
        <Button
          onClick={() => avanzar()}
          endIcon={<ArrowForwardIosIcon />}
          variant="contained"
          sx={{ position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 999 }}
        >
          SIGUIENTE
        </Button>
      )}
    </Box>
  )
}

export default ActuaEscenario
