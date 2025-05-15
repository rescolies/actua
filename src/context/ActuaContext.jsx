import React, { createContext, useContext, useState } from 'react'
import useElecciones from '../hooks/useElecciones'
import useIdioma from '../hooks/useIdioma'

const ActuaContext = createContext()

export const ActuaProvider = ({ children }) => {
  const [indiceEscena, setIndiceEscena] = useState(0)
  const [paso, setPaso] = useState(0)
  const reiniciarPaso = () => setPaso(0)

  const [elecciones, guardarEleccion] = useElecciones()
  const [idioma, cambiarIdioma] = useIdioma()

  return (
    <ActuaContext.Provider
      value={{
        indiceEscena,
        setIndiceEscena,
        paso,
        setPaso,
        reiniciarPaso,
        elecciones,
        guardarEleccion,
        idioma,
        cambiarIdioma
      }}
    >
      {children}
    </ActuaContext.Provider>
  )
}

export const useActua = () => {
  const ctx = useContext(ActuaContext)
  if (!ctx) throw new Error('useActua must be used inside ActuaProvider')
  return ctx
}
