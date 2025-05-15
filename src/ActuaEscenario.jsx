import { useState } from 'react'
import Paso1Situacion from './components/Paso1Situacion'
import Paso2Elecciones from './components/Paso2Elecciones'
import Paso3Resultado from './components/Paso3Resultado'
import BarraProgreso from './components/BarraProgreso'
import './components/ActuaEscenario.css'

function ActuaEscenario() {
  const [pasoActual, setPasoActual] = useState(1)
  const [eleccion, setEleccion] = useState('')

  const avanzar = (opcion = '') => {
    if (pasoActual === 2) setEleccion(opcion)
    setPasoActual(pasoActual + 1)
  }

  const retroceder = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1)
  }

  return (
    <div className="contenedor-paso">
      <BarraProgreso pasoActual={pasoActual} total={3} />

      {pasoActual === 1 && <Paso1Situacion avanzar={avanzar} />}
      {pasoActual === 2 && <Paso2Elecciones avanzar={avanzar} />}
      {pasoActual === 3 && <Paso3Resultado eleccion={eleccion} retroceder={retroceder} />}

      <div className="botones-navegacion">
        <button onClick={retroceder} disabled={pasoActual === 1}>
          ATRÁS
        </button>
        {pasoActual === 1 && (
          <button onClick={() => avanzar()}>
            SIGUIENTE
          </button>
        )}
      </div>
    </div>
  )
}

export default ActuaEscenario
