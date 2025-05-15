function Paso3Resultado({ eleccion }) {
    const textos = {
      'NO HACE NADA': 'LOS OTROS NIÑOS NO REACCIONAN',
      'SE ENFADA': 'LOS OTROS NIÑOS SE ALEJAN',
      'PIDE PATATAS': 'LOS NIÑOS COMPARTEN LAS PATATAS'
    }
  
    const imagenes = {
      'NO HACE NADA': '/resultado1.png',
      'SE ENFADA': '/resultado2.png',
      'PIDE PATATAS': '/resultado3.png'
    }
  
    return (
      <>
        <h2 className="titulo">CONSECUENCIA DE LA ELECCIÓN</h2>
        <p className="descripcion">{textos[eleccion]}</p>
        <img src={imagenes[eleccion]} alt={textos[eleccion]} className="imagen" />
      </>
    )
  }
  
  export default Paso3Resultado
  