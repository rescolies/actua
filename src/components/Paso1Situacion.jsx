function Paso1Situacion({ avanzar }) {
    return (
      <>
        <h2 className="subtitulo">SITUACIÓN</h2>
        <div className="opcion" onClick={() => avanzar()}>
          <img src={`${import.meta.env.BASE_URL}escena1.png`} alt="Escena inicial" className="imagen-opcion" />
          <p className="descripcion">EL NIÑO Y OBSERVA A DOS NIÑOS COMIENDO PATATAS</p>
        </div>
      </>
    )
  }
  
  export default Paso1Situacion
  