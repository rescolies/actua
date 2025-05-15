const textos = {
  es: {
    ui: {
      // Portada
      portadaTitle: 'ACTUA',
      portadaButton: 'SIGUIENTE',

      // Ingreso alumno
      ingresoPrompt: 'Introduce el nombre del alumno',
      ingresoLabel: 'Nombre',
      ingresoError: 'Nombre no válido',
      ingresoButton: 'SIGUIENTE',

      // Menú principal
      greeting: 'Hola,',
      logout: 'LOGOUT',

      // Menú lateral en escenario
      menu: 'MENÚ',

      atras: 'ATRÁS',
      siguiente: 'SIGUIENTE',
      pasoTexto: (act, tot) => `Paso ${act} de ${tot}`,
      errorSinEleccion: 'No hay resultado disponible. Vuelve a hacer una elección.',
      // Etiquetas de categorías
      categories: {
        sociales: 'Situaciones sociales',
        emociones: 'Emociones',
        coherencia: 'Coherencia central'
      }
    },
    escenas: [
      {
        id: 'patatas',
        categoria: 'sociales',
        titulo: 'YO TAMBIÉN QUIERO PATATAS',
        pictos: [
          'situacion1/picto1.png',
          'situacion1/picto2.png',
          'situacion1/picto3.png'
        ],
        pasos: (() => {
          const base = 'situacion1/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL NIÑO Y OBSERVA A DOS NIÑOS COMIENDO PATATAS.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
              opciones: [
                { id: 'nada', texto: 'NO HACE NADA', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: 'SE ENFADA', imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'HACE UN GESTO', imagen: base + 'eleccion3.png' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                nada: { texto: 'LOS OTROS NIÑOS NO REACCIONAN', imagen: base + 'resultado1.png' },
                enfado: { texto: 'LOS OTROS NIÑOS SE ALEJAN', imagen: base + 'resultado2.png' },
                gesto: { texto: 'LOS NIÑOS COMPARTEN LAS PATATAS', imagen: base + 'resultado3.png' }
              }
            }
          ]
        })()
      },
      {
        id: 'juguete',
        categoria: 'emociones',
        titulo: 'SE ROMPE UN JUGUETE',
        pictos: [
          'situacion2/picto1.png',
          'situacion2/picto2.png'
        ],
        pasos: (() => {
          const base = 'situacion2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'EL NIÑO Y VE CÓMO UN JUGUETE FAVORITO SE ROMPE AL CAER.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ PUEDE HACER EL NIÑO Y?',
              opciones: [
                { id: 'llora', texto: 'LLORA', imagen: base + 'eleccion1.png' },
                { id: 'ayuda', texto: 'PIDE AYUDA', imagen: base + 'eleccion2.png' },
                { id: 'ignora', texto: 'IGNORA EL JUGUETE', imagen: base + 'eleccion3.png' },
                { id: 'tira', texto: 'SE ENFADA Y LO TIRA', imagen: base + 'eleccion4.png' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSECUENCIA PROBABLE',
              resultados: {
                llora: { texto: 'UN ADULTO LO CONSUELA', imagen: base + 'resultado1.png' },
                ayuda: { texto: 'REPARAN EL JUGUETE JUNTOS', imagen: base + 'resultado2.png' },
                ignora: { texto: 'SE SIENTE TRISTE PERO CALMADO', imagen: base + 'resultado3.png' },
                tira: { texto: 'ROMPE OTROS OBJETOS Y LO REGAÑAN', imagen: base + 'resultado4.png' }
              }
            }
          ]
        })()
      }
      // ... aquí podrás añadir más escenas, cada una con su campo `categoria`
    ]
  },
  ca: {
    ui: {
      portadaTitle: 'ACTUA',
      portadaButton: 'SEGÜENT',

      ingresoPrompt: 'Introdueix el nom de l’alumne',
      ingresoLabel: 'Nom',
      ingresoError: 'Nom no vàlid',
      ingresoButton: 'SEGÜENT',

      greeting: 'Hola,',
      logout: 'SORTIR',

      menu: 'MENÚ',

      atras: 'ENRERE',
      siguiente: 'SEGÜENT',
      pasoTexto: (act, tot) => `Pas ${act} de ${tot}`,
      errorSinEleccion: 'No hi ha resultat disponible. Torna a fer una elecció.',

      categories: {
        sociales: 'Situacions socials',
        emociones: 'Emocions',
        coherencia: 'Coherència central'
      }
    },
    escenas: [
      {
        id: 'patatas',
        categoria: 'sociales',
        titulo: 'JO TAMBÉ VULL PATATES',
        pictos: [
          'situacion1/picto1.png',
          'situacion1/picto2.png',
          'situacion1/picto3.png'
        ],
        pasos: (() => {
          const base = 'situacion1/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'EL NEN Y OBSERVA DOS NENS MENJANT PATATES.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUÈ POT FER EL NEN Y?',
              opciones: [
                { id: 'nada', texto: 'NO FA RES', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: "S’ENFADA", imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'FA UN GEST', imagen: base + 'eleccion3.png' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSEQÜÈNCIA PROBABLE',
              resultados: {
                nada: { texto: 'ELS ALTRES NENS NO REACCIONEN', imagen: base + 'resultado1.png' },
                enfado: { texto: 'ELS ALTRES NENS S’ALLUNYEN', imagen: base + 'resultado2.png' },
                gesto: { texto: 'ELS NENS COMPARTEIXEN LES PATATES', imagen: base + 'resultado3.png' }
              }
            }
          ]
        })()
      },
      {
        id: 'juguete',
        categoria: 'emociones',
        titulo: 'ES TRONCA UN JOGUET',
        pictos: [
          'situacion2/picto1.png',
          'situacion2/picto2.png'
        ],
        pasos: (() => {
          const base = 'situacion2/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'EL NEN Y VEU COM UN DELS SEUS JOGUETS FAVORITS ES TRONCA EN CAURE.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUÈ POT FER EL NEN Y?',
              opciones: [
                { id: 'llora', texto: 'PLORA', imagen: base + 'eleccion1.png' },
                { id: 'ayuda', texto: 'DEMANA AJUDA', imagen: base + 'eleccion2.png' },
                { id: 'ignora', texto: 'IGNORA EL JOGUET', imagen: base + 'eleccion3.png' },
                { id: 'tira', texto: "S’ENFADA I EL LLENÇA", imagen: base + 'eleccion4.png' }
              ]
            },
            {
              tipo: 'resultado',
              titulo: 'CONSEQÜÈNCIA PROBABLE',
              resultados: {
                llora: { texto: 'UN ADULT EL CONSOLA', imagen: base + 'resultado1.png' },
                ayuda: { texto: 'REPARAN EL JOGUET JUNTS', imagen: base + 'resultado2.png' },
                ignora: { texto: 'SE SENT TRIST PERÒ CALMAT', imagen: base + 'resultado3.png' },
                tira: { texto: 'TRONCA ALTRES OBJECTES I EL RENYEN', imagen: base + 'resultado4.png' }
              }
            }
          ]
        })()
      }
    ]
  }
}

export default textos
