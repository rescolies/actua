// src/components/ActuaEscenario.jsx
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Grid,
  Drawer,
  IconButton,
  Stack
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import textos from '../textos'
import { useActua } from '../context/ActuaContext'
import DrawerMenu from './DrawerMenu'

const ActuaEscenario = () => {
  const {
    indiceEscena,
    paso,
    elecciones,
    idioma,
    reiniciarPaso,
    setIndiceEscena,
    setPaso,
    guardarEleccion,
    cambiarIdioma
  } = useActua()

  const [menuOpen, setMenuOpen] = useState(false)

  const data = textos[idioma]
  const escenas = data.escenas
  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length
  const eleccion = elecciones[escena.id] || ''

  const goToScene = newIdx => {
    setIndiceEscena(newIdx)
    reiniciarPaso()
    setMenuOpen(false)
  }

  const avanzar = id => {
    if (pasoActual.tipo === 'eleccion') {
      if (!id) return
      guardarEleccion(escena.id, id)
    }
    if (paso < totalPasos - 1) {
      setPaso(paso + 1)
    } else if (indiceEscena < escenas.length - 1) {
      setIndiceEscena(indiceEscena + 1)
      reiniciarPaso()
    }
  }

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1)
    } else if (indiceEscena > 0) {
      const ne = indiceEscena - 1
      const plen = escenas[ne].pasos.length
      setIndiceEscena(ne)
      setPaso(plen - 1)
    }
  }

  const renderContenido = () => {
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center">
          <img
            src={`/${pasoActual.imagen}`}
            alt="Escena"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    }
    if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2}>
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}>
              <Box
                onClick={() => avanzar(op.id)}
                sx={{
                  border: '1px solid #aaa',
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                <img src={`/${op.imagen}`} alt={op.texto} style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography mt={1}>{op.texto}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    }
    // resultado
    const resultado = pasoActual.resultados[eleccion]
    if (!resultado) {
      return (
        <Box textAlign="center" mt={4}>
          <Typography color="error">{data.ui.errorSinEleccion}</Typography>
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
            height: 'auto',
            objectFit: 'contain'
          }}
        />
        <Typography mt={2}>{resultado.texto}</Typography>
      </Box>
    )
  }

  return (
    <>
      {/* DRAWER MENU */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={escenas}
          currentIndex={indiceEscena}
          completed={elecciones}
          categories={data.ui.categories}
          onSelect={goToScene}
        />
      </Drawer>

      {/* ESCENARIO */}
      <Box
        sx={{
          mt: 0,
          mx: { xs: '60px', sm: '150px' },
          position: 'relative',
          pb: 1
        }}
      >
        {/* Menú + Idioma encima del título, alineado a la izquierda */}
        <Stack
          direction="row"
          spacing={0}
          justifyContent="flex-start"
          sx={{ mb: 0 }}
        >
          <IconButton size="large" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
            <Typography sx={{ ml: 0.5 }}>{data.ui.menu}</Typography>
          </IconButton>
          <Button
            size="small"
            onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}
          >
            {idioma === 'es' ? 'CAT' : 'ES'}
          </Button>
        </Stack>

        {/* Título */}
        <Typography variant="h4" align="center" gutterBottom>
          {escena.titulo}
        </Typography>

        {/* Pictogramas (solo en paso=“situacion”) */}
        {pasoActual.tipo === 'situacion' && escena.pictos && (
          <Box display="flex" justifyContent="center" gap={4} mb={5}>
            {escena.pictos.map((pic, i) => (
              <img key={i} src={`/${pic}`} alt={`Picto ${i + 1}`} style={{ width: 40, height: 40 }} />
            ))}
          </Box>
        )}

        {/* Subtítulo */}
        <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
          {pasoActual.titulo}
        </Typography>

        {/* Contenido */}
        {renderContenido()}

        {/* Progreso */}
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
        <Typography align="center" variant="body2" sx={{ mt: 1 }}>
          {data.ui.pasoTexto(paso + 1, totalPasos)}
        </Typography>

        {/* Botón ATRÁS */}
        {!(indiceEscena === 0 && paso === 0) && (
          <Button
            onClick={retroceder}
            variant="outlined"
            sx={{
              position: 'fixed',
              top: '50%',
              left: 4,
              transform: 'translateY(-50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              backgroundColor: 'transparent',
              color: 'inherit'
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
            <Typography variant="caption" sx={{mt : 1 } }>{data.ui.atras}</Typography>
          </Button>
        )}

        {/* Botón SIGUIENTE */}
        {(pasoActual.tipo === 'situacion' ||
          (pasoActual.tipo === 'resultado' && indiceEscena < escenas.length - 1)) && (
          <Button
            onClick={() => avanzar()}
            variant="outlined"
            sx={{
              position: 'fixed',
              top: '50%',
              right: 4,
              transform: 'translateY(-50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              backgroundColor: 'transparent',
              color: 'inherit',
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
            <Typography variant="caption" sx={{mt : 1 } }>{data.ui.siguiente}</Typography>
          </Button>
        )}
      </Box>
    </>
  )
}

export default ActuaEscenario
