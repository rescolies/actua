module.exports = async function (context, req) {
    const { nombre } = req.body || {}
    if (!nombre) {
      context.res = { status: 400, body: 'Falta el nombre' }
      return
    }
  
    // Aquí insertas en tu base de datos; como ejemplo:
    // await cosmosContainer.items.create({ id: nombre, date: new Date().toISOString(), elecciones: {} })
  
    context.res = {
      status: 201,
      body: { nombre }
    }
  }
  