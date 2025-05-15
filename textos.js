const textos = {
  es: {
    titulo: "YO TAMBIÉN QUIERO PATATAS",
    paso1: "SITUACIÓN",
    paso2: "¿QUÉ PUEDE HACER EL NIÑO Y?",
    paso3: "CONSECUENCIA PROBABLE",
    atras: "ATRÁS",
    siguiente: "SIGUIENTE",
    pasoTexto: (actual, total) => `Paso ${actual} de ${total}`
  },
  ca: {
    titulo: "JO TAMBÉ VULL PATATES",
    paso1: "SITUACIÓ",
    paso2: "QUÈ POT FER EL NEN Y?",
    paso3: "CONSEQÜÈNCIA PROBABLE",
    atras: "ENRERE",
    siguiente: "SEGÜENT",
    pasoTexto: (actual, total) => `Pas ${actual} de ${total}`
  }
};

export default textos;