const { CosmosClient } = require('@azure/cosmos')

module.exports = async function (context) {
  const endpoint = process.env.COSMOS_DB_CONNECTION
  const client   = new CosmosClient(endpoint)
  const db       = client.database(process.env.COSMOS_DB_DATABASE)
  const container = db.container(process.env.COSMOS_DB_CONTAINER)

  const { resources } = await container.items.readAll().fetchAll()
  // Sólo devolvemos el nombre y la fecha de registro
  const respuesta = resources.map(a => ({
    nombre: a.nombre,
    fechaRegistro: a.date
  }))

  context.res = {
    status: 200,
    body: respuesta
  }
}
