function BarraProgreso({ pasoActual, total }) {
    return (
      <div className="barra-progreso">
        {[...Array(total)].map((_, i) => (
          <span key={i} className={`paso ${i + 1 <= pasoActual ? 'activo' : ''}`} title={`PASO ${i + 1}`}>
            ●
          </span>
        ))}
      </div>
    )
  }
  
  export default BarraProgreso
  