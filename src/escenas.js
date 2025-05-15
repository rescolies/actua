const escenas = [
  {
    titulo: "YO TAMBIÉN QUIERO PATATAS",
    pasos: (() => {
      const base = "situacion1/";
      return [
        {
          tipo: "situacion",
          titulo: "SITUACIÓN",
          descripcion: "El niño Y observa a dos niños comiendo patatas.",
          imagen: base + "escena1.png"
        },
        {
          tipo: "eleccion",
          titulo: "¿QUÉ PUEDE HACER EL NIÑO Y?",
          opciones: [
            { texto: "NO HACE NADA", imagen: base + "eleccion1.png" },
            { texto: "SE ENFADA", imagen: base + "eleccion2.png" },
            { texto: "HACE UN GESTO", imagen: base + "eleccion3.png" }
          ]
        },
        {
          tipo: "resultado",
          titulo: "CONSECUENCIA PROBABLE",
          resultados: {
            "NO HACE NADA": { texto: "LOS OTROS NIÑOS NO REACCIONAN", imagen: base + "resultado1.png" },
            "SE ENFADA": { texto: "LOS OTROS NIÑOS SE ALEJAN", imagen: base + "resultado2.png" },
            "HACE UN GESTO": { texto: "LOS NIÑOS COMPARTEN LAS PATATAS", imagen: base + "resultado3.png" }
          }
        }
      ];
    })()
  },
  {
    titulo: "SE ROMPE UN JUGUETE",
    pasos: (() => {
      const base = "situacion2/";
      return [
        {
          tipo: "situacion",
          titulo: "SITUACIÓN",
          descripcion: "El niño Y ve cómo un juguete favorito se rompe al caer.",
          imagen: base + "escena1.png"
        },
        {
          tipo: "eleccion",
          titulo: "¿QUÉ PUEDE HACER EL NIÑO Y?",
          opciones: [
            { texto: "LLORA", imagen: base + "eleccion1.png" },
            { texto: "PIDE AYUDA", imagen: base + "eleccion2.png" },
            { texto: "IGNORA EL JUGUETE", imagen: base + "eleccion3.png" },
            { texto: "SE ENFADA Y LO TIRA", imagen: base + "eleccion4.png" }
          ]
        },
        {
          tipo: "resultado",
          titulo: "CONSECUENCIA PROBABLE",
          resultados: {
            "LLORA": { texto: "UN ADULTO LO CONSUELA", imagen: base + "resultado1.png" },
            "PIDE AYUDA": { texto: "REPARAN EL JUGUETE JUNTOS", imagen: base + "resultado2.png" },
            "IGNORA EL JUGUETE": { texto: "SE SIENTE TRISTE PERO CALMADO", imagen: base + "resultado3.png" },
            "SE ENFADA Y LO TIRA": { texto: "ROMPE OTROS OBJETOS Y LO REGAÑAN", imagen: base + "resultado4.png" }
          }
        }
      ];
    })()
  }
]
export default escenas;