import React, { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Drawer,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import textos from '../textos'
import { useActua } from '../context/ActuaContext'
import DrawerMenu from './DrawerMenu'

const ActuaEscenario = () => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    indiceEscena,
    paso,
    elecciones,
    idioma,
    reiniciarPaso,
    setIndiceEscena,
    setPaso,
    setElecciones,
    cambiarIdioma,
    user,
    setStage
  } = useActua()

  const [menuOpen, setMenuOpen] = useState(false)
  const data = textos[idioma]
  const escenas = data.escenas
  const escena = escenas[indiceEscena]
  const pasoActual = escena.pasos[paso]
  const totalPasos = escena.pasos.length
  const eleccion = elecciones[escena.id] || ''

  // Navegar (abrir escena)
  const goToScene = idx => {
    setIndiceEscena(idx)
    reiniciarPaso()
    setMenuOpen(false)
  }

  // Avanzar lógica
  const avanzar = id => {
    const isLastScene = indiceEscena === escenas.length - 1
    const isLastStep = paso === totalPasos - 1

    // Si es elección, guarda y quizá terminas
    if (pasoActual.tipo === 'eleccion') {
      if (!id) return
      // 1) guardamos en local
      setElecciones(prev => ({ ...prev, [escena.id]: id }))
      // 2) enviamos al servidor
      fetch('/api/guardarRespuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alumno: user.name,
          datetime: new Date().toISOString(),
          situacionId: escena.id,
          paso,
          tipoPaso: 'eleccion',
          respuesta: id,
          idioma
        })
      }).catch(console.error)
      // Si es la última escena y último paso, al menú
      if (isLastScene && isLastStep) {
        setStage('menu')
        return
      }
    }

    // Si no es el último paso, avanzamos
    if (paso < totalPasos - 1) {
      setPaso(paso + 1)
      return
    }

    // paso === último paso
    if (!isLastScene) {
      // no última escena: siguiente escena
      setIndiceEscena(indiceEscena + 1)
      reiniciarPaso()
    } else {
      // última escena & paso resultado: redirige al menú
      setStage('menu')
    }
  }

  // Retroceder lógica
  const handleBack = () => {
    // primer escenario y paso: vuelve al menú
    if (indiceEscena === 0 && paso === 0) {
      setStage('menu')
      return
    }
    // sino, retrocede paso o escena
    if (paso > 0) {
      setPaso(paso - 1)
    } else {
      const prev = indiceEscena - 1
      setIndiceEscena(prev)
      setPaso(escenas[prev].pasos.length - 1)
    }
  }

  // Render del contenido (situación / elección / resultado)
  const renderContenido = () => {
    if (pasoActual.tipo === 'situacion') {
      return (
        <Box textAlign="center" mb={2}>
          <img
            src={`/${pasoActual.imagen}`}
            alt="Escena"
            style={{ maxWidth: '80%', height: 'auto' }}
          />
          <Typography mt={1}>{pasoActual.descripcion}</Typography>
        </Box>
      )
    }

    if (pasoActual.tipo === 'eleccion') {
      return (
        <Grid container spacing={2} mb={2}>
          {pasoActual.opciones.map(op => (
            <Grid item xs={12} sm={6} key={op.id}>
              <Box
                onClick={() => avanzar(op.id)}
                sx={{
                  border: 1,
                  borderColor: 'grey.400',
                  p: 2,
                  cursor: 'pointer',
                  textAlign: 'center',
                  borderRadius: 1,
                  '&:hover': { backgroundColor: '#e0e0e0' 
                   }
                }}
              >
                <img
                  src={`/${op.imagen}`}
                  alt={op.texto}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
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
      <Box textAlign="center" mb={1}>
        <img
          src={`/${resultado.imagen}`}
          alt={resultado.texto}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <Typography mt={1}>{resultado.texto}</Typography>
      </Box>
    )
  }

  return (
    <>
      {/* Menú lateral */}
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <DrawerMenu
          items={escenas}
          currentIndex={indiceEscena}
          completed={elecciones}
          categories={data.ui.categories}
          onSelect={goToScene}
        />
      </Drawer>

      <Container maxWidth="md" sx={{ pt: 1, position: 'relative' }}>
        {/* Menú + selector de idioma encima del título */}
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          {/* 1) Volver a pantalla de inicio */}
          <Button
            variant="text"
            size="small"
            startIcon={<HomeIcon />}
            onClick={() => setStage('menu')}
          >
            {data.ui.inicio}
          </Button>

          {/* 2) Abrir Drawer */}
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
            <Typography sx={{ ml: 0.5 }}>{data.ui.menu}</Typography>
          </IconButton>

          {/* 3) Selector de idioma */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => cambiarIdioma(idioma === 'es' ? 'ca' : 'es')}
          >
            {idioma === 'es' ? 'CAT' : 'ES'}
          </Button>
        </Stack>

        {/* Título */}
        <Typography variant="h5" align="center" gutterBottom>
          {escena.titulo}
        </Typography>

        {/* Pictos */}
        {pasoActual.tipo === 'situacion' && escena.pictos && (
          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            {escena.pictos.map((pic, i) => (
              <Box key={i} component="img" src={`/${pic}`} alt={`Picto ${i+1}`} width={40} height={40} />
            ))}
          </Stack>
        )}

        {/* Subtítulo */}
        <Typography variant="subtitle1" align="center" mb={0}>
          {pasoActual.titulo}
        </Typography>

        {/* Contenido principal */}
        {renderContenido()}

        {/* Progreso */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          {Array.from({ length: totalPasos }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: i <= paso ? 'text.primary' : 'grey.300'
              }}
            />
          ))}
        </Stack>
        <Typography align="center" variant="body2" mt={1}>
          {data.ui.pasoTexto(paso + 1, totalPasos)}
        </Typography>

        {/* Navegación lateral en desktop / footer en móvil */}
        {isSmUp ? (
          <>
            <Button
              onClick={handleBack}
              sx={{
                  position: 'fixed',
                top: '50%',
                  left: theme.spacing(1),
                  transform: 'translateY(-50%)',
                  minWidth: 48,
                  p: 1,
                  borderRadius: 1,
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
              variant="outlined"
            >
              <ArrowBackIosNewIcon />
                <Typography variant="caption" sx={{mt : 1 } }>{data.ui.atras}</Typography>
            </Button>
            {(pasoActual.tipo === 'situacion' ||
              (pasoActual.tipo === 'resultado' && indiceEscena < escenas.length - 1)) && (
            <Button
              onClick={() => avanzar()}
              sx={{
                  position: 'fixed',
                top: '50%',
                  right: theme.spacing(1),
                  transform: 'translateY(-50%)',
                  minWidth: 48,
                  p: 1,
                  borderRadius: 1,
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
                variant="outlined"
            >
              <ArrowForwardIosIcon />
                <Typography variant="caption" sx={{mt : 1 } }>{data.ui.siguiente}</Typography>
            </Button>
            )}
          </>
        ) : (
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={handleBack}>
              <ArrowBackIosNewIcon />
              {data.ui.atras}
            </Button>
            <Button
              onClick={() => avanzar()}
              disabled={
              pasoActual.tipo === 'eleccion' && !eleccion
              }
            >
              {data.ui.siguiente}
              <ArrowForwardIosIcon /></Button>
          </Box>
        )}
      </Container>
    </>
  )
}

export default ActuaEscenario
