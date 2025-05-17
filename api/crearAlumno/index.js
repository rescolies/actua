const { CosmosClient } = require('@azure/cosmos');
const jwt              = require('jsonwebtoken');

// Valida el JWT (tal cual en getAlumnos)
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
    const { nombre } = req.body || {};
    if (!nombre) {
      context.res = { status: 400, body: 'Falta nombre' };
      return;
    }

    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION);
    const container = client
      .database(process.env.COSMOS_DB_DATABASE)
      .container(process.env.COSMOS_DB_CONTAINER);

    // Comprueba duplicados
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: nombre }]
    };
    const { resources: existentes } = await container.items
      .query(querySpec)
      .fetchAll();

    if (existentes.length > 0) {
      context.res = { status: 409, body: 'El alumno ya existe' };
      return;
    }

    // Crea el alumno
    await container.items.create({
      id: nombre,
      nombre,
      date: new Date().toISOString(),
      elecciones: {},
      respuestas: []
    });

    context.res = {
      status: 201,
      body: { nombre }
    };
  } catch (err) {
    context.log.error('crearAlumno error:', err);
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
