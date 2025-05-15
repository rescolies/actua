import { useState, useEffect } from 'react'

export default function useElecciones() {
  const [elecciones, setElecciones] = useState(() => {
    const saved = localStorage.getItem('elecciones')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('elecciones', JSON.stringify(elecciones))
  }, [elecciones])

  const guardarEleccion = (sceneId, opcionId) => {
    setElecciones(prev => ({ ...prev, [sceneId]: opcionId }))
  }

  return [elecciones, guardarEleccion]
}
