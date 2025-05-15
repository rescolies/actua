import { useState } from 'react'

const pasos = [
  {
    paso: 1,
    descripcion: 'UN NIÑO OBSERVA A DOS NIÑOS COMIENDO PATATAS. QUIERE PARTICIPAR.',
    imagen: '/escena1.png'
  },
  {
    paso: 2,
    descripcion: '¿QUÉ HACE EL NIÑO?',
    opciones: [
      'NO HACE NADA',
      'SE ENFADA',
      'HACE UN GESTO PARA PEDIR',
      'VERBALIZA SU DESEO'
    ],
    imagen: '/escena2.png'
  },
  {
    paso: 3,
    descripcion: 'RESULTADO SEGÚN LO QUE ELIJA...',
    imagenesResultado: {
      'NO HACE NADA': '/resultado1.png',
      'SE ENFADA': '/resultado2.png',
      'HACE UN GESTO PARA PEDIR': '/resultado3.png',
      'VERBALIZA SU DESEO': '/resultado3.png'
    },
    textosResultado: {
      'NO HACE NADA': 'LOS OTROS NIÑOS NO REACCIONAN.',
      'SE ENFADA': 'LOS NIÑOS SE ALEJAN O LO IGNORAN.',
      'HACE UN GESTO PARA PEDIR': 'LOS NIÑOS COMPARTEN SUS PATATAS.',
      'VERBALIZA SU DESEO': 'LOS NIÑOS COMPARTEN SUS PATATAS.'
    }
  }
]

export default function ActuaEscenario() {
  const [pasoActual, setPasoActual] = useState(1)
  const [eleccion, setEleccion] = useState('')

  const avanzar = (opcion = '') => {
    if (pasoActual === 2) setEleccion(opcion)
    setPasoActual(pasoActual + 1)
  }

  const retroceder = () => {
    if (pasoActual > 1) setPasoActual(pasoActual - 1)
  }

  const renderBarraProgreso = () => (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: n <= pasoActual ? '#333' : '#ccc'
          }}
        />
      ))}
    </div>
  )

  const paso = pasos.find(p => p.paso === pasoActual)

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', color: '#222' }}>
      {renderBarraProgreso()}
      <h2 style={{ textAlign: 'left', textTransform: 'uppercase' }}>{paso.descripcion}</h2>

      {paso.imagen && (
        <img src={paso.imagen} alt="Escena" style={{ width: '100%', margin: '1rem 0' }} />
      )}

      {paso.opciones && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {paso.opciones.map((opcion) => (
            <button
              key={opcion}
              onClick={() => avanzar(opcion)}
              style={{
                textAlign: 'left',
                textTransform: 'uppercase',
                padding: '1rem',
                border: '1px solid #999',
                backgroundColor: '#f1f1f1',
                fontWeight: 'bold'
              }}
            >
              {opcion}
            </button>
          ))}
        </div>
      )}

      {paso.paso === 3 && (
        <div style={{ marginTop: '2rem' }}>
          <p style={{ textAlign: 'left', textTransform: 'uppercase' }}>{paso.textosResultado[eleccion]}</p>
          <img src={paso.imagenesResultado[eleccion]} alt="Resultado" style={{ width: '100%', marginTop: '1rem' }} />
        </div>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={retroceder} disabled={pasoActual === 1} style={{ textTransform: 'uppercase' }}>
          ATRÁS
        </button>
        {pasoActual < 3 && !paso.opciones && (
          <button onClick={() => avanzar()} style={{ textTransform: 'uppercase' }}>
            SIGUIENTE
          </button>
        )}
      </div>
    </div>
  )
}
