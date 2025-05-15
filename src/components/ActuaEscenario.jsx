// src/components/ActuaEscenario.jsx

import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import escenas from '../escenas'
import textos from '../textos.js'

const ActuaEscenario = () => {
  // --- Estado de idioma (es / ca) ---
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem('idioma') || 'ca'
  })
  useEffect(() => {
    localStorage.setItem('idioma', idioma)
  }, [idioma])

  // --- Estado de escena, paso y elecciones ---
  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const [elecciones, setElecciones] = useState(() => {
    const saved = localStorage.getItem('elecciones')
    return saved ? JSON.parse(saved) : {}
  })
  // Persistir elecciones
  useEffect(() => {
    localStorage.setItem('elecciones', JSON.stringify(elecciones))
  }, [elecciones])

  // Elección concreta de la escena actual
  const [eleccion, setEleccion] = useState('')
  // Al cambiar de escena, recuperar elección previa
  useEffect(() => {
    setEleccion(elecciones[indiceEscena] || '')
  }, [indiceEscena, elecciones])

  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length

  // --- Función Avanzar ---
  const avanzar = (op = '') => {
    if (pasoActual.tipo === 'eleccion') {
      if (!op) return
      const n = { ...elecciones, [indiceEscena]: op }
      setElecciones(n)
      setEleccion(op)
    }
    if (paso < totalPasos - 1) {
      setPaso(paso + 1)
    } else if (indiceEscena < escenas.length - 1) {
      setIndiceEscena(indiceEscena + 1)
      setPaso(0)
      // eleccion se recupera por useEffect
    }
  }

  // --- Función Retroceder ---
  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1)
    } else if (indiceEscena > 0) {
      const ne = indiceEscena - 1
      const plen = escenas[ne].pasos.length
      setIndiceEscena(ne)
      setPaso(plen - 1)
      // eleccion se recupera por useEffect
    }
  }

  // --- Indicadores visuales de progreso ---
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

  // --- Renderizado de contenido según tipo ---
  const renderContenido = () => {
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center">
          <img
            src={`/${pasoActual.imagen}`}
            alt="Escena"
            style={{
              maxWidth: '100%',
              maxHeight: 'calc(100vh - 200px)',
              objectFit: 'contain'
            }}
          />
          <Typography mt={2}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    }
    if (pasoActual.tipo === 'eleccion') {
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
    }
    // tipo === 'resultado'
    const resultado = pasoActual.resultados[eleccion]
    if (!resultado) {
      return (
        <Box textAlign="center" mt={4}>
          <Typography color="error">
            {textos[idioma].errorSinEleccion}
          </Typography>
        </Box>
      )
    }
    return (
      <Box textAlign="center">
        <img
          src={`/${resultado.imagen}`}
          alt={resultado.texto}
          style={{
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 200px)',
            objectFit: 'contain'
          }}
        />
        <Typography mt={2}>{resultado.texto}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 4, mx: { xs: '60px', sm: '80px' }, position: 'relative', pb: 8 }}>
      {/* --- Selector de idioma --- */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Button size="small" onClick={() => setIdioma(idioma === 'es' ? 'ca' : 'es')}>
          {idioma === 'es' ? 'CAT' : 'ES'}
        </Button>
      </Box>

      {/* --- Título y subtítulo --- */}
      <Typography variant="h4" align="center" gutterBottom>
        {escena.titulo}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
        {pasoActual.titulo}
      </Typography>

      {/* --- Contenido principal --- */}
      {renderContenido()}

      {/* --- Progreso visual y texto de paso --- */}
      {renderProgreso()}
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        {textos[idioma].pasoTexto(paso + 1, totalPasos)}
      </Typography>

      {/* --- Botón ATRÁS --- */}
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
          {textos[idioma].atras}
        </Button>
      )}

      {/* --- Botón SIGUIENTE --- */}
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
          {textos[idioma].siguiente}
        </Button>
      )}
    </Box>
  )
}

export default ActuaEscenario
