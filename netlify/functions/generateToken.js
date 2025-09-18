exports.handler = async function() {
  const token = Math.random().toString(36).substring(2, 12); // token aleatorio 10 chars
  const expiry = Date.now() + 15 * 60 * 1000; // expira en 15 min

  // Guardar en memoria simple (para producción usar DB o KV)
  global.tokens = global.tokens || {};
  global.tokens[token] = expiry;

  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
