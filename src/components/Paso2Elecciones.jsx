function Paso2Elecciones({ avanzar }) {
    const elecciones = [
      {
        imagen: '/eleccion1.png',
        descripcion: 'NO HACE NADA'
      },
      {
        imagen: '/eleccion2.png',
        descripcion: 'SE ENFADA'
      },
      {
        imagen: '/eleccion3.png',
        descripcion: 'PIDE PATATAS'
      }
    ]
  
    return (
      <>
        <h2 className="titulo">¿QUÉ PUEDE HACER EL NIÑO Y?</h2>
        <div className="elecciones">
          {elecciones.map((opcion, index) => (
            <div key={index} className="opcion" onClick={() => avanzar(opcion.descripcion)}>
              <img src={opcion.imagen} alt={opcion.descripcion} className="imagen-opcion" />
              <p className="descripcion">{opcion.descripcion}</p>
            </div>
          ))}
        </div>
      </>
    )
  }
  
  export default Paso2Elecciones
  