const fetch = require("node-fetch"); // si necesitas hacer fetch

exports.handler = async function(event) {
  const { token } = event.queryStringParameters || {};

  // Validar token
  global.tokens = global.tokens || {};
  if (!token || !global.tokens[token] || global.tokens[token] < Date.now()) {
    return { statusCode: 401, body: "Token inválido o expirado" };
  }

  // Borra token para un solo uso
  delete global.tokens[token];

  // Redirigir a CEA con usuario/clave internos
  const ceaUser = "CONX";
  const ceaPass = "CONX2025";

  // Generamos URL de login (ejemplo, no es API oficial)
  const redirectURL = `https://www.informescea.com.ar/login?user=${ceaUser}&pass=${ceaPass}`;

  return {
    statusCode: 302,
    headers: { Location: redirectURL },
    body: ""
  };
};
