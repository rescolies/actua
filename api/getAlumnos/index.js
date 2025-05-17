const { CosmosClient } = require('@azure/cosmos');

module.exports = async function (context) {
  try {
    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
    const container = client
      .database(process.env.COSMOS_DB_DATABASE)
      .container(process.env.COSMOS_DB_CONTAINER);

    const { resources } = await container.items
      .query("SELECT * FROM c")
      .fetchAll();

    context.res = { status: 200, body: resources };
  } catch (err) {
    // Aquí exponemos el error para leerlo desde el navegador
    context.log.error('getAlumnos error:', err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
