const textos = {
  es: {
    ui: {
      // Portada
      portadaTitle: 'ACTUM',
      portadaButton: 'EMPEZAR',

      // Ingreso alumno
      ingresoPrompt: 'Introduce el nombre del alumno',
      ingresoLabel: 'Nombre',
      ingresoError: 'Nombre no válido',
      ingresoButton: 'REGISTRARSE',

      // Menú principal
      greeting: 'Hola,',
      logout: 'SALIR',

      // Menú lateral en escenario
      inicioTitle: 'INICIO',
      empezar: 'EMPEZAR',
      inicio: 'INICIO',
      menu: 'MENÚ',

      adminPanelTitle: 'Panel de Administrador',
      cambiarUsuario: 'CAMBIAR USUARIO',
      volverPortada: 'VOLVER A PORTADA',

      atras: 'ATRÁS',
      siguiente: 'SIGUIENTE',
      pasoTexto: (act, tot) => `Paso ${act} de ${tot}`,
      errorSinEleccion: 'No hay resultado disponible. Vuelve a hacer una elección.',
      // Etiquetas de categorías
      categories: {
        social: 'Situaciones sociales',
        emocionajena: 'Emociones ajenas',
        emocionpropia: 'Emociones propias',
        teoriamente: 'Teoria de la mente',
        coherencia: 'Coherencia central',
      }
    },
    escenas: [
      {
        id: 'patatas',
        categoria: 'social',
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
        id: 'aniversario',
        categoria: 'emocionpropia',
        titulo: 'TROZO PEQUEÑO DE PASTEL EN FIESTA DE ANIVERSARIO',
        pictos: [
          'emocionpropiaAniversario/picto1.png',
          'emocionpropiaAniversario/picto2.png',
          'emocionpropiaAniversario/picto3.png'
        ],
        pasos: (() => {
          const base = 'emocionpropiaAniversario/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'TODOS COMEN PASTEL EN LA FIESTA DE ANIVERSARIO DE UN AMIGO. A TI TE DAN UN TROZO MUCHO MÁS PEQUEÑO QUE AL RESTO, ALGUNOS RÍEN',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿CÓMO REACCIONAS?',
              opciones: [
                { id: 'nada', texto: 'ME PONGO TRISTE', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: 'PREGUNTO POR QUÉ ME HAN DADO MENOS', imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'RÍO CON LOS OTROS', imagen: base + 'eleccion3.png' },
                { id: 'gesto', texto: 'ME PONGO CONTENTO', imagen: base + 'eleccion4.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'juguete',
        categoria: 'emocionajena',
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
      },
      {
        id: 'emocion1',
        categoria: 'emocionajena',
        titulo: '¿CÓMO TE SIENTES?',
        pictos: [
          // si quieres pictogramas, p.ej. 'emocion1/picto1.png', …
        ],
        pasos: (() => {
          const base = 'emocion1/'
          return [
            // Paso 1
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Mira la primera imagen y observa la escena.',
              imagen: base + 'escena1.png'
            },
            // Paso 2
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Ahora mira esta otra parte de la escena.',
              imagen: base + 'escena2.png'
            },
            // Paso 3
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓN',
              descripcion: 'Fíjate bien en lo que está pasando aquí.',
              imagen: base + 'escena3.png'
            },
            // Paso 4: elección de emoción
            {
              tipo: 'eleccion',
              titulo: '¿QUÉ EMOCIÓN SIENTES?',
              opciones: [
                { id: 'feliz',     texto: 'FELIZ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',    texto: 'TRISTE',    imagen: base + 'eleccion2.png' },
                { id: 'enfado',    texto: 'ENFADADO',  imagen: base + 'eleccion3.png' },
                { id: 'asustado',  texto: 'ASUSTADO',  imagen: base + 'eleccion4.png' }
              ]
            }
          ]
        })()
        },
        {
          id: 'emocion2',
          categoria: 'emocionajena',
          titulo: 'PARTIDO DE FUTBOL',
          pictos: [
            // si quieres pictogramas, p.ej. 'emocion1/picto1.png', …
          ],
          pasos: (() => {
            const base = 'emocion2/'
            return [
              // Paso 1
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Mira la primera imagen y observa la escena.',
                imagen: base + 'escena1.png'
              },
              // Paso 2
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Ahora mira esta otra parte de la escena.',
                imagen: base + 'escena2.png'
              },
              // Paso 3
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Fíjate bien en lo que está pasando aquí.',
                imagen: base + 'escena3.png'
              },
              // Paso 4
              {
                tipo: 'situacion',
                titulo: 'SITUACIÓN',
                descripcion: 'Fíjate bien.',
                imagen: base + 'escena4.png'
              },
              // Paso 4: elección de emoción
              {
                tipo: 'eleccion',
                titulo: '¿QUÉ EMOCIÓN SIENTES?',
                opciones: [
                  { id: 'feliz',     texto: 'FELIZ',     imagen: base + 'eleccion1.png' },
                  { id: 'triste',    texto: 'TRISTE',    imagen: base + 'eleccion2.png' },
                  { id: 'enfado',    texto: 'ENFADADO',  imagen: base + 'eleccion3.png' },
                  { id: 'confuso',   texto: 'CONFUSO',   imagen: base + 'eleccion4.png' },
                  { id: 'asustado',  texto: 'ASUSTADO',  imagen: base + 'eleccion5.png' }
                ]
              }
            ]
          })()
          },
      // ... aquí podrás añadir más escenas, cada una con su campo `categoria`
    ]
  },
  ca: {
    ui: {
      portadaTitle: 'ACTUM',
      portadaButton: 'COMENÇA',

      ingresoPrompt: 'Introdueix el nom de l’alumne',
      ingresoLabel: 'Nom',
      ingresoError: 'Nom no vàlid',
      ingresoButton: 'REGISTRAR-SE',

      greeting: 'Hola,',
      logout: 'SORTIR',

      menu: 'MENÚ',
      inicioTitle: 'INICI',
      empezar: 'COMENÇAR',
      inicio: 'INICI',
      menu: 'MENÚ',

      adminPanelTitle: 'Panel de Administrador',
      cambiarUsuario: 'CANVIAR USUARI',     // en ca
      volverPortada: 'TORNAR A PORTADA',     // en ca

      atras: 'ENRERE',
      siguiente: 'SEGÜENT',
      pasoTexto: (act, tot) => `Pas ${act} de ${tot}`,
      errorSinEleccion: 'No hi ha resultat disponible. Torna a fer una elecció.',

      categories: {
        social: 'Situacions socials',
        emocionajena: 'Emocions dels altres',
        emocionpropia: 'Emocions pròpies',
        teoriamente: 'Teoria de la ment',
        coherencia: 'Coherència central',
      }
    },
    escenas: [
      {
        id: 'patatas',
        categoria: 'social',
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
        id: 'aniversario',
        categoria: 'emocionpropia',
        titulo: 'TROZO PEQUEÑO DE PASTEL EN FIESTA DE ANIVERSARIO',
        pictos: [
          'emocionpropiaAniversario/picto1.png',
          'emocionpropiaAniversario/picto2.png',
          'emocionpropiaAniversario/picto3.png'
        ],
        pasos: (() => {
          const base = 'emocionpropiaAniversario/';
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: "TOTS MENGEN PASTÍS A LA FESTA D'ANIVERSARIO D'UN AMIC. A TU TE'N DONEN UN TROS MOLT MÉS PETIT QUE A LA RESTA, ALGUNS RIUEN.",
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'eleccion',
              titulo: '¿CÓMO REACCIONAS?',
              opciones: [
                { id: 'nada', texto: 'EM POSO TRIST', imagen: base + 'eleccion1.png' },
                { id: 'enfado', texto: 'PREGUNTO POR QUÉ ME HAN DADO MENOS', imagen: base + 'eleccion2.png' },
                { id: 'gesto', texto: 'RÍO CON LOS OTROS', imagen: base + 'eleccion3.png' },
                { id: 'gesto', texto: 'ME PONGO CONTENTO', imagen: base + 'eleccion4.png' }
              ]
            },
          ]
        })()
      },
      {
        id: 'juguete',
        categoria: 'emocionajena',
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
      },
      {
        id: 'emocion1',
        categoria: 'emocionajena',
        titulo: 'COM ET SENTS?',
        pictos: [ /* opcional */ ],
        pasos: (() => {
          const base = 'emocion1/'
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Mira la primera imatge i observa l’escena.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Ara mira aquesta altra part de l’escena.',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t bé en el que està passant aquí.',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUINA EMOCIÓ SENTS?',
              opciones: [
                { id: 'feliz',    texto: 'FELIÇ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',   texto: 'TRIST',     imagen: base + 'eleccion2.png' },
                { id: 'enfado',   texto: 'ENFADAT',   imagen: base + 'eleccion3.png' },
                { id: 'asustado', texto: 'ESPANTAT',  imagen: base + 'eleccion4.png' }
              ]
            }
          ]
        })()
      },
      {
        id: 'emocion2',
        categoria: 'emocionajena',
        titulo: 'PARTIT DE FUTBOL',
        pictos: [ /* opcional */ ],
        pasos: (() => {
          const base = 'emocion2/'
          return [
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Mira la primera imatge i observa l’escena.',
              imagen: base + 'escena1.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Ara mira aquesta altra part de l’escena.',
              imagen: base + 'escena2.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t bé en el que està passant aquí.',
              imagen: base + 'escena3.png'
            },
            {
              tipo: 'situacion',
              titulo: 'SITUACIÓ',
              descripcion: 'Fixa’t hi bé.',
              imagen: base + 'escena4.png'
            },
            {
              tipo: 'eleccion',
              titulo: 'QUINA EMOCIÓ SENTS?',
              opciones: [
                { id: 'feliz',    texto: 'FELIÇ',     imagen: base + 'eleccion1.png' },
                { id: 'triste',   texto: 'TRIST',     imagen: base + 'eleccion2.png' },
                { id: 'enfado',   texto: 'ENFADAT',   imagen: base + 'eleccion3.png' },
                { id: 'confusió', texto: 'CONFÚS',    imagen: base + 'eleccion4.png' },
                { id: 'asustado', texto: 'ESPANTAT',  imagen: base + 'eleccion5.png' }
              ]
            }
          ]
        })()
      },
    ]
  }
}

export default textos
