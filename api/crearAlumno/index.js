const { CosmosClient } = require('@azure/cosmos')

module.exports = async function (context, req) {
  const nombre = req.body?.nombre?.trim()
  if (!nombre) {
    context.res = { status: 400, body: 'Falta el nombre' }
    return
  }

  const endpoint = process.env.COSMOS_DB_CONNECTION
  const client   = new CosmosClient(endpoint)
  const db       = client.database(process.env.COSMOS_DB_DATABASE)
  const container = db.container(process.env.COSMOS_DB_CONTAINER)

  // Comprueba si ya existe
  const { resources: existentes } = await container
    .items
    .query({ query: 'SELECT * FROM c WHERE c.nombre = @n', parameters: [{ name: '@n', value: nombre }] })
    .fetchAll()

  if (existentes.length === 0) {
    // Nuevo alumno
    await container.items.create({
      id: nombre,
      nombre,
      date: new Date().toISOString(),
      elecciones: {},
      respuestas: []
    })
  }

  context.res = {
    status: 201,
    body: { nombre }
  }
}
