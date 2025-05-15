const escenas = [
  {
    titulo: "YO TAMBIÉN QUIERO PATATAS",
    pasos: [
      {
        tipo: "situacion",
        titulo: "SITUACIÓN",
        descripcion: "El niño Y observa a dos niños comiendo patatas.",
        imagen: "situacion1/escena1.png"
      },
      {
        tipo: "eleccion",
        titulo: "¿QUÉ PUEDE HACER EL NIÑO Y?",
        opciones: [
          { texto: "NO HACE NADA", imagen: "situacion1/eleccion1.png" },
          { texto: "SE ENFADA", imagen: "situacion1/eleccion2.png" },
          { texto: "HACE UN GESTO", imagen: "situacion1/eleccion3.png" }
        ]
      },
      {
        tipo: "resultado",
        titulo: "CONSECUENCIA PROBABLE",
        resultados: {
          "NO HACE NADA": {
            texto: "LOS OTROS NIÑOS NO REACCIONAN",
            imagen: "situacion1/resultado1.png"
          },
          "SE ENFADA": {
            texto: "LOS OTROS NIÑOS SE ALEJAN",
            imagen: "situacion1/resultado2.png"
          },
          "HACE UN GESTO": {
            texto: "LOS NIÑOS COMPARTEN LAS PATATAS",
            imagen: "situacion1/resultado3.png"
          }
        }
      }
    ]
  },
  {
    titulo: "SE ROMPE UN JUGUETE",
    pasos: [
      {
        tipo: "situacion",
        titulo: "SITUACIÓN",
        descripcion: "El niño Y ve cómo un juguete favorito se rompe al caer.",
        imagen: "situacion2/escena1.png"
      },
      {
        tipo: "eleccion",
        titulo: "¿QUÉ PUEDE HACER EL NIÑO Y?",
        opciones: [
          { texto: "LLORA", imagen: "situacion2/eleccion1.png" },
          { texto: "PIDE AYUDA", imagen: "situacion2/eleccion2.png" },
          { texto: "IGNORA EL JUGUETE", imagen: "situacion2/eleccion3.png" },
          { texto: "SE ENFADA Y LO TIRA", imagen: "situacion2/eleccion4.png" }
        ]
      },
      {
        tipo: "resultado",
        titulo: "CONSECUENCIA PROBABLE",
        resultados: {
          "LLORA": {
            texto: "UN ADULTO LO CONSUELA",
            imagen: "situacion2/resultado1.png"
          },
          "PIDE AYUDA": {
            texto: "REPARAN EL JUGUETE JUNTOS",
            imagen: "situacion2/resultado2.png"
          },
          "IGNORA EL JUGUETE": {
            texto: "SE SIENTE TRISTE PERO CALMADO",
            imagen: "situacion2/resultado3.png"
          },
          "SE ENFADA Y LO TIRA": {
            texto: "ROMPE OTROS OBJETOS Y LO REGAÑAN",
            imagen: "situacion2/resultado4.png"
          }
        }
      }
    ]
  }
]

export default escenas
