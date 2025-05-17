const { CosmosClient } = require('@azure/cosmos');
const jwt              = require('jsonwebtoken');

// Valida el JWT
function autorizar(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.role === 'docente';
  } catch {
    return false;
  }
}

module.exports = async function (context, req) {
  if (!autorizar(req)) {
    context.res = { status: 401, body: 'No autorizado' };
    return;
  }

  try {
    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
    const container = client
      .database(process.env.COSMOS_DB_DATABASE)
      .container(process.env.COSMOS_DB_CONTAINER);

    const { resources } = await container.items
      .query("SELECT * FROM c")
      .fetchAll();

    context.res = {
      status: 200,
      body: resources
    };
  } catch (err) {
    context.log.error('getAlumnos error:', err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
