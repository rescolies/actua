// src/textos.js

const textos = {
    es: {
      atras: 'ATRÁS',
      siguiente: 'SIGUIENTE',
      pasoTexto: (act, tot) => `Paso ${act} de ${tot}`,
      errorSinEleccion: 'No hay resultado disponible. Vuelve a hacer una elección.'
    },
    ca: {
      atras: 'ENRERE',
      siguiente: 'SEGÜENT',
      pasoTexto: (act, tot) => `Pas ${act} de ${tot}`,
      errorSinEleccion: "No hi ha resultat. Torna a fer una elecció."
    }
  }
  
  export default textos
  