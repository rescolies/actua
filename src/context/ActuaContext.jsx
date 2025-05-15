import React, { createContext, useContext, useState, useEffect } from 'react'
import useIdioma from '../hooks/useIdioma'

const ActuaContext = createContext()

export function ActuaProvider({ children }) {
  const [stage, setStage] = useState('portada')       // portada → ingreso → menu → escenario
  const [user, setUser] = useState(null)              // { name, date }

  const [perfiles, setPerfiles] = useState({})        // { [name]: { date, elecciones } }
  const [elecciones, setElecciones] = useState({})    // elecciones del perfil actual

  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const reiniciarPaso = () => setPaso(0)

  const [idioma, cambiarIdioma] = useIdioma()

  // Carga perfiles al init
  useEffect(() => {
    const stored = localStorage.getItem('perfiles')
    if (stored) setPerfiles(JSON.parse(stored))
  }, [])

  // Persiste perfiles
  useEffect(() => {
    localStorage.setItem('perfiles', JSON.stringify(perfiles))
  }, [perfiles])

  // Cuando elecciones cambian, actualiza el perfil actual
  useEffect(() => {
    if (user) {
      setPerfiles(prev => ({
        ...prev,
        [user.name]: { date: user.date, elecciones }
      }))
    }
  }, [elecciones])

  function login(name) {
    const now = new Date().toISOString()
    const existing = perfiles[name]
    if (existing) {
      setElecciones(existing.elecciones)
      setUser({ name, date: existing.date })
    } else {
      // nuevo perfil
      setElecciones({})
      setUser({ name, date: now })
      setPerfiles(prev => ({
        ...prev,
        [name]: { date: now, elecciones: {} }
      }))
    }
    setStage('menu')
  }

  function logout() {
    setUser(null)
    setElecciones({})
    setIndiceEscena(0)
    setPaso(0)
    setStage('portada')
  }

  return (
    <ActuaContext.Provider
      value={{
        stage, setStage,
        user, login, logout,
        idioma, cambiarIdioma,
        elecciones, setElecciones,
        indiceEscena, setIndiceEscena,
        paso, setPaso, reiniciarPaso
      }}
    >
      {children}
    </ActuaContext.Provider>
  )
}

export function useActua() {
  const ctx = useContext(ActuaContext)
  if (!ctx) throw new Error('useActua debe usarse dentro de ActuaProvider')
  return ctx
}
