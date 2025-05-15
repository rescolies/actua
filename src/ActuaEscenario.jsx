import { useState } from 'react'
import Paso1Situacion from './components/Paso1Situacion'
import Paso2Elecciones from './components/Paso2Elecciones'
import Paso3Resultado from './components/Paso3Resultado'
import BarraProgreso from './components/BarraProgreso'
import './components/ActuaEscenario.css'
import './components/botones-laterales.css'

function ActuaEscenario() {
  const [pasoActual, setPasoActual] = useState(1)
  const [eleccion, setEleccion] = useState('')

  const tieneOtraSituacion = false

  const avanzar = (opcion = '') => {
    if (pasoActual === 2 && !opcion) return // Evita avanzar sin elección
    if (pasoActual === 2) setEleccion(opcion)
    setPasoActual(pasoActual + 1)
  }

  const avanzarSiguienteSituacion = () => {
    alert("Aquí cargarías la siguiente situación.")
  }

  const retroceder = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1)
  }

  return (
    <div className="contenedor-paso">
      <header className="titulo-fijo">
        YO TAMBIÉN QUIERO PATATAS
      </header>

      <div className="contenido-pasos">
        {pasoActual === 1 && <Paso1Situacion avanzar={avanzar} />}
        {pasoActual === 2 && <Paso2Elecciones avanzar={avanzar} />}
        {pasoActual === 3 && <Paso3Resultado eleccion={eleccion} />}
      </div>

      <BarraProgreso pasoActual={pasoActual} total={3} />

      {pasoActual > 1 && (
        <button onClick={retroceder} className="boton-lateral izquierda">
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
          ATRÁS
        </button>
      )}

      {(pasoActual === 1 || (pasoActual === 3 && tieneOtraSituacion)) && (
        <button
          onClick={pasoActual === 3 ? avanzarSiguienteSituacion : () => avanzar()}
          className="boton-lateral derecha"
        >
          <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
          SIGUIENTE
        </button>
      )}
    </div>
  )
}

export default ActuaEscenario
