module.exports = async function (context) {
    // Aquí recuperarías todos los alumnos de la base de datos; como ejemplo:
    // const { resources } = await cosmosContainer.items.readAll().fetchAll()
    // context.res = { status: 200, body: resources }
  
    // Stub mientras no tengas BD, devolvemos un array vacío:
    context.res = {
      status: 200,
      body: []
    }
  }
  