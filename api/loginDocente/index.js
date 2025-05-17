const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

module.exports = async function (context, req) {
  const pw = req.body?.password;
  if (!pw) {
    context.res = { status: 400, body: 'Falta el campo password' };
    return;
  }

  // 1) Compara con el hash almacenado
  const hash = process.env.DOCENTE_PW_HASH;
  const ok = await bcrypt.compare(pw, hash);
  if (!ok) {
    context.res = { status: 401, body: 'Password incorrecta' };
    return;
  }

  // 2) Genera un JWT firmado
  const token = jwt.sign(
    { role: 'docente' },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  // 3) Devuelve el token
  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { token }
  };
};
