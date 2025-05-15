import { useState, useEffect } from 'react'

export default function useIdioma() {
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem('idioma') || 'es'
  })

  useEffect(() => {
    localStorage.setItem('idioma', idioma)
  }, [idioma])

  const cambiarIdioma = nuevo => setIdioma(nuevo)

  return [idioma, cambiarIdioma]
}
