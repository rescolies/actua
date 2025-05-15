const textos = {
    es: {
      ui: {
        atras: 'ATRÁS',
        siguiente: 'SIGUIENTE',
        pasoTexto: (act, tot) => `Paso ${act} de ${tot}`,
        errorSinEleccion: 'No hay resultado disponible. Vuelve a hacer una elección.'
      },
      escenas: [
        {
          titulo: 'YO TAMBIÉN QUIERO PATATAS',
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
                  { texto: 'NO HACE NADA', imagen: base + 'eleccion1.png' },
                  { texto: 'SE ENFADA',    imagen: base + 'eleccion2.png' },
                  { texto: 'HACE UN GESTO', imagen: base + 'eleccion3.png' }
                ]
              },
              {
                tipo: 'resultado',
                titulo: 'CONSECUENCIA PROBABLE',
                resultados: {
                  'NO HACE NADA': { texto: 'LOS OTROS NIÑOS NO REACCIONAN',    imagen: base + 'resultado1.png' },
                  'SE ENFADA':    { texto: 'LOS OTROS NIÑOS SE ALEJAN',       imagen: base + 'resultado2.png' },
                  'HACE UN GESTO': { texto: 'LOS NIÑOS COMPARTEN LAS PATATAS', imagen: base + 'resultado3.png' }
                }
              }
            ];
          })()
        },
        {
          titulo: 'SE ROMPE UN JUGUETE',
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
                  { texto: 'LLORA',                imagen: base + 'eleccion1.png' },
                  { texto: 'PIDE AYUDA',           imagen: base + 'eleccion2.png' },
                  { texto: 'IGNORA EL JUGUETE',    imagen: base + 'eleccion3.png' },
                  { texto: 'SE ENFADA Y LO TIRA',  imagen: base + 'eleccion4.png' }
                ]
              },
              {
                tipo: 'resultado',
                titulo: 'CONSECUENCIA PROBABLE',
                resultados: {
                  'LLORA':              { texto: 'UN ADULTO LO CONSUELA',           imagen: base + 'resultado1.png' },
                  'PIDE AYUDA':         { texto: 'REPARAN EL JUGUETE JUNTOS',       imagen: base + 'resultado2.png' },
                  'IGNORA EL JUGUETE':  { texto: 'SE SIENTE TRISTE PERO CALMADO',   imagen: base + 'resultado3.png' },
                  'SE ENFADA Y LO TIRA':{ texto: 'ROMPE OTROS OBJETOS Y LO REGAÑAN', imagen: base + 'resultado4.png' }
                }
              }
            ];
          })()
        }
      ]
    },
  
    ca: {
      ui: {
        atras: 'ENRERE',
        siguiente: 'SEGÜENT',
        pasoTexto: (act, tot) => `Pas ${act} de ${tot}`,
        errorSinEleccion: 'No hi ha resultat disponible. Torna a fer una elecció.'
      },
      escenas: [
        {
          titulo: 'JO TAMBÉ VULL PATATES',
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
                  { texto: 'NO FA RES',   imagen: base + 'eleccion1.png' },
                  { texto: 'S’ENFADA',    imagen: base + 'eleccion2.png' },
                  { texto: 'FA UN GEST',   imagen: base + 'eleccion3.png' }
                ]
              },
              {
                tipo: 'resultado',
                titulo: 'CONSEQÜÈNCIA PROBABLE',
                resultados: {
                  'NO FA RES': { texto: 'ELS ALTRES NENS NO REACCIONEN',           imagen: base + 'resultado1.png' },
                  'S’ENFADA':  { texto: 'ELS ALTRES NENS S’ALLUNYEN',              imagen: base + 'resultado2.png' },
                  'FA UN GEST':{ texto: 'ELS NENS COMPARTEIXEN LES PATATES',       imagen: base + 'resultado3.png' }
                }
              }
            ];
          })()
        },
        {
          titulo: 'ES TRONCA UN JOGUET',
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
                  { texto: 'PLORA',               imagen: base + 'eleccion1.png' },
                  { texto: 'DEMANA AJUDA',        imagen: base + 'eleccion2.png' },
                  { texto: 'IGNORA EL JOGUET',    imagen: base + 'eleccion3.png' },
                  { texto: 'S’ENFADA I EL LLENÇA',imagen: base + 'eleccion4.png' }
                ]
              },
              {
                tipo: 'resultado',
                titulo: 'CONSEQÜÈNCIA PROBABLE',
                resultados: {
                  'PLORA':             { texto: 'UN ADULT EL CONSOLA',                imagen: base + 'resultado1.png' },
                  'DEMANA AJUDA':      { texto: 'REPARAN EL JOGUET JUNTS',           imagen: base + 'resultado2.png' },
                  'IGNORA EL JOGUET':  { texto: 'SE SENT TRIST PERÒ CALMAT',         imagen: base + 'resultado3.png' },
                  'S’ENFADA I EL LLENÇA': { texto: 'TRONCA ALTRES OBJECTES I EL RENYEN', imagen: base + 'resultado4.png' }
                }
              }
            ];
          })()
        }
      ]
    }
  }
  
  export default textos
  